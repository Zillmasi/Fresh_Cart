import { IspecificCat } from './../../Shared/Interfaces/ispecific-cat';
import { Component, inject, Pipe, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../Core/Services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Iproducts } from '../../Shared/Interfaces/iproducts';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../Core/Services/Cart/cart.service';
import { Subscription } from 'rxjs';
import { ICartProducts } from '../../Shared/Interfaces/icart-products';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../Core/Services/categories/categories.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit,OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  productId!: string | null;
  productsDetails: Iproducts | null = null;
  products: Iproducts[] = [];
  cartDetails: ICartProducts = {} as ICartProducts;
  subRouter:Subscription = new Subscription()
  subGetID:Subscription = new Subscription()
  subCart:Subscription = new Subscription()


  ngOnInit(): void {
    this.getId();
  }

  getId() {
this.subRouter=  this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        this.productId = p.get('id');
 this.subGetID=   this.productsService.getSpecificProd(this.productId).subscribe({
          next: (res) => {
            this.productsDetails = res.data;
          },
        });
      },
    });
  }



  getCart(id: string): void {
 this.subCart=   this.cartService.postToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastr.success(
            'Product added successfully to your cart',
            'Fresh Cart'
          );
          this.cartService.cartCount.next(res.numOfCartItems)

        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  ngOnDestroy(): void {
      this.subRouter.unsubscribe()
      this.subGetID.unsubscribe()
      this.subCart.unsubscribe()
  }
}
