import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnirseRuedaComponent } from './views/unirse-rueda/unirse-rueda.component';
import { RuedaHorarioComponent } from './components/rueda-horario/rueda-horario.component';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { Route, Router, RouterModule } from "@angular/router";
import { RegistroComponent } from './components/registro/registro.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UnirseRuedaComponent,
    RuedaHorarioComponent,
    MainComponent
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
