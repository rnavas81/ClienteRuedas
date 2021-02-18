import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarPassComponent } from './views/recuperar-pass/recuperar-pass.component';
import { PerfilUsuarioComponent } from './views/perfil-usuario/perfil-usuario.component';
import { UnirseRuedaComponent } from './views/unirse-rueda/unirse-rueda.component';
import { PanelAdministradorComponent } from './views/panel-administrador/panel-administrador.component';
import { EditarPerfilComponent } from './views/editar-perfil/editar-perfil.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistroComponent },
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
