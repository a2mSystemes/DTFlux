import { FilteredArray } from "../core.model/FilteredArray";
import { LiveResult } from "./LiveResult";


export class LiveResults extends FilteredArray<LiveResult> {
  constructor(datas?: object[]) {
    super();
    if (datas) {
      datas.forEach(data => {
        const result = new LiveResult(data);
        Object.assign(result, data);
        this.push(result);
      });
    }
  }
}
