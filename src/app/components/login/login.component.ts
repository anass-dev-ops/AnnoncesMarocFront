import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user; token; error;

  constructor(private auth: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: Router) { }

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.auth.login(this.user.value).subscribe(data => {
      this.token = data.headers.get('Authorization');
      this.auth.saveToken(this.token);
      this.route.navigateByUrl('/');
    }, error => {
      this.error = error;
      console.log(error);
    });
  }
}
