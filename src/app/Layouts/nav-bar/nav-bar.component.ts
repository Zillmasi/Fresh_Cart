import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, computed, inject, input, Signal } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../Core/Services/Auth/auth.service';
import { CartService } from '../../Core/Services/Cart/cart.service';
import { WishListService } from '../../Core/Services/WishList/wish-list.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive , ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {

  private readonly  authservice = inject(AuthService);
  private readonly cartService = inject(CartService)
  private readonly translateService = inject(TranslateService)
  private readonly wishListService = inject(WishListService)
  isLogin = input<boolean>(true);
  count:Signal<number>= computed(()=> this.cartService.cartCount())
  wishCount:Signal<number>= computed(()=> this.wishListService.wishNum())
  
  ngOnInit(): void {

    this.getNumCart()
    this.getNumWish()

    
  }


getNumWish(){
  this.wishListService.getWishData().subscribe({
    next:(res)=>{
      this.wishListService.wishNum.set(res.count)
    }
 } )
  }


  getNumCart(){
    this.cartService.getDataCart().subscribe({
      next:(res)=>{
    this.cartService.cartCount.set(res.numOfCartItems)
      }
    })
  }


  logOut(){
this.authservice.LogOut();

  }




}
