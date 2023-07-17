import { TIMING_TYPE } from "./core.model/Enums";


export interface ICurrentServerState{
  id?: number;
  stageId: number;
  contestId: number;
  active: boolean;
  createdAt: Date;
}

export interface IParticipant {
  id?: number;
  lastName: string;
  firstName: string;
  gender: string;
  bib: number;
  category: string;
  currentStatusId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IRunnerStatus {
  id?: number;
  raceId: number;
  participantId: number;
  createdAt: Date;
}
export interface ITeam {
  id?: number;
  participants: Array<IParticipant>;
  teamBib: number;
  name: string;
}
export interface IStage {
  id?: number;
  raceId: number;
  name: string;
  startTime: Date;
  duration: string;
}
export interface ISplit {
  id?: number;
  name: string;
  key: string; // key of the name in RaceResult API
}
export interface IRunnerSplitResult {
  id?: number;
  raceId: number;
  participantId: number;
  time: string;
  splitId: number;
}
export interface IRunnerTotalTime {
  id?: number;
  raceId: number;
  participantId: number;
  time: string;
}
export interface IRunnerGap {
  id?: number;
  raceId: number;
  participantId: number;
  gap: string;
}
export interface IRace {
  id?: number;
  name: string;
  resourceKeyStartList: string;
  resourceKeyLiveStageResult: string;
  resourceKeyGenClassification: string;
  startTime?: Date;
  endDate?: Date;
}
export interface IEvent {
  id?: number;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}
export interface IEventRace {
  id?: number;
  eventId: number;
  raceId: number;
  startDate?: Date;
  endDate?: Date;
}

export interface IDTFluxDbSchema {
  event: IEvent[];
  race: IRace[];
  participant: IParticipant[];
  runnerStatus: IRunnerStatus[];
  team: ITeam[];
  stage: IStage[];
  split: ISplit[];
  runnerSplitResult: IRunnerSplitResult[];
  runnerTotalTime: IRunnerTotalTime[];
  runnerGap: IRunnerGap[];
}
export class DTFluxDbSchema implements DTFluxDbSchema {
  currentServerState: Array<ICurrentServerState> = new Array<ICurrentServerState>();
  event: IEvent[] = new Array<IEvent>();
  race: IRace[] = new Array<IRace>();
  participant: IParticipant[] = new Array<IParticipant>();
  runnerStatus: IRunnerStatus[] = new Array<IRunnerStatus>();
  team: ITeam[] = new Array<ITeam>();
  stage: IStage[] = new Array<IStage>();
  split: ISplit[] = new Array<ISplit>;
  runnerSplitResult: IRunnerSplitResult[] = new Array<IRunnerSplitResult>();
  runnerTotalTime: IRunnerTotalTime[] = new Array<IRunnerTotalTime>();
  runnerGap: IRunnerGap[] = Array<IRunnerGap>();
}

