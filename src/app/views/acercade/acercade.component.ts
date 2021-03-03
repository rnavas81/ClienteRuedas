import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.scss']
})
export class AcercadeComponent implements OnInit {
  name: string;
  version: string;
  angular: string;
  data: any;

  previousUrl: string = null;
  currentUrl: string = null;

  constructor(private _location: Location) {
    this.name = environment.APP_NAME;
    this.version = environment.APP_VERSION;
    this.angular = environment.ANGULAR_VERSION;
    this.data = [
      {
        nombre:"Rodrigo Navas",
        linkedin:"https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile",
        github:"https://github.com/rnavas81",
        imagen:"https://avatars.githubusercontent.com/u/61503016?s=64&v=4",
        email:"rodrigo.navas.arriaga@gmail.com",
      },
      {
        nombre:"Alejandro Martín",
        linkedin:"https://www.linkedin.com/in/alejandro-m-9aa30b137/",
        github:"https://github.com/djmarpe",
        imagen:"https://avatars.githubusercontent.com/u/71335535?s=64&v=4",
        email:"rodrigo.navas.arriaga@gmail.com",
      },
      {
        nombre:"Jorge Olmo",
        linkedin:"https://www.linkedin.com/in/iamunder/",
        github:"https://github.com/IamUnder",
        imagen:"https://avatars.githubusercontent.com/u/71283328?s=64&v=4",
        email:"rodrigo.navas.arriaga@gmail.com",
      },
    ];
  }

  ngOnInit(): void {
  }
  /**
   * Vuelve a la página anterior
   */
  volver = () => {
    this._location.back();
  }
}
