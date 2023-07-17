import { IDataset } from "./Dataset";


export interface ISerializer<T>{
    dataset: any,
    connectInfos:any,
    forked:boolean,
    connect():void,
    serialize(data?:IDataset<T>):ISerializer<T>,
    deserialize(data?:IDataset<T>):ISerializer<T>,
    addData(data:IDataset<T>):ISerializer<T>,
    removeData(key: string):ISerializer<T>,
    clear():ISerializer<T>;
}

export interface Serializable<T>{
    serialize():void;
    deserialize():T;
}

export abstract class Serializer<T> implements ISerializer<T> {
    abstract dataset: IDataset<T>;
    connectInfos: any;
    abstract forked: boolean;
    abstract connect(): void;
    abstract serialize(data?: IDataset<T> | undefined): ISerializer<T>;
    abstract deserialize(data?: IDataset<T> | undefined): ISerializer<T>;
    abstract addData(data: IDataset<T>): ISerializer<T>;
    removeData(key: string): ISerializer<T> {
        this.dataset.remove(key);
        return this;
    }
    abstract clear(): ISerializer<T>;
}


