import { SearchPipe } from './../../Shared/Pipes/search/search.pipe';
import { CartService } from './../../Core/Services/Cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IAllProducts } from '../../Shared/Interfaces/iall-products';
import { ProductsService } from './../../Core/Services/products/products.service';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SplitPipe } from '../../Shared/Pipes/split.pipe';
import { NgxPaginationModule ,PaginatePipe } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { WishListService } from '../../Core/Services/WishList/wish-list.service';
  import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-products',
  imports: [ CurrencyPipe , SplitPipe , NgxPaginationModule , RouterLink ,SearchPipe, FormsModule,],
  templateUrl: './products.component.html',

  styleUrl: './products.component.scss'
})
export class ProductsComponent {
 
  private readonly _ProductsService = inject(ProductsService);
  private readonly CartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
    private readonly wishList = inject(WishListService);
  AllProducts:WritableSignal<IAllProducts[]> = signal([]);
  Page:number=1
  text:string = '';

  subGetData:Subscription = new Subscription()
  subGetCart:Subscription = new Subscription()


  ngOnInit(): void {
      this.getData()
  }



  getData(){
  this.subGetData=  this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.AllProducts.set(res.data)
      }
    })
  }
  changePage(event: number) {
    this.Page = event;
    scrollTo({ top: 0, behavior: 'smooth' }); 
  }
  getCart(id: string): void {
 this.subGetCart=   this.CartService.postToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastr.success(
            'Product added successfully to your cart',
            'Fresh Cart'
          );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  postWish(id:string):void{
    this.wishList.postWishData(id).subscribe({
      next:(res)=>{
        console.log(res)
        if (res.status === 'success') {
          this.toastr.success(
            "Product added successfully to your wishlist",
            'Fresh Cart'
          );
          this.wishList.wishNum.set(res.data.length)
        }
      }
    })
  }

  ngOnDestroy(): void {
      this.subGetData.unsubscribe()
      this.subGetCart.unsubscribe()
  }

}
