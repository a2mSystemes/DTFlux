import Loki from "lokijs";
import { Observable, Subject } from "rxjs";
import { IDTFluxDbSchema } from "../dtflux-model/dtflux-schema.model";
import { DTFluxDBAdapter } from "../dtflux-model/dtflux-db-adapter.model";

export class DTFluxDbService extends DTFluxDBAdapter{
  private changeSubject: Subject<any>;
  constructor(dbName?: string) {
    super(dbName);
    this.changeSubject = new Subject<any>();
    this.db.on("loaded", () => this.setupChangeTracking());
    
  }
  public getChanges(): Observable<any> {
    return this.changeSubject.asObservable();
  }

  private setupChangeTracking(): void {
    // console.log(this.db.collections);
    for(let coll of this.db.collections){
      // console.log(coll);
      coll.on("insert", (changes) =>{
        const meta = changes.meta;
        changes.m$_updated = meta.revision;
        changes.m$_created = meta.created;
        changes.m$_rev = meta.revision;
        changes.m$_evtType = "insert";
        delete changes.meta;
        delete changes.$loki;
        this.changeSubject.next(changes)
      });
      coll.on("update", (changes) =>{
        console.log("updating");
        if(changes){
          const meta = changes.meta;
          changes.m$_updated = meta.revision;
          changes.m$_created = meta.created;
          changes.m$_rev = meta.revision;
          changes.m$_evtType = "update";
          delete changes.meta;
          delete changes.$loki;
        }
        this.changeSubject.next(changes)
      });
      coll.on("delete", (changes) =>{
        const meta = changes.meta;
        changes.m$_updated = meta.revision;
        changes.m$_created = meta.created;
        // changes.m$_rev = meta.revision;
        changes.m$_evtType = "delete";
        delete changes.meta;
        delete changes.$loki;
        this.changeSubject.next(changes)
      });
    }
  }


  private emitChanges(changes: any): void {
    this.changeSubject.next(changes);
  }
}
