import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*
  * Object of user logged
  */
  user: User
  
  constructor(
   private loginService: LoginService,
   private router: Router
  ) {
    this.checkLogin()
  }

  checkLogin(): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user);
      this.router.navigateByUrl('home');
    }
  }
  
  ngOnInit(): void {
    this.loginService.initGoogleAuth();
    this.user = this.loginService.mapUser()
  }

  login() : void {
    this.loginService.doLogin().subscribe(result => {
       localStorage.setItem('user', JSON.stringify(result));
       this.router.navigateByUrl('home');
    });
  }
}
