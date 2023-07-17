import { IExporterResult } from "../race-result.model/IExporterResult";
import { Collection } from "lokijs";
import { ITeam } from "../dtflux-schema.model";
import { ILiveResult } from "../race-result.model/ILiveResult";
import { Participant } from "./Participant";

export class Team {
  teamates: Array<Participant> = [];
  team?: ITeam;
  private _isTeam: boolean = false;
  constructor(fromData: IExporterResult | ILiveResult) {
    if (Team.isTeam(fromData)) {
      this.teamates[0] = new Participant(fromData);
      this.teamates[1] = new Participant(fromData, 2);
      this.team = {
        id: undefined,
        name: fromData.TeamName,
        participants: this.teamates,
        teamBib: fromData.Bib,
      };
      this._isTeam = true;
    } else {
      this.teamates[0] = new Participant(fromData);
    }
  }
  amIATeam(): boolean {
    return this._isTeam;
  }
  static isTeam(data: IExporterResult | ILiveResult): boolean {
    return (data.Lastname2 && data.Firstname2 && data.TeamName) !== "";
  }

  static participantsInDb(
    team: Team,
    participantsColl: Collection<any> | null,
    teamsColl: Collection<any> | null
  ): boolean {
    if (!participantsColl && !teamsColl)
      throw new Error("static participantsInDb() : Collections are null");
    if (team._isTeam) {
      const t0 = team.teamates[0];
      //TODO: remove ? to participants
      const p0 = participantsColl?.findOne({
        firstName: t0.firstName,
        lastName: t0.lastName,
      });
      console.log({ ...p0 });
      if (!p0) {
        // particpant 1 is not in the db
        p0.id = null;
        participantsColl?.insert({ ...p0 });
      }
    } else {
      const t0 = team.teamates[0];
      const t1 = team.teamates[1];
      const teamData = team.team;
      //TODO: remove ? to participants
      const p0 = participantsColl?.findOne({
        firstName: t0.firstName,
        lastName: t0.lastName,
      });
      const p1 = participantsColl?.findOne({
        firstName: t1.firstName,
        lastName: t1.lastName,
      });
      const t = teamsColl?.findOne({
        name: teamData?.name,
      });
      if (!p0) {
        // particpant 1 is not in the db
        p0.id = null;
        participantsColl?.insert({ ...p0 });
      }
      if (!p1) {
        // particpant 1 is not in the db
        p1.id = null;
        participantsColl?.insert({ ...p1 });
      }
      if (!t) {
        // team 1 is not in the db
        t.id = null;

        participantsColl?.insert({ ...t });
      }

    }
    return false;
  }
}
