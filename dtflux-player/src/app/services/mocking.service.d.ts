import { Observable, Subject, Subscription } from 'rxjs';
declare class Mock {
    lastname1: string;
    lastnameR1: string;
    firstname1: string;
    firstnameR1: string;
    bib1: number;
    rank1: number;
    actualtime1: string;
    finishtime1: string;
    photo1: string;
    lastname2: string;
    firstname2: string;
    lastnameR2: string;
    firstnameR2: string;
    bib2: number;
    rank2: number;
    actualtime2: string;
    finishtime2: string;
    photo2: string;
    lastname3: string;
    firstname3: string;
    lastnameR3: string;
    firstnameR3: string;
    bib3: number;
    rank3: number;
    actualtime3: string;
    finishtime3: string;
    lastname4: string;
    firstname4: string;
    lastnameR4: string;
    firstnameR4: string;
    bib4: number;
    rank4: number;
    actualtime4: string;
    finishtime4: string;
    photo4: string;
    constructor();
}
export declare class MockingService {
    static test: number;
    data$: Observable<any>;
    sub: Subscription;
    mock: Mock;
    subject: Subject<any>;
    constructor();
    setData(data: Mock): void;
}
export {};
