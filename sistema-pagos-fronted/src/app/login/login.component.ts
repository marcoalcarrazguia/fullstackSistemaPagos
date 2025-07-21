import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public LoginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private AuthService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
       username: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    });
  }
  login() {
    let username = this.LoginForm. value.username;
    let password = this.LoginForm.value.password; 
    let auth:boolean = this.AuthService.login(username, password);
    if (auth === true) {
      this.router.navigateByUrl("/admin");
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
