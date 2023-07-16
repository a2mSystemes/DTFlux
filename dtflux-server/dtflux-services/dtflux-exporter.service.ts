import * as net from "net";
import * as conf from "../dtflux-conf/conf.json";
import { Subject } from "rxjs";
import { EndingLapRunner } from "../dtflux-model/core.model/EndingLapRunner";
import { IExporterResult } from "../dtflux-model/race-result.model/IExporterResult";
import { EndingLapRunners } from "../dtflux-model/core.model/EndingLapRunners";
import { IEndingLapRunner } from "../dtflux-model/core.model/IEndingLapRunner";
import { DTFluxDbService } from "./dtflux-database.service";
import { Collection } from "lokijs";
import { IParticipant, ITeam } from "../dtflux-model/dtflux-schema.model";
import { ILiveResult } from "../dtflux-model/race-result.model/ILiveResult";

export class DTFluxExporterService {
  private _dbService: DTFluxDbService;
  server: net.Server;
  port: number;
  addr: string;
  spoters: EndingLapRunners;
  spoter$: Subject<Array<IEndingLapRunner>> = new Subject<
    Array<IEndingLapRunner>
  >();
  private participants: Collection<any> | null;
  private runnerStatus: Collection<any> | null;
  private runnerSplitResults: Collection<any> | null;
  private runnerGaps: globalThis.Collection<any> | null;
  private runnerTotlaTimes: globalThis.Collection<any> | null;

  constructor(dbService: DTFluxDbService) {
    this._dbService = dbService;
    this.participants = this._dbService.getCollection("participant");
    this.runnerStatus = this._dbService.getCollection("runerStatus");
    this.runnerSplitResults =
      this._dbService.getCollection("runnerSplitResult");
    this.runnerGaps = this._dbService.getCollection("runnerGap");
    this.runnerTotlaTimes = this._dbService.getCollection("runnerTotlaTime");
    this.spoters = new EndingLapRunners();
    this.port = conf.exporterPort ? conf.exporterPort : 3000;
    this.addr = conf.exporterHost ? conf.exporterHost : "localhost";
    this.server = new net.Server(this.connectionListen.bind(this));
    this.listen();
  }

  connectionListen(socket: net.Socket) {
    let rawData = Buffer.alloc(0);
    // Handle incoming data
    socket.on("connect", () => {
      console.log("client connected");
    });
    socket.on("data", (data) => {
      // Append received data to the raw buffer
      rawData = Buffer.concat([rawData, data]);
      if (rawData.slice(-2).toString() === "\r\n") {
        try {
          let jsonBuffer = rawData.slice(0, -2);
          const jsonData: IExporterResult = JSON.parse(jsonBuffer.toString());
          this.dispatch(jsonData);
          // this.spoters.addRunner(jsonData)
          // this.spoter$.next(this.spoters.exportData());
          // const jsonObject:IExporterResult = jsonData;
          console.log("Received JSON data:");
        } catch (error) {
          console.error("Error parsing JSON:", error);
        } finally {
          rawData = Buffer.alloc(0);
        }
      }
    });
    // Handle end of data transmission
    socket.on("end", () => {
      console.log("Client disconnected");
    });
  }
  dispatch(jsonData: IExporterResult) {
    // console.log({
    //   bib: jsonData.Bib,
    //   lastName: jsonData.Lastname,
    //   firstName: jsonData.Firstname,
    // });
    const p = this.participants?.findOne({
      bib: jsonData.Bib,
      lastName: jsonData.Lastname,
      firstName: jsonData.Firstname,
    });
    // console.log(typeof(jsonData.Bib));
  }

  listen() {
    this.server.listen(this.port, this.addr, () => {
      console.log(
        `Listening Exporter on address ${this.addr} on port ${this.port} `,
      );
    });
  }
}

export class Participant implements IParticipant {
  id?: number;
  lastName: string = "";
  firstName: string = "";
  gender: string = "";
  bib: number = -1;
  category: string = "";
  currentStatusId: number = -1;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  constructor(
    fromData?: IExporterResult | ILiveResult,
    participantNumber: number = 1,
  ) {
    if (fromData) {
      if (participantNumber == 1) {
        this.lastName = fromData.Lastname;
        this.firstName = fromData.Firstname;
        this.bib = fromData.Bib;
        this.gender = fromData.Gender;
      }
      if (participantNumber == 2) {
        this.lastName = fromData.Lastname2;
        this.firstName = fromData.Firstname2;
        this.bib = fromData.Bib;
        this.gender = fromData.Gender2;
      }
    }
  }
}
export class Team{
  static participantsInDb // Handle incoming data
    (team: Team) {
      throw new Error("Method not implemented.");
  }

  teamates: Array<Participant> = [];
  team?:ITeam;
  private _isTeam: boolean =false;
  constructor(fromData: IExporterResult | ILiveResult){
    if(Team.isTeam(fromData)){
      this.teamates[0] = new Participant(fromData)
      this.teamates[1] = new Participant(fromData, 2)
      this.team = {id : undefined, name : fromData.TeamName, participants: this.teamates, teamBib : fromData.Bib }
      this._isTeam = true;
    }else{
      this.teamates[0] = new Participant(fromData)
    }
  }
  static isTeam(data: IExporterResult | ILiveResult): boolean{
    return (data.Lastname2 && data.Firstname2 && data.TeamName) !== "";
  }

}
