import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatmanRoutingModule } from './batman-routing.module';
import { BatmanComponent } from 'src/app/components/batman/batman.component';
import { BatpadreComponent } from 'src/app/components/batpadre/batpadre.component';
import { NotfoundComponent } from 'src/app/components/notfound/notfound.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GustosComponent } from 'src/app/components/gustos/gustos.component';
import { HeaderInterceptor } from 'src/app/interceptors/header.interceptor';

@NgModule({
  declarations: [
    BatmanComponent,
    GustosComponent,
    BatpadreComponent,
    NotfoundComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    BatmanRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi:true
    }
  ]
})
export class BatmanModule { }
