import { OSCClient, OSCType } from 'ts-osc';
import * as conf from './../dtflux-conf/conf.json';

export class DTFluxMilluminService {
    private osc: any; // OSC socket instance

    constructor(address: string, port = 5000) {
        this.osc = new OSCClient(address, port);

    }
    public playColumn(columnIndex: number): void {
        const message = "/millumin/column/" + columnIndex + "/play";
        console.log(message);
        this.osc.send(message, "n");
    }

    public muteSound(): void {
        const message = '/millumin/audio/mute';
        this.osc.send(message);
    }
    public decreaseVolume(volumeValue: number): void {
        const message = '/millumin/audio/volume';
        this.osc.send(message, "i", volumeValue );
    }
    public increaseVolume(volumeValue: number): void {
        const message = '/millumin/audio/volume';
        this.osc.send(message, "i", volumeValue );
    }
}
