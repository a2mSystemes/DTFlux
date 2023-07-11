"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockingService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let Mock = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Mock = class {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            Mock = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
        lastname1;
        lastnameR1;
        firstname1;
        firstnameR1;
        bib1;
        rank1;
        actualtime1;
        finishtime1;
        photo1;
        lastname2;
        firstname2;
        lastnameR2;
        firstnameR2;
        bib2;
        rank2;
        actualtime2;
        finishtime2;
        photo2;
        lastname3;
        firstname3;
        lastnameR3;
        firstnameR3;
        bib3;
        rank3;
        actualtime3;
        finishtime3;
        lastname4;
        firstname4;
        lastnameR4;
        firstnameR4;
        bib4;
        rank4;
        actualtime4;
        finishtime4;
        photo4;
        constructor() {
            this.lastname1 = "Raphael";
            this.firstname1 = "Seraphina";
            this.lastnameR1 = "Palienkov";
            this.firstnameR1 = "Dimitri";
            this.bib1 = 109;
            this.rank1 = 29;
            this.actualtime1 = "21:04";
            this.finishtime1 = "13:29";
            this.photo1 = "/assets/Photos coureurs/109.png";
            this.lastname2 = "Jonas";
            this.firstname2 = "Michelle";
            this.lastnameR2 = "Palienkov";
            this.firstnameR2 = "Dimitri";
            this.bib2 = 24;
            this.rank2 = 4;
            this.actualtime2 = "21:04";
            this.finishtime2 = "13:07";
            this.photo2 = "/assets/Photos coureurs/109.png";
            this.lastname3 = "Bachibouzouk";
            this.firstname3 = "Henri";
            this.lastnameR3 = "Farmer";
            this.firstnameR3 = "Mylène";
            this.bib3 = 287;
            this.rank3 = 101;
            this.actualtime3 = "32:49";
            this.finishtime3 = "41:55";
            this.photo2 = "/assets/Photos coureurs/109.png";
            this.lastname4 = "Dusseldorf";
            this.firstname4 = "Ronan";
            this.lastnameR4 = "Dupond";
            this.firstnameR4 = "Jean";
            this.bib4 = 3;
            this.rank4 = 2;
            this.actualtime4 = "15:26";
            this.finishtime4 = "19:38";
            this.photo4 = "Photos coureurs/109.png";
        }
    };
    return Mock = _classThis;
})();
class MockingService {
    static test = 0;
    data$;
    sub;
    mock;
    subject;
    constructor() {
        MockingService.test += 1;
        this.mock = new Mock();
        this.data$ = new rxjs_1.Observable(observer => {
            observer.next(this.mock);
        });
        this.subject = new rxjs_1.Subject();
        this.sub = this.subject.subscribe({
            "next": (data) => {
                this.mock = data;
                console.log(data);
            }
        });
    }
    setData(data) {
        this.data$;
    }
}
exports.MockingService = MockingService;
