import { Component } from '@angular/core';
import { PesticideService } from '../pesticide.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  inorganicPesticide = '';
  isBtnClicked:boolean = false;
  toBeReplaced: string = '';
  resultMessage: string | null = null;
  organicReplacements: string[] = [];
  isNoResultFound: boolean = false; // Define isNoResultFound property

  constructor(private pesticideService: PesticideService) { }

  searchOrganicReplacements() {
    this.isBtnClicked = true;
    this.toBeReplaced = this.inorganicPesticide; // Store the input for display
    this.pesticideService.findOrganicReplacementsForInorganic(this.inorganicPesticide)
      .subscribe((result: string | string[]) => {
        if (typeof result === 'string') {
          this.resultMessage = result; // Display the message indicating the pesticide is organic
          this.organicReplacements = []; // Clear organic replacements array
          this.isNoResultFound = false; // Reset isNoResultFound flag
        } else {
          this.resultMessage = null; // Clear any existing result message
          this.organicReplacements = result; // Display the organic replacements
          this.isNoResultFound = this.organicReplacements.length === 0; // Set isNoResultFound based on result
        }
      });
  }
}
