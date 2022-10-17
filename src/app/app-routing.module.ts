import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { InicioComponent } from './inicio/inicio.component';
import { GustosComponent } from './gustos/gustos.component';
import { BatpadreComponent } from './batpadre/batpadre.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'gustos', component: GustosComponent},
  {path: 'batman', component: BatpadreComponent},
  {path: 'batpadre', component: BatpadreComponent},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
