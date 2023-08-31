"""RaceResult importer

this module imports data to the database with exported json data from the original race result app
"""
from .model.dbSchema import Schema
from os.path import exists, isfile
import json




class Importer:
    schema = Schema()
    
    def __init__(self):
        print("importer initialized")
    
    
    def importDataFrom(self, file):
        if file is not None and isfile(file):
            with open(file, "r") as f:
                data = json.load(f)
                for row in data:
                    if row['ContestID'] == 1:
                        # print(f'Row is Contest 1 => \n {row}')
                        club = row["Club"]
                        # self.schema.Clubs.
                        print(f'Club Name of row in (contestID == 1) => \n {club}')
        else:
            print(f'IMPORTER ERROR : Could not open file {file}')
        


if __name__ == "__main__":
    importer = Importer()
    json_file = "./RaceResultDatas/StartList/StartList.json"
    importer.importDataFrom(json_file)