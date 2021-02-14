import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public static readonly SESSION_STORAGE_USER: string = 'CAR_SHARE_USER';
  public static readonly SESSION_STORAGE_KEY: string = 'CAR_SHARE_KEY';

  constructor(private http: HttpClient){ }

  upImg(data:any){
    var data =JSON.parse(sessionStorage.getItem("user"));
    var id = data['id'];
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const url = `${environment.url_api}usuario/img`;

    return this.http.post(url,data,{headers: headers});
  }
}
