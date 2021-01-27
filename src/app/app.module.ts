import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnirseRuedaComponent } from './views/unirse-rueda/unirse-rueda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RuedaHorarioComponent } from './components/rueda-horario/rueda-horario.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './views/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    UnirseRuedaComponent,
    RuedaHorarioComponent,
    MainComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
