import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from "./title/title.component";
import { ChartComponent } from "./chart/chart.component";

@Component({
  selector: 'app-root',
  imports: [TitleComponent, ChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CovidCaseTracker';
}
