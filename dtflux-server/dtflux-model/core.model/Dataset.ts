export interface IDataset<T>{
    add(key: string, value: T):void;
    remove(key: string):void;
}

export class Dataset<T> implements IDataset<T> {
    private items: Map<string, T>;

    constructor() {
        this.items = new Map<string, T>();
    }

    add(key: string, value: T): void {
        this.items.set(key, value);
    }

    has(key: string): boolean {
        return key in this.items;
    }

    get(key: string): T {
        return this.get(key);
    }
    remove(key: string): boolean {
        return this.items.delete(key);
    }
}
