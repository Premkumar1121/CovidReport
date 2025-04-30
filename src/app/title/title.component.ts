import { Component } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  
  title = "COVID-19 Case Tracker";
  description = "Visualizing confirmed, recovered, and death cases across selected countries.";


}
