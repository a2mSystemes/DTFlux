"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const websocket_service_1 = require("./websocket.service");
describe('WebsocketService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(websocket_service_1.WebsocketService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
