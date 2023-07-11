import * as express from 'express';
import { IController } from './IController';
import WebSocket from 'ws';
import http from 'http';
import { Subscription } from 'rxjs';


export interface IDisplayResponse{
    status: string;
    message: string;
    timestamp: Date;
    uuid: string;
    model?: any;
}

export class DisplayController implements IController{
    basePath: string;
    router: express.Router;
    model: any;
    subscription: any;
    ws?: WebSocket;

    constructor(model:any){
        // console.log(this.model);
        this.router = express.Router();
        this.basePath = '/display';
        this.initializeRoutes();
    }

    messageHandler(data: any): void {
        if(this.ws){
            this.ws.send(JSON.stringify({test:"test"}));
        }
    }


    initializeRoutes(): void {
        this.router.get('/:id/create', this.displayCreateRoute.bind(this));
        this.router.get('/:id/show', this.displayShowRoute.bind(this));
    }

    displayCreateRoute(req: express.Request, response: express.Response, next: express.NextFunction){
        console.log(this.basePath);
        let id: number = parseInt(req.params.id);
        let ret: IDisplayResponse = {
            "status": "success", "message": "Display Created " + id, "timestamp": new Date(), "uuid": "1234",
            "model": {"test":"test"}
        };
        return response.status(200).json(ret);
    }
    displayShowRoute(req: express.Request, response: express.Response, next: express.NextFunction){
        console.log(this);
        let id: number = parseInt(req.params.id);
        let ret: IDisplayResponse = {
            "status": "success", "message": "Display show " + id, "timestamp": new Date(), "uuid": "1234", "model": this.basePath
        };
        return response.status(200).json(ret);
    }
}