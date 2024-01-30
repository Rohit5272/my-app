import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data:any = []
  
  ngOnInit() {
    this.getData()
  }

  getData() {
    let user = sessionStorage.getItem('user')
    let userData = user && JSON.parse(user)
    console.log(userData)
    this.data = userData
  }

}
