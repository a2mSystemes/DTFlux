import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChronodatasHService {
  updateData(data: { kilo: any; mega: any; giga: any; tera: any; peta: any; }) {
    return data;
    //throw new Error('Method not implemented.');
  }
  getData(): any[] {
    // Effectuez les opérations nécessaires pour récupérer les données
    const dataschrono = ['Donnée 1', 'Donnée 2', 'Donnée 3'];
    return dataschrono;
  }
}
