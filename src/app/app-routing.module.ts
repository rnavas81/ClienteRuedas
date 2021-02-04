import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MainComponent } from './views/main/main.component';
import { RecuperarPassComponent } from './views/recuperar-pass/recuperar-pass.component';
import { UnirseRuedaComponent } from './views/unirse-rueda/unirse-rueda.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: LoginComponent },
  { path: 'signup', component: RegistroComponent },
  { path: 'unirse', component: UnirseRuedaComponent },
  { path:'main', component: MainComponent },
  { path:'recuperar', component: RecuperarPassComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
