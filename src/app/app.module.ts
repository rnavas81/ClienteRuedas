import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UnirseRuedaComponent } from './views/unirse-rueda/unirse-rueda.component';
import { RuedaHorarioComponent } from './components/rueda-horario/rueda-horario.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';
import { AppRoutingModule } from './app-routing.module';
import { CabeceraComponent } from './components/vistaRueda/cabecera/cabecera.component';
import { PerfilUsuarioComponent } from './views/perfil-usuario/perfil-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { RecuperarPassComponent } from './views/recuperar-pass/recuperar-pass.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { PanelAdministradorComponent } from './views/panel-administrador/panel-administrador.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeleccionarRolComponent } from './views/seleccionar-rol/seleccionar-rol.component';
import { EditarPerfilComponent } from './views/editar-perfil/editar-perfil.component';
import { UsuarioPerfilComponent } from './components/usuario-perfil/usuario-perfil.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { VLoginComponent } from './views/v-login/v-login.component';
import { VSignUpComponent } from './views/v-sign-up/v-sign-up.component';
import { HomeComponent } from './views/home/home.component';
import { AcercadeComponent } from './views/acercade/acercade.component';
import { ListaRuedasComponent } from './views/lista-ruedas/lista-ruedas.component';
import { ToastComponent } from './components/toast/toast.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RolGuardService } from './services/rol-guard.service';


@NgModule({
  declarations: [
    CabeceraComponent,
    AppComponent,
    PerfilUsuarioComponent,
    UnirseRuedaComponent,
    RuedaHorarioComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarPassComponent,
    RecuperarComponent,
    PanelAdministradorComponent,
    SeleccionarRolComponent,
    EditarPerfilComponent,
    UsuarioPerfilComponent,
    VLoginComponent,
    VSignUpComponent,
    HomeComponent,
    AcercadeComponent,
    ListaRuedasComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [AuthGuardService, RolGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
