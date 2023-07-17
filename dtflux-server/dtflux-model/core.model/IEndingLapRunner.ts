// Runner about to finish the lap
// interface for Spoter, LapFinisher and Finisher

import { IParticipant } from "../dtflux-schema.model";

export interface IEndingLapRunner extends IParticipant{
  currentSplitName: string;
  currentSplitTime: string;
  currentSplitGap: string;
  currentSplitRank: number;
  spotRank: number;
  runnerType: "solo" | "relai";
  type: "spoter" | "lapFinisher" | "finisher" | "";
}
 