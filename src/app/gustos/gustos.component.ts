import { Component, OnInit } from '@angular/core';
import { Table } from '../models/table';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-gustos',
  templateUrl: './gustos.component.html',
  styleUrls: ['./gustos.component.css']
})
export class GustosComponent implements OnInit {

  gustos:Table[]=[];
  constructor(public apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getGustos().subscribe({
      next: (tabla) => this.gustos = tabla,
      error: (e) => console.error (e)
    })


  }
}
