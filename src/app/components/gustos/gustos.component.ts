import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Table } from '../../models/table';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-gustos',
  templateUrl: './gustos.component.html',
  styleUrls: ['./gustos.component.css']
})
export class GustosComponent implements OnInit {

  gustos:Table[]=[];
  constructor(private apiService:ApiService, private auth:AuthService ) { }

  ngOnInit(): void {
    this.apiService.getGustos().subscribe({
      next: (tabla) => this.gustos = tabla,
      error: (e) => {
        if (e.status===401) {
          this.auth.expiredToken();
        }
        console.error (e);
    }
  });
  }
}
