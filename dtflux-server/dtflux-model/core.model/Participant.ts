import { IExporterResult } from "../race-result.model/IExporterResult";
import { IParticipant } from "../dtflux-schema.model";
import { ILiveResult } from "../race-result.model/ILiveResult";


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
    participantNumber: number = 1
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
