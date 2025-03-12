import { ElementsService } from './../../Core/Services/Elements/elements.service';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CartService } from '../../Core/Services/Cart/cart.service';
import { ICartProducts } from '../../Shared/Interfaces/icart-products';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink , TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  cartDetails: ICartProducts = {} as ICartProducts;
  subData: Subscription = new Subscription();
  subDelete: Subscription = new Subscription();
  subUpdate: Subscription = new Subscription();
  subClear: Subscription = new Subscription();

  private readonly cartService = inject(CartService);
  private readonly elementsService = inject(ElementsService);

  ngOnInit(): void {
    this.getDataCart();
  }

  getDataCart() {
    this.subData = this.cartService.getDataCart().subscribe({
      next: (res) => {
        console.log(res.data);

        this.cartDetails = res.data;
      },


    });
  }

  setID(CartId: string) {
    this.elementsService.CartID = CartId;
    console.log(CartId);
  }

  deletItem(id: string): void {


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subDelete = this.cartService.deletCart(id).subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            this.cartDetails = res.data;
            this.cartService.cartCount.next(res.numOfCartItems)
          },
    
    
        });
      }
    });
  

  }

  UpdateCount(id: string, count: number) {
    this.subUpdate = this.cartService.updateCount(id, count).subscribe({
      next: (res) => {
        console.log(res.data);

        this.cartDetails = res.data;




      },


    });
  }

  clearCart() {
  
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subClear = this.cartService.clearCart().subscribe({
            next: (res) => {
              console.log(res);
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
              this.cartDetails = {} as ICartProducts;
              this.cartService.cartCount.next(0)
            },

          });
        }
      });
    
  }

  ngOnDestroy(): void {
    this.subData.unsubscribe();
    this.subDelete.unsubscribe();
    this.subUpdate.unsubscribe();
    this.subClear.unsubscribe();
  }
}
