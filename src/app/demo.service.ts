import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private _http: HttpClient, private _router: Router) { }

  postData(data: any) {
    // console.log(user);
    this._http.post("http://localhost:3000/profile", data, { observe: 'response' })
      .subscribe((res) => {
        console.log(res);
        if (res) {
          sessionStorage.setItem('user', JSON.stringify(res.body));
          this._router.navigate(['/profile']);
        }
      })
  }
}
