import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './views/perfil-usuario/perfil-usuario.component';
import { UnirseRuedaComponent } from './views/unirse-rueda/unirse-rueda.component';
import { PanelAdministradorComponent } from './views/panel-administrador/panel-administrador.component';
import { EditarPerfilComponent } from './views/editar-perfil/editar-perfil.component';
import { RecuperarPassComponent } from './views/recuperar-pass/recuperar-pass.component';
import { VSignUpComponent } from './views/v-sign-up/v-sign-up.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // ESTO DEBERIA SER EL HOME
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: VSignUpComponent },
  { path: 'unirse', component: UnirseRuedaComponent },
  { path:'recuperar', component: RecuperarPassComponent },
  { path:'main', component: PerfilUsuarioComponent },
  { path: 'administrador', component: PanelAdministradorComponent },
  { path:'profile', component: EditarPerfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
