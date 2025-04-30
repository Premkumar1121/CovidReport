import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';
interface CovidData {
  country: string;
  confirmed: number;
  recovered: number;
  deaths: number;
}

@Component({
  selector: 'app-chart',
  imports:[FormsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartInstance: any;
  chartType: string = 'bar';

  // covidData: CovidData[] = [
  //   { country: 'India', confirmed: 50000, recovered: 45000, deaths: 3000 },
  //   { country: 'USA', confirmed: 70000, recovered: 65000, deaths: 2000 },
  //   { country: 'Brazil', confirmed: 30000, recovered: 25000, deaths: 1500 },
  //   { country: 'UK', confirmed: 40000, recovered: 38000, deaths: 1000 },
  //   { country: 'Germany', confirmed: 35000, recovered: 33000, deaths: 500 }
  // ];
  
covidData: CovidData[] = [];
constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.http.get<CovidData[]>('https://localhost:7016/GetData')
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
    const confirmed = this.covidData.map(d =>({name: d.country,value: d.confirmed}));

    let option: any;

    if (this.chartType === 'pie') {
      option = {
        title: { text: 'Confirmed Cases - Pie Chart', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: confirmed
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
          { name: 'Confirmed', type: this.chartType, data: this.covidData.map(d => d.confirmed) },
          { name: 'Recovered', type: this.chartType, data: this.covidData.map(d => d.recovered) },
          { name: 'Deaths', type: this.chartType, data: this.covidData.map(d => d.deaths) }
        ]
      };
    }

    this.chartInstance.setOption(option);
  }
}
