import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/vistaRueda/cabecera/cabecera.component';
import { NavVerticalComponent } from './components/vistaRueda/nav-vertical/nav-vertical.component';
import { PerfilUsuarioComponent } from './views/perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    NavVerticalComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
