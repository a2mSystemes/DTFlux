
import { RunnerResults } from "./RunnerResults";
import { RunnerResult } from "./RunnerResult";

export class StageFinishers {
  static spotterKeyword: string = "Dernière ligne droite";
  static finishKeyword: string = "Arrivée";
  spotters: RunnerResults = new RunnerResults();
  finishers: RunnerResults = new RunnerResults();

}
