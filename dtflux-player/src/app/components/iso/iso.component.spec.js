"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const iso_component_1 = require("./iso.component");
describe('IsoComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [iso_component_1.IsoComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(iso_component_1.IsoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
