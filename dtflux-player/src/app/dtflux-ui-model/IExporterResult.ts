

export interface IExporterResult{
  ContestID: number;
  ContestName: string;
  StageID: number;
  StageName: string;
  Bib: number;
  Firstname: string;
  Lastname: string;
  Gender: string;
  Club: string;
  Firstname2: string;
  Lastname2: string;
  Gender2: string;
  Club2: string;
  TeamName: string;
  Category: string;
  StartTime: string;
  CurrentSplitName: string;
  CurrentSplitRank: number;
  CurrentSplitTime: string;
  CurrentSplitGap: string;
  $type: string;
}

export class ExporterResult implements IExporterResult{
  ContestID: number = -1;
  ContestName: string = "";
  StageID: number = -1;
  StageName: string = "";
  Bib: number = -1;
  Firstname: string = "";
  Lastname: string = "";
  Gender: string = "";
  Club: string = "";
  Firstname2: string = "";
  Lastname2: string = "";
  Gender2: string = "";
  Club2: string = "";
  TeamName: string = "";
  Category: string = "";
  StartTime: string = "";
  CurrentSplitName: string = "";
  CurrentSplitRank: number = -1;
  CurrentSplitTime: string = "";
  CurrentSplitGap: string = "";
  $type: string = "";

}
