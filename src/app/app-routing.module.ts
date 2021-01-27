import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { UnirseRuedaComponent } from './views/unirse-rueda/unirse-rueda.component';

const routes: Routes = [
  {path:'', component: UnirseRuedaComponent},
  {path:'main', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
