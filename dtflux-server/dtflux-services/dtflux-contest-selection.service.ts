import { Observable, Subject } from "rxjs";

export class DTFluxContestSelectionService{
    private _selectedContest: number = 1;
    private _changeSubject = new Subject<number>();


    constructor(){
        this._changeSubject.next(this._selectedContest);
    }
    getSelectedObservable(): Subject<number>{
        return this._changeSubject;
    }
    getChanges(): Observable<number>{
        return this._changeSubject.asObservable();
    }
    setContest(contest: number){
        this._selectedContest = contest;
        this._changeSubject.next(this._selectedContest);
    }
}