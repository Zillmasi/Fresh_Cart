import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../Core/Services/Auth/auth.service';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements  OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoding: boolean = false;
  isSucsses: string = '';
  isError: string = '';
  togglePasss: boolean = true;
  toggleRePasss: boolean = true;
  subPostreg: Subscription = new Subscription();

  registerForms: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.rePassConf }
  );

  submit(): void {
    console.log(this.registerForms);
    if (this.registerForms.valid) {
      this.isLoding = true;
      this.subPostreg = this.authService
        .postRegisterData(this.registerForms.value)
        .subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.isSucsses = res.message;
              setTimeout(() => {
                this.router.navigate(['/login']);
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
      this.registerForms.markAllAsTouched();
    }
  }

  rePassConf(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }
  togglePass() {
    this.togglePasss = !this.togglePasss;
  }
  toggleRePass() {
    this.toggleRePasss = !this.toggleRePasss;
  }

  ngOnDestroy(): void {
    this.subPostreg.unsubscribe();
  }
}
