import http from 'http';
import express from 'express';
import { createServer } from 'http'; 
import { IController } from './controllers/IController';
import { DisplayController } from './controllers/display-controller';
import { ExporterController } from './controllers/exporter-controller';
import { DTFluxModel } from './model/dtflux.model';
import * as config from './conf/conf.json';
import { WebSocket, Server } from 'ws';
import { Observable } from 'rxjs';

class App{
    public app: express.Application;
    public port: number;
    public wssPort: number;
    public controllers: Array<IController>;
    private model:DTFluxModel;
    server :http.Server;
    io: Server;
    data$: Observable<any>;
    ws?: WebSocket;

    constructor(port?: number){
        this.model = new DTFluxModel(config);
        this.wssPort = config.wssPort ? Number(config.wssPort) : 6001;
        this.port = config.httpPort ? Number(config.httpPort) : 8080;
        this.app = express();
        const server = http.createServer(this.app);
        server.listen(this.port);
        this.server = server;
        this.io  = new WebSocket.Server({server});
        this.io.on('connection', (ws) => {
            this.ws = ws;
            console.log('connection');
            ws.send("hello");
        });
        this.setupWss();

        this.controllers = new Array<IController>();
        this.initializeMiddleware();
        this.initializeControllers();
        this.data$ = this.model.sub.asObservable();
        this.data$.subscribe(data => {
            if(this.io.clients.size > 0){
                console.log("sending to clients")
                for(let client of this.io.clients){
                    client.send(data);
                    }
            }

            this.controllers.push(data)
        });
    }

    setupWss() {
        this.model.setSocket(this.io);
    }
    // handleMessage(ws: WebSocket, data: any) {
    //     const message = JSON.parse(data.toString());
    //     console.log(data.toString());
    //     ws.send('OK')
    // }

    initializeControllers() {
        this.controllers.push(new DisplayController(this.model));
        this.controllers.push(new ExporterController(this.model));
        for(let controller in this.controllers) {
            console.log(`setting up route for ${this.controllers[controller].basePath}`);
            this.app.use(this.controllers[controller].basePath, this.controllers[controller].router);
        }
    }
    initializeMiddleware() {
        
    }

    listen() {


    }
}


export default App;