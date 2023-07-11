import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockingService } from 'src/app/services/mocking.service';
export declare class ArchFinish1Component implements OnInit {
    private mockingService;
    data?: any;
    sub: Subscription;
    constructor(mockingService: MockingService);
    ngOnInit(): void;
}
