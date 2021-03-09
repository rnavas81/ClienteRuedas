import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Carshare';

  constructor(){
    this.cargarTema();
  }

  cargarTema = () => {
    const tema = localStorage.getItem(environment.LOCALSTORAGE_THEME);
    if(!!tema){
      document.getElementsByTagName('body')[0].classList.add(tema);

    }
  }
}
