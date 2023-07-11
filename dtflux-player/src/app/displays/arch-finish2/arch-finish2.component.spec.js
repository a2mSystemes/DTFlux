"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const arch_finish2_component_1 = require("./arch-finish2.component");
describe('ArchFinish2Component', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [arch_finish2_component_1.ArchFinish2Component]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(arch_finish2_component_1.ArchFinish2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
