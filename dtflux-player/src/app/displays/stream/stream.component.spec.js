"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const stream_component_1 = require("./stream.component");
describe('StreamComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [stream_component_1.StreamComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(stream_component_1.StreamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
