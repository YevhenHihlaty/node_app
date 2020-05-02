import {AuthService} from "../../shared/services/auth.service";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Registration complete. Now you can sign in. ');
      } else if (params['accessDenied']) {
        MaterialService.toast('Please sign up. ');
      } else if (params['sessionExpired']){
        MaterialService.toast('Please sign in again. Your session expired');
      }
    })
  }

  onSubmit() {
    // this.authService.login({
    //   email: this.form.value.email,
    //   password: this.form.value.password
    // })
    this.form.disable()
    this.subscription = this.authService.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message);
        console.warn(error)
        this.form.enable()
      })


  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
