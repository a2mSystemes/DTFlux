"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const classement_component_1 = require("./classement.component");
describe('ClassementComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [classement_component_1.ClassementComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(classement_component_1.ClassementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
