import { Observable, Subject } from "rxjs";

export class DTFluxSelectionService{
    private _selectedContest: number = 1;
    private _selectedStage: number = 1;

    private _changeSubjectContest = new Subject<number>();
    private _changeSubjectStage = new Subject<number>();
    private _changeSubject = new Subject<any>();


    constructor(){
        this._changeSubject.next(this._selectedContest);
        //logging
        this.getStageObservable().subscribe( (stageId) => console.log("stageId changed " + stageId));
        this.getContestObservable().subscribe( (contestId) => console.log("contestId changed " + contestId));
    }

    contestId(): number {
        return this._selectedContest;
    }

    stageId(): number {
        return this._selectedStage;
    }

    getStageObservable(): Observable<number>{
        return this._changeSubjectStage.asObservable();
    }
    getContestObservable(): Observable<number>{
        return this._changeSubjectContest.asObservable();
    }
    getChanges(): Observable<any>{
        return this._changeSubject.asObservable();
    }

    setContest(contest: number){
        this._selectedContest = contest;
        this._changeSubject.next({event: "contestChanged", data: this._selectedContest});
        this._changeSubjectContest.next(this._selectedContest);
    }
    setStage(stage: number){
        this._selectedStage = stage;
        this._changeSubject.next({event: "stageChanged", data: this._selectedStage});
        this._changeSubjectStage.next(this._selectedStage);
    }
}