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
    this.sub = this.mockingService.subscribeRunnersResults().subscribe({
      "next": (data) => console.log(data),
      "error" : (err) => console.log(err)
    });
  }
  ngOnInit(): void {

  }

  XP(): void {
   console.log("Contest = 2")
  }

  XPSH(): void {
    console.log("Contest = 3 & Gender = H")
   }

   XPSF(): void {
    console.log("Contest = 3 & Gender = F")
   }

   XPSR(): void {
    console.log("Contest = 1")
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
      //envoyer un reset Millumin
     }

    mega(): void {
      console.log("Etape mega")
      //envoyer un reset Millumin
     }

    giga(): void {
      console.log("Etape giga")
      //envoyer un reset Millumin
     }

    tera(): void {
      console.log("Etape tera")
      //envoyer un reset Millumin
     }

    peta(): void {
      console.log("Etape peta")
      //envoyer un reset Millumin
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

     waiting(): void {
      console.log("Enleve le wainting 1")
     }


     ValiderMaillot(): void {
      console.log("Maillot :")
     }

}
