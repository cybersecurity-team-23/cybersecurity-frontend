import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
Chart.register(...registerables)
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  labelData!: string[];
  reservationsData!: number[];
  profitData!: number[];
  type!: string;

  ngOnInit(): void {
    this.labelData = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.reservationsData = [10, 15, 20, 18, 25, 30, 22, 19, 17, 28, 32, 24];
    this.profitData = [2000, 2500, 3000, 2800, 3500, 4000, 3200, 2900, 2700, 3800, 4200, 3500];
    this.type = "bar";
    this.RenderChart(this.labelData, this.reservationsData, this.profitData, this.type);
  }

  RenderChart(labelData: string[], reservationsData: number[], profitData: number[], type: any) {
    const chart = new Chart("chart", {
      type: type,
      data: {
        labels: labelData,
        datasets: [{
          label: 'Reservations',
          data: reservationsData,
          yAxisID: 'y1',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Profit',
          data: profitData,
          yAxisID: 'y2',
          backgroundColor: 'rgba(254, 163, 26, 0.2)',
          borderColor: 'rgba(254, 163, 26, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y1: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Reservations'
            }
          },
          y2: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Profit'
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
  }
}
