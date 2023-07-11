"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const column_component_1 = require("./column.component");
describe('ColumnComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [column_component_1.ColumnComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(column_component_1.ColumnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
