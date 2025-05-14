import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';

interface CovidData {
  country: string;
  cases: number;
  recovered: number;
  deaths: number;
}

@Component({
  selector: 'app-dynamic',
  imports: [FormsModule],
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.css'
})
export class DynamicComponent implements AfterViewInit{
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartInstance: any;
  chartType: string = 'bar';
  
  covidData: CovidData[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<CovidData[]>('https://disease.sh/v3/covid-19/countries')
      .subscribe(data => {
        this.covidData = data;
        if (this.chartInstance) {
          this.updateChart();
        }
      });
  }
  
    ngAfterViewInit(): void {
      this.chartInstance = echarts.init(this.chartContainer.nativeElement);
      //this.updateChart();
    }
  
    updateChart(): void {
      this.chartInstance.clear();
      const countries = this.covidData.map(d => d.country);
      const deaths = this.covidData.map(d =>({name: d.country,value: d.deaths}));
  
      let option: any;
  
      if (this.chartType === 'pie') {
        
        option = {
          title: { text: 'Confirmed Cases - Pie Chart', left: 'center',top:10 },
          tooltip: { trigger: 'item' },
          series: [
            {
              type: 'pie',
              radius: '70%',
              center: ['50%', '60%'], 
              data: deaths
            }
          ]
        };
        
      } 
      else {
        option = {
          title: { text: `COVID-19 Cases by Country (${this.chartType})`, left: 'center' },
          tooltip: { trigger: 'axis' },
          legend: { data: ['Confirmed', 'Recovered', 'Deaths'], top: 30 },
          xAxis: { type: 'category', data: countries },
          yAxis: { type: 'value' },
          series: [
            { name: 'Confirmed', type: this.chartType, data: this.covidData.map(d => d.cases) },
            { name: 'Recovered', type: this.chartType, data: this.covidData.map(d => d.recovered) },
            { name: 'Deaths', type: this.chartType, data: this.covidData.map(d => d.deaths) }
          ]
        };
      }
  
      this.chartInstance.setOption(option);
    }
  }
