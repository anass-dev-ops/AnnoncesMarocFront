import { Component, OnInit } from '@angular/core';
import {AdsService} from "../../services/ads.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: FormGroup; error;

  constructor(private auth: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: Router) { }

  ngOnInit(): void {
    this.newUser = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });
  }

  onRegister() {
    this.auth.register(this.newUser.value).subscribe(data => {
      console.log(data);
      this.route.navigateByUrl('/login');
    }, error => {
      this.error = error;
      console.log(error);
    });
  }

}
