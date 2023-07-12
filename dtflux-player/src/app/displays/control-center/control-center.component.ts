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

  XP(): void {
   console.log("Course XP")
  }

  XPSH(): void {
    console.log("Course XPS Hommes")
   }
 
   XPSF(): void {
    console.log("Course XPS Femmes")
   }
 
   XPSR(): void {
    console.log("Course XPS Relais")
   }
 
   FXP(): void {
    console.log("Tableau XP")
   }
 
   FXPSH(): void {
     console.log("Tableau XPS Hommes")
    }
  
    FXPSF(): void {
     console.log("Tableau XPS Femmes")
    }
  
    FXPSR(): void {
     console.log("Tableau XPS Relais")
    }

    kilo(): void {
      console.log("Etape kilo")
     }

    mega(): void {
      console.log("Etape mega")
     }

    giga(): void {
      console.log("Etape giga")
     }

    tera(): void {
      console.log("Etape tera")
     }

    peta(): void {
      console.log("Etape peta")
     }

     kilo2(): void {
      console.log("Etape kilo 2")
     }

    mega2(): void {
      console.log("Etape mega 2")
     }

    giga2(): void {
      console.log("Etape giga 2")
     }

    tera2(): void {
      console.log("Etape tera 2")
     }

    peta2(): void {
      console.log("Etape peta 2")
     }

}
