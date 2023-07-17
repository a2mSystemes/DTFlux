import * as conf from "./../dtflux-conf/conf.json";

export class DTFluxURLBuilderService {
  buildURL(
    what?: "StratList" | "LiveResult" | "GenClasification",
    contestId?: "XPSRelais" | "XP" | "XPS",
    filters?: any,
  ): string {
    what = what ? what : "LiveResult";
    let c = conf.raceResultAPI as any; // no typing here
    let url = c.useLocal ? c.baseLocalUrl + "/_" : c.baseDistantUrl;
    url += c.idEvent;
    url += c.useLocal ? "/api/" : "";
    url += c.resources.liveStageResultKey;
    url += contestId? "?Contest=" + c.contests[contestId] : "";
    if (filters) {
      // console.log("filters: " + filters);
    } else {
      // console.log("filters is null");
    }
    console.log("url: " + url);
    return url;
  }
}
