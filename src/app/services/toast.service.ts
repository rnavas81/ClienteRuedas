import { Injectable } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any=[];
  constructor() {
    // this.toasts = [];
    this.toasts = [];
    this.add({text:'probando2',type:'info'});
  }
  /**
   *
   * @param data Agrega un elemento a la lista
   */
  add = (data: any) => {
    if (!data.hasOwnProperty('text')) data.text = 'Text dummy';
    data.class = 'content rounded px-4 py-3 my-3';
    switch (data.type) {
      case 'info':
        data.class+=' bg-info';
        break;
      case 'success':
        data.class+=' bg-success';
        break;
      case 'warning':
        data.class+=' bg-warning';
        break;
      case 'danger':
        data.class+=' bg-danger';
        break;
      default:
        data.class+=' bg-primary text-white';
        break;
    }
    this.toasts.push(data);
    console.log(this.toasts);

    // var toast = document.createElement('div');
    // toast.classList.add('content', 'rounded', 'px-4', 'py-3', 'my-3');
    // toast.textContent = data.text;
    // this.toasts.add(toast);
    // setTimeout(() => {
    //   toast.remove();
    // }, 3000);
  };
}
