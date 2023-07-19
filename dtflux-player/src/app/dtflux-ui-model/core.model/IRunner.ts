
export interface IRunner {
  contestId: number;
  stageId: number;
  bib: number;
  firstName: string;
  lastName: string;
  gender: string;
  firstName2: string;
  lastName2: string;
  status: '' | 'DNS' | 'DNF' | 'DSQ';
  photo: string;
}
