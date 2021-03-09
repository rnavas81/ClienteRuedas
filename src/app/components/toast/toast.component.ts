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
      data.class = this.getTypeClass(data.type);
      this.toasts.push(data);
      setTimeout(() => {
        this.toasts.shift();
      }, 3000);
    }
  };
  getTypeClass = (type=null) => {
    var classes = 'content rounded px-4 py-3 my-3';
    switch (type) {
      case 'info':
        classes+=' bg-info text-white';
        break;
      case 'success':
        classes+=' bg-success text-white';
        break;
      case 'warning':
        classes+=' bg-warning';
        break;
      case 'error':
        classes+=' bg-danger text-white';
        break;
      default:
        classes+=' bg-primary text-white';
        break;
    }
    return classes;
  }
}
