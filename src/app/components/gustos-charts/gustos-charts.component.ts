import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-gustos-charts',
  templateUrl: './gustos-charts.component.html',
  styleUrls: ['./gustos-charts.component.css']
})
export class GustosChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() gustos:Table[]=[];
}
