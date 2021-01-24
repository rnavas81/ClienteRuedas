import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule }  from '@angular/forms';
import { Route, Router, RouterModule } from "@angular/router";
import { RegistroComponent } from './components/registro/registro.component';
const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'home', component: LoginComponent },
  { path: 'signin', component: RegistroComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
