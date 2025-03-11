import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Core/Services/Auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss',
})
export class ForgetPassComponent implements OnInit, OnDestroy {
  isLoding: boolean = false;
  step: number = 1;
  isSuccess: string = '';
  isError: string = '';
  private readonly authService = inject(AuthService);
  private readonly formBulider = inject(FormBuilder);
  private readonly router = inject(Router);
  subForget: Subscription = new Subscription();
  subReset: Subscription = new Subscription();
  subPut: Subscription = new Subscription();

  ngOnInit(): void {
    this.postForgetPass();
    this.postResetcode();
    this.PutNewPass();
  }

  forgetPassForm: FormGroup = this.formBulider.group({
    email: [null, [Validators.required, Validators.email]],
  });

  ResetCodeForm: FormGroup = this.formBulider.group({
    code: [null, [Validators.required, Validators.pattern(/^\w{5,6}$/)]],
  });
  ResetPassForm: FormGroup = this.formBulider.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)],
    ],
  });

  postForgetPass(): void {
    if (this.forgetPassForm.valid) {
      this.isLoding = true;
      this.subForget = this.authService
        .PassForget(this.forgetPassForm.value)
        .subscribe({
          next: (res) => {
            if (res.statusMsg === 'success') {
              this.isSuccess = res.message;
              this.step = 2;
            }
            this.isLoding = false;
          },

          error: (err) => {
            console.log(err);
            this.isLoding = false;
            this.isError = err.error.message;
          },
        });
    }
  }

  postResetcode(): void {
    if (this.ResetCodeForm.valid) {
      this.isLoding = true;
      this.subReset = this.authService
        .resetCode(this.ResetCodeForm.value)
        .subscribe({
          next:(res)=>{
            if (res.status === 'Success') {
              this.isSuccess = res.message;
              this.step = 3;
            }
            this.isLoding = false;
          },

          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.isLoding = false;

            this.isError = err.error.message;
          },
        });
    }
  }

  PutNewPass(): void {
    if (this.ResetPassForm.valid) {
      this.isLoding = true;
      this.subPut = this.authService
        .newPass(this.ResetPassForm.value)
        .subscribe({
          next: (res) => {
            this.isSuccess = res.message;
            localStorage.setItem('token', res.token);
            this.authService.tokenInfo();
            this.router.navigate(['/home']);
            this.isLoding = false;
          },
          error: (errr: HttpErrorResponse) => {
            this.isError = errr.error.message;
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.subForget.unsubscribe();
    this.subReset.unsubscribe();
    this.subPut.unsubscribe();
  }
}
