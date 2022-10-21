import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { InicioComponent } from './inicio/inicio.component';
import { GustosComponent } from './gustos/gustos.component';
import { BatpadreComponent } from './batpadre/batpadre.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'gustos', component: GustosComponent, canActivate: [AuthGuard],data: {
    authGuardRedirect: '/inicio',
  },},
  {path: 'batman', component: BatpadreComponent, canActivate: [AuthGuard],data: {
    authGuardRedirect: '/inicio',
  },},
  {path: 'batpadre', component: BatpadreComponent, canActivate: [AuthGuard],data: {
    authGuardRedirect: '/inicio',
  }},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
