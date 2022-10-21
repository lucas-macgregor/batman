import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BatmanComponent } from './batman/batman.component';
import { GustosComponent } from './gustos/gustos.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { InicioComponent } from './inicio/inicio.component';
import { BatpadreComponent } from './batpadre/batpadre.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BatmanComponent,
    GustosComponent,
    NotfoundComponent,
    InicioComponent,
    BatpadreComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
