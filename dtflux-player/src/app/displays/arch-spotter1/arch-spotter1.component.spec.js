"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const arch_spotter1_component_1 = require("./arch-spotter1.component");
describe('ArchSpotter1Component', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [arch_spotter1_component_1.ArchSpotter1Component]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(arch_spotter1_component_1.ArchSpotter1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
