import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MockingService } from 'src/app/services/mocking.service';

@Component({
  selector: 'app-stream-full',
  templateUrl: './stream-full.component.html',
  styleUrls: ['./stream-full.component.sass']
})

export class StreamFullComponent implements OnInit{
  data?:any;
  sub: Subscription;
  constructor(private mockingService:MockingService){
    this.data = null;

    this.sub = this.mockingService.subscribeRunnersResults().subscribe({
      "next": (data) => {
        console.log(data);
        this.data = data;
        //data.photo1 et photo2 et photo3 à alimenter aussi
        /* data.ContestId = 1;
        data.display = "podium"; // valeur = "podium" pour afficher l'écran du podium OU
        //data.display = "recap" //valeur = "recap" pour afficher le tableau des athlètes
        data.bib1 = "109";
        data.lastname1 = "Seraphina";
        data.firstname1 = "Raphael";
        data.lastnameR1 = "Bachibouzouk";
        data.firstnameR1 = "ignesta";
        data.totaltime1 = "1:26:44";
        data.bib2 = "217";
        data.lastname2 = "Jonas";
        data.firstname2 = "Michel";
        data.lastnameR2 = "Mannotto";
        data.firstnameR2 = "Francis";
        data.totaltime2 = "1:28:17";
        data.bib3 = "30";
        data.lastname3 = "Maurin";
        data.firstname3 = "Ange-Marie";
        data.lastnameR3 = "Chassaing";
        data.firstnameR3 = "Jonathan";
        data.totaltime3 = "1:28:35"; */
      },
      "error": (err) => {console.log(err);},
    });

  }

  ngOnInit(): void {

  }

}
