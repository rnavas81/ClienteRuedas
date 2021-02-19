import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UnirseRuedaComponent } from './views/unirse-rueda/unirse-rueda.component';
import { RuedaHorarioComponent } from './components/rueda-horario/rueda-horario.component';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';
import { AppRoutingModule } from './app-routing.module';
import { CabeceraComponent } from './components/vistaRueda/cabecera/cabecera.component';
import { NavVerticalComponent } from './components/vistaRueda/nav-vertical/nav-vertical.component';
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


@NgModule({
  declarations: [
    CabeceraComponent,
    AppComponent,
    NavVerticalComponent,
    PerfilUsuarioComponent,
    UnirseRuedaComponent,
    RuedaHorarioComponent,
    LoginComponent,
    RegistroComponent,
    MainComponent,
    RecuperarPassComponent,
    RecuperarComponent,
    PanelAdministradorComponent,
    SeleccionarRolComponent,
    EditarPerfilComponent,
    UsuarioPerfilComponent,
    VLoginComponent,
    VSignUpComponent,
    HomeComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
