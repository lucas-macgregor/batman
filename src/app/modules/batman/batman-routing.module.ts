import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { GustosComponent } from 'src/app/components/gustos/gustos.component';
import { BatpadreComponent } from 'src/app/components/batpadre/batpadre.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { NotfoundComponent } from 'src/app/components/notfound/notfound.component'
import { AuthGuard } from 'src/app/guards/auth.guard';


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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatmanRoutingModule { }
