"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const info_etape_component_1 = require("./info-etape.component");
describe('InfoEtapeComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [info_etape_component_1.InfoEtapeComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(info_etape_component_1.InfoEtapeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
