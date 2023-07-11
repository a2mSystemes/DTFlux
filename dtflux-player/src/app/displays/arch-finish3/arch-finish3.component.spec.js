"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const arch_finish3_component_1 = require("./arch-finish3.component");
describe('ArchFinish3Component', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [arch_finish3_component_1.ArchFinish3Component]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(arch_finish3_component_1.ArchFinish3Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
