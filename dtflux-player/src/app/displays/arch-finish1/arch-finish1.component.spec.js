"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const arch_finish1_component_1 = require("./arch-finish1.component");
describe('ArchFinish1Component', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [arch_finish1_component_1.ArchFinish1Component]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(arch_finish1_component_1.ArchFinish1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
