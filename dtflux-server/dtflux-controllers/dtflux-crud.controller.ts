import express, { Router, Request, Response } from "express";
import { DTFluxDbService } from "../dtflux-services/dtflux-database.service";

export class CrudController {
  private _router: Router;

  constructor(private _dtfluxDbService: DTFluxDbService) {
    this._router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Define your CRUD routes here
    this._router.get("/", this.getAll);
    this._router.get("/data/:collection", this.getAll);
    this._router.get("/data/:collection/:id", this.getById);
    this._router.post("/data/:collection/", this.create);
    this._router.put("/data/:collection/:id", this.update);
    this._router.delete("/data/:collection/:id", this.delete);
    this._router.patch("/data", this.saveDb);
    this._router.get("/save", this.saveDb);
    this._router.get("/export/json", this.exportJson);
  }



  private handleError(res: Response, error: string, crudOp: string): void {
    res.status(500).json({
      status: "NOK",
      error,
      crudOp,
      data: null
    });
  }

  private getAll = (req: Request, res: Response): void => {
    const colName = req.params.collection;
    // Get all data from the database
    // const data = this._dtfluxDbService.getAll(req.params.collectionName);
    // res.json(data);
    const collection = this._dtfluxDbService.getAll(colName);
    res.status(200).json({
      status: "OK",
      error: "",
      crudOp: "getAll",
      data: collection
    });
    return;
  };

  private getById = (req: Request, res: Response): void => {
    const colName = req.params.collection
      ? req.params.collection
      : req.query.collection
      ? req.query.collection
      : req.body.collection;
    let id = req.params.id
    ? req.params.id
    : req.query.id
    ? req.query.id
    : req.body.id;


    if (colName !== undefined) {
      if(!Number.isNaN(id)){
        id = Number(id);
        try{
          const result = this._dtfluxDbService.getById(colName, id);
          if(result){
            res.status(201).json({
              status: "NOK",
              error: null,
              crudOp: "getById",
              data: result
            });
            return;
          }
          res.status(404).json({
            status: "NOK",
            error: `ressource with id ${id} not found in ${colName}`,
            crudOp: "getById",
            data: null
          });         
        }catch(error){
          res.status(500).json({
            status: "NOK",
            error: error,
            crudOp: "getById",
            data: null
          });
          return;
        }
      }
      res
        .status(500)
        .json({
          status: "NOK",
          error: `id ${id} provided is not a number`,
          crudOp: "getById",
          data: null
        });
        return;
    }
    // Get all data from the database
    // const data = this._dtfluxDbService.getAll(req.params.collectionName);
    // res.json(data);

  };
  
  private create = (req: Request, res: Response): void => {
    const colName = req.params.collection
      ? req.params.collection
      : req.query.collection
      ? req.query.collection
      : req.body.collection;
    const doc = req.body.doc
    if (colName === undefined) {
      res
        .status(500)
        .json({
          status: "NOK",
          error: "no collectionName provided Collection",
          crudOp: "create",
          data: null
        });
        return;
    }
    if(doc === undefined){
      res
      .status(500)
      .json({
        status: "NOK",
        error: `no data to insert into collection ${colName}`,
        crudOp: "create",
        data: null
      });
      return;   
    }
    // Get all data from the database
    // const data = this._dtfluxDbService.getAll(req.params.collectionName);
    // res.json(data);
    try{
      const collection = this._dtfluxDbService.insert(colName, doc);
      res.status(201).json({
        status: "OK",
        error: "",
        crudOp: "create",
        data: doc
      });
      return;
    }catch(err){
      res
      .status(500)
      .json({
        status: "NOK",
        error: `database error inserting into collection ${colName}: ${err}`,
        crudOp: "create",
        data: null
      });
      return;
    }

  };

  private update = (req: Request, res: Response): void => {
    const colName = req.params.collection
      ? req.params.collection
      : req.query.collection
      ? req.query.collection
      : req.body.collection;
      let id = req.params.id
      ? req.params.id
      : req.query.id
      ? req.query.id
      : req.body.id;
      const doc = req.body.doc;
    if (colName === undefined) {
      res
        .status(500)
        .json({
          status: "NOK",
          error: "no collectionName provided Collection",
          crudOp: "update",
          data: null
        });
        return;
    }
    if(!Number.isNaN(id)){
    id = Number(id);
    if(doc){
      try{
        const collection = this._dtfluxDbService.update(colName, id, doc);
        res.status(200).json({
          status: "OK",
          error: "",
          crudOp: "update",
          data: collection
        });
        return;
      }catch(err){
        res.status(404).json({
          status: "NOK",
          error: `database error while updating id ${id} in collection ${colName} with data ${doc} : ${err}`,
          crudOp: "update",
          data: null
        });
        return;
      }
    }
  }
    
  };

  private delete = (req: Request, res: Response): void => {
    const colName = req.params.collection
      ? req.params.collection
      : req.query.collection
      ? req.query.collection
      : req.body.collection;
      let id = req.params.id
      ? req.params.id
      : req.query.id
      ? req.query.id
      : req.body.id;
      if (colName !== undefined) {
        if(!Number.isNaN(id)){
          id = Number(id);
          try{
            const result = this._dtfluxDbService.delete(colName, id);
            res.status(201).json({
              status: "OK",
              error: null,
              crudOp: "delete",
              data: result
            });
            return;
          }catch(error){
            res.status(404).json({
              status: "NOK",
              error: `database error while deleting id ${id} in collection ${colName} : ${error}`,
              crudOp: "delete",
              data: null
            });
            return;
          }
        }
        res
          .status(500)
          .json({
            status: "NOK",
            error: `id ${id} provided is not a number`,
            crudOp: "getById",
            data: null
          });
          return;
      }
  };

  private saveDb = (req: Request, res: Response):void =>{
    try{
      this._dtfluxDbService.save();
      res.status(201).json({
        status: "OK",
        error: null,
        crudOp: "saveDb",
        data: null
      });
    }catch(err){
      res.status(500).json({
        status: "NOK",
        error: `error while saving database: ${err}`,
        crudOp: "saveDb",
        data: null
      });
    }
  }
  private exportJson = (req: Request, res: Response):void =>{
    try{
      const dbjs = this._dtfluxDbService.exportToJson();
      res.status(201).send(dbjs);
    }catch(err){
      res.status(500).json({
        status: "NOK",
        error: `error while exporting database to json: ${err}`,
        crudOp: "exportToJson",
        data: null
      });
    }
  }

  get router(): Router {
    return this._router;
  }
}
