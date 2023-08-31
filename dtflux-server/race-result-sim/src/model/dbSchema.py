#coding=utf-8
from sqlalchemy import create_engine, MetaData, Table
import os

class Schema:

    dbPath = "sqlite:///db/race-results.db" 
    def __init__(self):
        try:
            self.engine, self.metadata = self.getDbPath()
            self.Events = Table("Events", self.metadata, autoload_with=self.engine)
            self.Contests = Table("Contests", self.metadata, autoload_with=self.engine)
            self.Stages = Table("Stages", self.metadata, autoload_with=self.engine)
            self.Splits = Table("Splits", self.metadata, autoload_with=self.engine)
            self.Persons = Table("Persons", self.metadata, autoload_with=self.engine)
            self.Categories = Table("Categories", self.metadata, autoload_with=self.engine)
            self.Participants = Table("Participants", self.metadata, autoload_with=self.engine)
            self.Clubs = Table("Clubs", self.metadata, autoload_with=self.engine)
            self.Teams = Table("Teams", self.metadata, autoload_with=self.engine)
            self.EventContests = Table("EventContests", self.metadata, autoload_with=self.engine)
            self.ContestStages = Table("ContestStages", self.metadata, autoload_with=self.engine)
            self.RunnerSplitResults = Table("RunnerSplitResults", self.metadata, autoload_with=self.engine)
            self.RunnerStageFinalResults = Table("RunnerStageFinalResults", self.metadata, autoload_with=self.engine)
            self.RunnerContestFinalResults = Table("RunnerContestFinalResults", self.metadata, autoload_with=self.engine)
        except Exception as error:
            print(f'ERROR {type(error)} : {error.args}')
        
    def getDbPath(self):
        absolute_path = os.path.dirname(__file__)
        start_path = os.getcwd()
        rel_path = os.path.relpath(absolute_path, start_path)
        self.db = 'sqlite:///' + rel_path + "/../../db/race-results.db"
        engine = create_engine(self.db)
        metadata = MetaData()
        return engine,metadata

