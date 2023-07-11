import * as express from 'express';
import { IController } from './IController';
import WebSocket from 'ws';


export class ExporterController implements IController{
    basePath: string;
    router: express.Router;
    model: any;
    ws?: import("ws") | undefined;

    constructor(model:any){
        this.model = model;
        this.basePath = '/';
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get('/', this.receiveFromExporter.bind(this));
    }

    receiveFromExporter(req: express.Request, response: express.Response, next: express.NextFunction):void{
        console.log(`ROUTE ${this.basePath} --> \nrequest body : "${req.body}"`);
        response.type('application/json');
        response.status(200).json({message: 'ok'});
    }
    
    messageHandler(data: any): void {
        throw new Error('Method not implemented.');
    }
    
}

