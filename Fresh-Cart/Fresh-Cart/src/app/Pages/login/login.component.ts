import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../Core/Services/Auth/auth.service';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink , TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent  {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoding: boolean = false;
  isSucsses: string = '';
  isError: string = '';
  toggle: boolean = true;
  subPostLogin: Subscription = new Subscription();

  loginForms: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
    ]),
  });

  submit(): void {
    if (this.loginForms.valid) {
      this.isLoding = true;
   this.subPostLogin=   this.authService.postLoginData(this.loginForms.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.isSucsses = res.message;
            setTimeout(() => {
              localStorage.setItem('token', res.token);
              this.authService.tokenInfo();
              this.router.navigate(['/home']);
            }, 700);
          }
          this.isLoding = false;
        },

        error: (err: HttpErrorResponse) => {
          this.isLoding = false;
          this.isError = err.error.message;
        },
      });
    } else {
      this.loginForms.markAllAsTouched();
    }
  }

  togglePass() {
    this.toggle = !this.toggle;
  }
  ngOnDestroy(): void {
this.subPostLogin.unsubscribe()
  }
}
