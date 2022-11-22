import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GustosComponent } from 'src/app/components/gustos/gustos.component';
import { BatpadreComponent } from 'src/app/components/batpadre/batpadre.component';
import { NotfoundComponent } from 'src/app/components/notfound/notfound.component'
import { InicioComponent } from 'src/app/components/inicio/inicio.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'gustos', component: GustosComponent},
  {path: 'batman', component: BatpadreComponent},
  {path: 'batpadre', component: BatpadreComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  bootstrap: [InicioComponent]
})
export class BatmanRoutingModule { }
