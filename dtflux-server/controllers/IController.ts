import express from 'express';
import http from 'http';
import WebSocket from 'ws';


export interface IController{
    basePath: string;
    router: express.Router
    model: any;
    ws?: WebSocket;
    initializeRoutes():void;
    messageHandler(data: any):void;
}