import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './views/perfil-usuario/perfil-usuario.component';
import { UnirseRuedaComponent } from './views/unirse-rueda/unirse-rueda.component';
import { PanelAdministradorComponent } from './views/panel-administrador/panel-administrador.component';
import { SeleccionarRolComponent } from './views/seleccionar-rol/seleccionar-rol.component';
import { EditarPerfilComponent } from './views/editar-perfil/editar-perfil.component';
import { RecuperarPassComponent } from './views/recuperar-pass/recuperar-pass.component';
import { VSignUpComponent } from './views/v-sign-up/v-sign-up.component';
import { HomeComponent } from './views/home/home.component';
import { AcercadeComponent } from './views/acercade/acercade.component';
import { ListaRuedasComponent } from './views/lista-ruedas/lista-ruedas.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RolGuardService } from './services/rol-guard.service';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent }, // ESTO DEBERIA SER EL HOME
  { path: 'login', component: LoginComponent, canActivate: []   },
  { path: 'signup', component: VSignUpComponent, canActivate: [LoginGuardService]   },
  { path: 'unirse', component: UnirseRuedaComponent, canActivate: [AuthGuardService]  },
  { path:'recuperar', component: RecuperarPassComponent, canActivate: [LoginGuardService]   },
  { path:'main', component: PerfilUsuarioComponent, canActivate: [AuthGuardService] },
  { path: 'adminUsuarios', component: PanelAdministradorComponent, canActivate: [AuthGuardService,RolGuardService] },
  { path: 'seleccionarRol', component: SeleccionarRolComponent },
  { path:'editProfile', component: EditarPerfilComponent, canActivate: [AuthGuardService] },
  { path:'acercade', component:AcercadeComponent},
  { path:'lista-ruedas', component:ListaRuedasComponent, canActivate: [AuthGuardService,RolGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
