import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MockingService } from 'src/app/services/mocking.service';

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.sass']
})


export class ControlCenterComponent implements OnInit {
 val: Array<string> = ["/assets/Photos coureurs/109.png", "/assets/Photos coureurs/110.png"];
  isFirst: boolean;
  sub: Subscription;

  constructor(private mockingService: MockingService){
    this.isFirst = true;
    this.sub = this.mockingService.data$.subscribe({
      "next": (data) => console.log(data),
      "error" : (err) => console.log(err)
    });
  }
  ngOnInit(): void {

  }

  toggle(): void {
    let img = 0;
    if (!this.isFirst)
    img = 1;

    this.isFirst = !this.isFirst;
    console.log(this.val[img]);
    let data = this.mockingService.mock;
    data.photo1 = this.val[img];
    this.mockingService.setData(data);
  }

}
