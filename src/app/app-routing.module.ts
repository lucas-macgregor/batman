import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { GustosComponent } from './components/gustos/gustos.component';
import { BatpadreComponent } from './components/batpadre/batpadre.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

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
