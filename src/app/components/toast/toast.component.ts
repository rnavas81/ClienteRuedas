import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() toasts:any[];
  private _toast:any;
  @Input()
  set toast(val:any) {
    this.add(val);
    this._toast=null;
  }
  get toast():any{
    return this._toast;
  }
  constructor() {
  }

  ngOnInit(): void {
    this.toasts=[];
  }
  /**
   * Agrega un elemento a la lista
   * @param data
   */
  add = (data: any) => {
    if(data!==undefined){
      if (!data.hasOwnProperty('text')) data.text = 'Text dummy';
      data.class = 'content rounded px-4 py-3 my-3';
      switch (data.type) {
        case 'info':
          data.class+=' bg-info text-white';
          break;
        case 'success':
          data.class+=' bg-success text-white';
          break;
        case 'warning':
          data.class+=' bg-warning';
          break;
        case 'error':
          data.class+=' bg-danger text-white';
          break;
        default:
          data.class+=' bg-primary text-white';
          break;
      }
      this.toasts.push(data);
      setTimeout(() => {
        this.toasts.shift();
      }, 3000);
    }
  };
}
