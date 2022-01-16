import requests
from pymongo import MongoClient
import os
from dotenv import load_dotenv


def get_database():
   load_dotenv()
   CONNECTION_STRING = os.getenv('MONGODB_URI')
   client=MongoClient(CONNECTION_STRING)
   return client['myFirstDatabase']


def driver_wise_data(driver_ids):
   # not in use deprecated
   driver_season_data = {}
   for driverId in driver_ids:
      print(driverId)
      url = f"http://ergast.com/api/f1/drivers/{driverId}/results"
      response = requests.get(url+".json", params={'limit': 1000}).json()
      assert(int(response["MRData"]["total"], 10) < 1000)
      season_data = {}
      for race in response["MRData"]["RaceTable"]["Races"]:
         if int(race["season"]) < 2000:
            continue
         assert len(race["Results"]) == 1
         if race["season"] not in season_data:
            season_data[race["season"]] = []
         season_data[race["season"]].append(race["Results"][0]["points"])
      driver_season_data[driverId] = season_data

def constructor_data():
   # not in use deprecated
   constructor_url = "https://ergast.com/api/f1/constructors"
   response = requests.get(constructor_url+".json",
                           params={'limit': 1000}).json()
   constructor_ids = []
   for constructor in response["MRData"]["ConstructorTable"]["Constructors"]:
      constructor_ids.append(constructor["constructorId"])


def year_wise_driver_data(start_year: int, end_year: int) -> dict:
   driver_season_data = {}
   for year in range(start_year,end_year+1):
      print(year)
      year_results = f"https://ergast.com/api/f1/{year}/results"
      response = requests.get(year_results+".json", params={'limit': 1000}).json()
      assert(int(response["MRData"]["total"], 10) < 1000)
      for race in response["MRData"]["RaceTable"]["Races"]:
         for results in race["Results"]:
            cur_driver = results["Driver"]["driverId"]
            if cur_driver not in driver_season_data:
               driver_season_data[cur_driver] = {}
            if str(year) not in driver_season_data[cur_driver]:
               driver_season_data[cur_driver][str(year)] = []
            driver_season_data[cur_driver][str(year)].append(float(results["points"]))
   return driver_season_data


def get_json_drivers() -> dict():
   driver_url = "http://ergast.com/api/f1/drivers"
   drivers_response = requests.get(driver_url+".json", params={'limit': 1000}).json()

   drivers, driver_ids = [], []
   for driver_data in drivers_response["MRData"]["DriverTable"]["Drivers"]:
      driver_ids.append(driver_data["driverId"])

   driver_season_data = year_wise_driver_data(2020,2021)

   for driver_data in drivers_response["MRData"]["DriverTable"]["Drivers"]:
      driver = {
            "name": driver_data["givenName"] + " " + driver_data["familyName"],
            "country": driver_data["nationality"],
            "driverId": driver_data["driverId"],
            "points_per_race": driver_season_data[driver_data["driverId"]] if driver_data["driverId"] in driver_season_data else []
      }
      drivers.append(driver)

   return drivers


if __name__ == "__main__":

   # Get the database
   dbname=get_database()
   driver_collection = dbname["drivers"]
   # driver_collection.rename("drivers_dup")
   print("[+] Clearing collection")
   driver_collection.delete_many({})
   print("[+] Importing objects from api")
   list_of_drivers = get_json_drivers()
   print("[+] Exporting objects to db")
   driver_collection.insert_many(list_of_drivers)
   print("[+] Job Finished")
