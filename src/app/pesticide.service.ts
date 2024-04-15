import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PesticideService {

  private apiUrl = 'assets/pesticides.json';

  constructor(private http: HttpClient) { }

  getAllPesticides(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  findOrganicReplacementsForInorganic(inorganicPesticideName: string): Observable<string | string[]> {
    return this.getAllPesticides().pipe(
      map((pesticides: any[]) => {
        const inorganicPesticide = pesticides.find(p => p.name === inorganicPesticideName);
  
        if (inorganicPesticide) {
          if (inorganicPesticide.organicStatus == true) {
            return `${inorganicPesticideName} is an organic pesticide.`;
          } else {
            const organicReplacements: string[] = [];
            const inorganicPesticideCrops = inorganicPesticide.usedForCrops;
  
            pesticides.forEach(pesticide => {
              if (pesticide.organicStatus && this.arrayContainsAny(pesticide.usedForCrops, inorganicPesticideCrops)) {
                organicReplacements.push(pesticide.name);
              }
            });
  
            return organicReplacements;
          }
        }
  
        return []; // Return an empty array if the pesticide is not found
      })
    );
  }
  

  private arrayContainsAny(source: any[], target: any[]): boolean {
    return target.some(item => source.includes(item));
  }
}
