import { Component } from '@angular/core';
import { DynamicComponent } from "./dynamic/dynamic.component";
import { TitleComponent } from "./title/title.component";

@Component({
  selector: 'app-root',
  imports: [DynamicComponent, TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CovidCaseTracker';
}
