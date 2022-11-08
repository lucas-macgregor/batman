import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginModule } from './modules/login/login.module'

const routes: Routes = [
  {path: 'batman',
  loadChildren: () => import('./modules/batman/batman.module').then(m => m.BatmanModule),
   canActivate: [AuthGuard],
   data: {
    authGuardRedirect: 'login',
  },},
  {path: 'login', loadChildren: () => LoginModule},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
