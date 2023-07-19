import { FilteredArray } from "../core.model/FilteredArray";
import { ExporterResult } from "./ExporterResult";

class ExporterResults extends FilteredArray<ExporterResult> {
  constructor(datas?: object[]) {
    super();
    if (datas) {
      datas.forEach(data => {
        const result = new ExporterResult(data);
        Object.assign(result, data);
        this.push(result);
      });
    }
  }
}
