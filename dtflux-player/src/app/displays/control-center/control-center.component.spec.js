"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const control_center_component_1 = require("./control-center.component");
describe('ControlCenterComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [control_center_component_1.ControlCenterComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(control_center_component_1.ControlCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
