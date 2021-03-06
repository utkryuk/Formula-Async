import requests
from pymongo import MongoClient
import os
from dotenv import load_dotenv

def get_database():
    load_dotenv()
    CONNECTION_STRING = os.getenv('MONGODB_URI')
    client = MongoClient(CONNECTION_STRING)
    return client['Circuits']


def get_json_circuits_by_seasons() -> dict():
    circuits_url = "http://localhost:3000/MRData"
    races = requests.get(circuits_url).json()['RaceTable']['Races']
    seasons = {}
    for race in races:
        if seasons.get(race['season']):
            seasons[race['season']]['schedule'].append({
                'round': int(race['round']),
                'name': race['raceName'],
                'circuitName': race['Circuit']['circuitName'],
                'date': race['date'],
                'url': race['Circuit']['url'],
                'city': race['Circuit']['Location']['locality'],
                'country': race['Circuit']['Location']['country'],
                'location': {
                    'type': 'Point',
                    'coordinates': [float(race['Circuit']['Location']['long']), float(race['Circuit']['Location']['lat'])],
                    'is_location_exact' : True
                }
            })
        else:
            seasons[race['season']] = {
                'year': race['season'],
                'schedule': [{
                    'round': int(race['round']),
                    'name': race['raceName'],
                    'circuitName': race['Circuit']['circuitName'],
                    'url': race['Circuit']['url'],
                    'date': race['date'],
                    'city': race['Circuit']['Location']['locality'],
                    'country': race['Circuit']['Location']['country'],
                    'location': {
                        'type': 'Point',
                        'coordinates': [float(race['Circuit']['Location']['long']), float(race['Circuit']['Location']['lat'])],
                        'is_location_exact' : True
                    }
                }]
            }
    return seasons


if __name__ == "__main__":
    # Get the database
    dbname=get_database()
    # driver_collection.rename("drivers_dup")
    # driver_collection.delete_many({})
    print("[+] Importing objects from api")
    seasons = get_json_circuits_by_seasons()
    print("[+] Exporting objects to db")
    
    for key, value in seasons.items():
        driver_collection = dbname[key]
        driver_collection.insert_one(value)
    print("[+] Job Finished")

