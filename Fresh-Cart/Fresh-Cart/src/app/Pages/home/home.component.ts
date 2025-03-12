import { FlowbiteService } from './../../Core/Services/flowbit/flowbite.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { Iproducts } from '../../Shared/Interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { Icategories } from '../../Shared/Interfaces/icategories';
import { CategoriesService } from '../../Core/Services/categories/categories.service';
import { ProductsService } from '../../Core/Services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { SplitPipe } from '../../Shared/Pipes/split.pipe';
import { SearchPipe } from '../../Shared/Pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../Core/Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { WishListService } from '../../Core/Services/WishList/wish-list.service';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    CurrencyPipe,
    SplitPipe,
    SearchPipe,
    FormsModule,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private flowbiteService = inject(FlowbiteService);
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly wishList=inject(WishListService)
  products: Iproducts[] = [];
  categories: Icategories[] = [];
  text: string = '';
  subData: Subscription = new Subscription();
  subcat: Subscription = new Subscription();
  subcart: Subscription = new Subscription();


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    this.GetAllData();
    this.GetAllCat();

  }
  GetAllData(): void {
    this.subData = this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
  GetAllCat(): void {
    this.subcat = this.categoriesService.getCategoryData().subscribe({
      next: (res) => {
        this.categories = res.data;

      },

      error: (err) => {
        console.log(err);
      },
    });
  }
  getCart(id: string): void {
  this.subcart=  this.cartService.postToCart(id).subscribe({
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
  postWish(id:string):void{
    this.wishList.postWishData(id).subscribe({
      next:(res)=>{
        console.log(res)
        if (res.status === 'success') {
          this.toastr.success(
            "Product added successfully to your wishlist",
            'Fresh Cart'
          );
          this.wishList.wishNum.next(res.data.length)
        }
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    rtl:true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayHoverPause: true,
    items: 1,
    nav: false,
  };

  ngOnDestroy(): void {
    this.subData.unsubscribe();
    this.subcat.unsubscribe();
    this.subcart.unsubscribe()
  }
}
