"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const mocking_service_1 = require("./mocking.service");
describe('MockingService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(mocking_service_1.MockingService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
