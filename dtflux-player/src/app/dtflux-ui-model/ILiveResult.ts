
export interface ILiveResult {
  Report: string;
  ContestID: number;
  ContestName: string;
  StageID: number;
  StageName: string;
  Bib: number;
  Firstname: string;
  Lastname: string;
  Gender: "M" | "F" | "";
  Club: string;
  Firstname2: string;
  Lastname2: string;
  Gender2: "M" | "F" | "";
  Club2: string;
  TeamName: string;
  Category: string;
  Status: "" | "DNS" | "DNF" | "DSQ";
  StartTime: string;
  Split1Name: string;
  Split1Rank: number;
  Split1Time: string; //time
  Split1Gap: string; // "-" if first or "+$min:$sec"
  Split2Name: string;
  Split2Rank: number;
  Split2Time: string;
  Split2Gap: string;
  Split3Name: string;
  Split3Rank: number;
  Split3Time: string;
  Split3Gap: string;
  Split4Name: string;
  Split4Rank: number;
  Split4Time: string;
  Split4Gap: string;
  Split5Name: string;
  Split5Rank: number;
  Split5Time: string;
  Split5Gap: string;
  FinishName: string;
  FinishRank: number;
  FinishTime: string;
  FinishGap: string;
  CurrentSplitName: string;
  CurrentSplitRank: number;
  CurrentSplitTime: string;
  CurrentSplitGap: string;
  Swim: string;
  Transition: string;
  Run: string;
  $type: string;
}

export class LiveResult implements ILiveResult{
  Report: string = "";
  ContestID: number = -1;
  ContestName: string = "";
  StageID: number = -1;
  StageName: string = "";
  Bib: number = -1;
  Firstname: string = "";
  Lastname: string = "";
  Gender: "M" | "F" | "" = "";
  Club: string = "";
  Firstname2: string = "";
  Lastname2: string = "";
  Gender2: "M" | "F" | "" = "";
  Club2: string = "";
  TeamName: string = "";
  Category: string = "";
  Status: "" | "DNS" | "DNF" | "DSQ" = "";
  StartTime: string = "";
  Split1Name: string = "";
  Split1Rank: number = -1;
  Split1Time: string = ""; //time
  Split1Gap: string = ""; // "-" if first or "+$min:$sec"
  Split2Name: string = "";
  Split2Rank: number = -1;
  Split2Time: string = "";
  Split2Gap: string = "";
  Split3Name: string = "";
  Split3Rank: number = -1;
  Split3Time: string = "";
  Split3Gap: string = "";
  Split4Name: string = "";
  Split4Rank: number = -1;
  Split4Time: string = "";
  Split4Gap: string = "";
  Split5Name: string = "";
  Split5Rank: number = -1;
  Split5Time: string = "";
  Split5Gap: string = "";
  FinishName: string = "";
  FinishRank: number = -1;
  FinishTime: string = "";
  FinishGap: string = "";
  CurrentSplitName: string = "";
  CurrentSplitRank: number = -1;
  CurrentSplitTime: string = "";
  CurrentSplitGap: string = "";
  Swim: string = "";
  Transition: string = "";
  Run: string = "";
  $type: string = "";
}
