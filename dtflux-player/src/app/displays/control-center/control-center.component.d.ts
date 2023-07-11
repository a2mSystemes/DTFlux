import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockingService } from 'src/app/services/mocking.service';
export declare class ControlCenterComponent implements OnInit {
    private mockingService;
    val: Array<string>;
    isFirst: boolean;
    sub: Subscription;
    constructor(mockingService: MockingService);
    ngOnInit(): void;
    toggle(): void;
}
