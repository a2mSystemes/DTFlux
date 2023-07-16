import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MockingService } from 'src/app/services/mocking.service';



@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.sass'],
  animations: []

})
export class StreamComponent implements OnInit{
  data?:any;
  sub: Subscription;
  tableData: any[] = [];
  props: string[] = ['img', 'time', 'gap'];
  constructor(private mockingService:MockingService){
    this.data = null;

    this.sub = this.mockingService.data$.subscribe({
      "next": (data) => {
        console.log(data);
        this.data = data;
        data.status = 'finish-solo';
        data.contest = 1;
        data.selectorResult = 1;
        data.LastName = "Maurin";
        data.FirstName = "Ange-Marie";
        data.bib = "109";
        data.actualrank = "8";
        data.chronos = [
          {Split1img: "img1", Split1time: "08:09", Split1gap: "+00:07"},
          {Split2img: "img2", Split2time: "12:04", Split2gap: "+00:14"},
          {Split3img: "img3", Split3time: "16:32", Split3gap: "+00:54"},
          {Split4img: "img4", Split4time: "18:24", Split4gap: "+01:20"},
          {Split5img: "img5", Split5time: "28:17", Split5gap: "+01:24"},
          {Finishimg: "img6", Finishtime: "44:08", Finishgap: "+02:08"},
        ];

        const emptyTimeKeys = data.chronos.reduce((emptyKeys: any, current: any, index: number) => {
          const keyPrefix = index < data.chronos.length - 1 ? 'Split' + (index + 1) : 'Finish';
          if (current[keyPrefix + 'time'] === '') {
            emptyKeys.push(keyPrefix);
          }
          return emptyKeys;
        }, []);
        
        this.tableData = ['img', 'time', 'gap'].map(prop => {
          return data.chronos.reduce((acc: any, current: any, index: any) => {
            const keyPrefix = index < data.chronos.length - 1 ? 'Split' + (index + 1) : 'Finish';
            if (!emptyTimeKeys.includes(keyPrefix)) {
              const key = keyPrefix + prop;
              acc[keyPrefix] = current[key];
            }
            return acc;
          }, {});
        });

        
      },
      "error": (err) => {console.log(err);},
    });

  }

  ngOnInit(): void {

  }

  getRowValues(row: any): any[] {
    return Object.values(row);
  }

  isEmptyTime(index: number): boolean {
    if (index === this.data.chronos.length - 1) {
      return this.data.chronos[index]['Finishtime'] === '';
    } else {
      return this.data.chronos[index]['Split' + (index + 1) + 'time'] === '';
    }
  }

  isImage(value: string): boolean {
    return value.startsWith('img');
  }

  getDynamicImageLink(): string {
    return `/assets/Medias/Course-stream/Nomcourse-${this.data.contest}-${this.data.selectorResult}.png`;
  }

}
