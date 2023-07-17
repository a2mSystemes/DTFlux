import Loki from "lokijs";
import { DTFluxDbSchema, IEvent } from "./dtflux-schema.model";
import { IParticipant } from "./dtflux-schema.model";
import * as conf from "./../dtflux-conf/conf.json";

import fs from "fs";

export class DTFluxDBAdapter {
  protected db: Loki;
  private dbFilePath: string;
  private _collections: DTFluxDbSchema = new DTFluxDbSchema();

  constructor(dbName?: string) {
    this.dbFilePath = dbName
      ? "./DTFluxDB" + dbName
      : conf.dbPath + conf.dbName;
    this.db = new Loki(this.dbFilePath, {

    });
        // Check if the file exists
        this.init();
      }

  private async init(){
    try{
      await this.initDb();
    }catch(err){
      console.error("error initializing db:", err);
    }
  }

  private async initDb(): Promise<void>{
    return new Promise((resolve, reject) => {
      fs.access(this.dbFilePath, fs.constants.F_OK, (err) => {
        if (err) {
          Object.keys(this._collections).forEach((collectionName) => {
            const collection = this.db.addCollection(collectionName);
            collection.ensureUniqueIndex("id");
          });
          resolve(void 0);
        } else {
          // Load the database
          this.db.loadDatabase({}, (loadErr) => {
            if (loadErr) {
              console.error("Error loading database:", loadErr);
              reject(loadErr);
            } else {
              console.log("Database loaded successfully");
              resolve(void 0);
            }
          });
        }
      });
    });
  }

  save(): void {
    this.db.save((err) => {
      if (err) {
        console.log("Error saving database:", err);
        throw new Error(`database save error: ${err}`);
        return false;
      } else {
        console.log("Database saved successfully");
      }
    });
  }

  private getNextId(collectionName: string): number {
    const collection = this.db.getCollection(collectionName);
    if (collection === null) {
      throw new Error(`Collection '${collectionName}' does not exist.`);
    }
    const maxId = collection.maxId;
    return maxId !== null ? maxId + 1 : 1;
  }
  public insert(collectionName: string, document: any): void {
    const collection = this.db.getCollection(collectionName);
    if (collection === null) {
      throw new Error(`Collection '${collectionName}' does not exist.`);
    }
    const newId = this.getNextId(collectionName);
    const documentWithId = { ...document, id: newId };
    const ret = collection.insert(documentWithId)
    this.db.saveDatabase();
    return ret;
  }

  delete(collectionName: string, id: number) {
    const col = this.db.getCollection(collectionName);
    const ret = col.removeWhere({ id: id })
    this.db.saveDatabase();
    return ret;
  }
  update(collectionName: string, id: number, updatedDocument: any) {
   const col = this.db.getCollection(collectionName);
   const doc = col.findOne({ id: id });
   updatedDocument.id = id;
   const ret = col.update({...doc, ...updatedDocument});
   this.db.saveDatabase()
   return ret;
  }
  getAll(collectionName?: string) {
    if (collectionName) return this.db.getCollection(collectionName).find();
    const collections = new Array<any>();
    for (const col of Object.keys(this._collections)) {
      let c = this.db.getCollection(col);
      collections.push({ collection: `${col}`, data: c.find() });
    }
    return collections;
  }

  getById(collectionName: string, id: number) {
    const col = this.db.getCollection(collectionName);
    return col.findOne({ id: id });
  }

exportToJson(){
  this.save();
  return JSON.stringify(this.db, null,2);
}

  getRunnerTimings(runner: Partial<IParticipant>): any {
    const participant = this.db.getCollection("participant");
    const result = this.db.getCollection("runnerSplitResult");
    if (participant && result) {
      const pId = participant.findOne({
        bib: runner.bib,
        lastName: runner.lastName,
      }).id;
      const query = { participantId: pId };
      return result.chain().find(query).data();
    } else {
      return null;
    }
  }
  public getCollection(collection: string){
  if(this.db.getCollection(collection)){
    // console.log("getCollection : ", collection);
    return this.db.getCollection(collection);
  }
  console.log("getCollection : NotFound");
  return null;
  }
}
