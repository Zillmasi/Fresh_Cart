import { ElementsService } from './../../Core/Services/Elements/elements.service';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../Core/Services/Orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
})
export class CheckOutComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly ordersService = inject(OrdersService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly elementsService = inject(ElementsService);
  private readonly router = inject(Router);
  CartId: string = this.elementsService.CartID;
  payForm!: FormGroup;
  subOnline: Subscription = new Subscription();
  subCash: Subscription = new Subscription();
  

  ngOnInit(): void {
    this.InitForm();
  }

  InitForm() {
    this.payForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: [null, [Validators.required]],
    });
  }

  OnlinePay() {
    if (this.payForm.valid) {
      this.subOnline = this.ordersService
        .postPayOnline(this.payForm.value, this.CartId)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'success') {
              open(res.session.url, '_self');
            }
          },

          error: (err) => {
            console.log(err);
            if (err.status !== 'success') {
              open(err.session.cancel_url);
            }
          },
        });
    } else {
      this.payForm.markAllAsTouched();
    }
  }

  cashPay() {
    if (this.payForm.valid) {
      this.subCash = this.ordersService
        .postPayCash(this.payForm.value, this.CartId)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'success') {
              this.router.navigate(['allorders']);
            }
          },

          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.payForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subOnline.unsubscribe();
    this.subCash.unsubscribe();
  }
}
