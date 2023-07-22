import { Component, Input, OnInit } from '@angular/core';
import { interval, map, timer } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.sass']
})
export class StopwatchComponent implements OnInit {

  @Input() set stopwatchTime(timeString: string) {
    this._stopwatchTime = this.convertToMilliseconds(timeString);
  }

  private _stopwatchTime: number = 0;

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    const timer$ = timer(0, 1000).subscribe((seconds: number) =>
      this._stopwatchTime = (seconds + 1) * 1000
    );
  }

  convertToMilliseconds(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const milliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
    return milliseconds;
  }

}
