import requests
from pymongo import MongoClient
import os
from dotenv import load_dotenv


def get_database():
    load_dotenv()
    CONNECTION_STRING = os.getenv('MONGODB_URI')
    client = MongoClient(CONNECTION_STRING)
    return client['myFirstDatabase']

def year_wise_race_constructor_data(startYear: int, endYear: int) -> dict():
    fullraces = []
    for year in range(startYear, endYear + 1):
        print(f"[+] year: {year}")
        stored_points = {}
        year_results = f"https://ergast.com/api/f1/{year}/results"
        response = requests.get(year_results+".json", params={'limit': 1000}).json()

        year_races = []
        for race_idx, race in enumerate(response['MRData']['RaceTable']['Races']):
            constructors = []
            temp = {} # points for a single race by a constructor
            for results in race['Results']:
                constructorId = results['Constructor']['constructorId']
                if constructorId not in stored_points:
                    stored_points[constructorId] = 0

                if constructorId not in temp:
                    temp[constructorId] = 0
                
                temp[constructorId] = temp.get(constructorId) + float(results['points'])

                stored_points[constructorId] = stored_points.get(constructorId) + float(results['points'])
                
                # if constructorId == "mercedes":
                #     print(stored_points[constructorId], float(results['points']))

            temp = sorted(temp.items(), key = lambda x: float(x[1]), reverse= True)

            for index, (key, value) in enumerate(temp):
                # print(f"{index} {key} {value}")
                constructors.append({
                    "constructorId": key,
                    "rank": int(index) + 1,
                    "points": value,
                    "cumulative_points": float(stored_points[key])
                })

            races = {
                "race_id": str(race_idx).rjust(2, "0") + " " + race['raceName'],
                "round": int(race['round']),
                "constructors": constructors
            }
            year_races.append(races)
        
        fullraces.append({
            "year": year,
            "races": year_races
        })
    
    return fullraces
        

def get_json_race_constructors() -> dict():
    fullraces = year_wise_race_constructor_data(2000, 2021)
    return fullraces

if __name__ == '__main__':
    dbname = get_database()
    print("[+] Getting database")
    constructor_collection = dbname['constructors_race']
    print("[+] Clearing collection")
    constructor_collection.delete_many({})
    print("[+] Importing objects from api")
    list_of_constructors = get_json_race_constructors()
    print("[+] Exporting objects to db")
    constructor_collection.insert_many(list_of_constructors)
    print("[+] Job finished")
    