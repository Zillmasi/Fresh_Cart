import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, inject, input } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../Core/Services/flowbit/flowbite.service';
import { AuthService } from '../../Core/Services/Auth/auth.service';
import { MyTranslateService } from '../../Core/Services/MyTranslate/my-translate.service';
import { CartService } from '../../Core/Services/Cart/cart.service';
import { WishListService } from '../../Core/Services/WishList/wish-list.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive , TranslatePipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(private FlowbiteService: FlowbiteService) {}
  private readonly  authservice = inject(AuthService);
  private readonly cartService = inject(CartService)
  private readonly myTranslateService = inject(MyTranslateService);
  private readonly translateService = inject(TranslateService)
  private readonly wishListService = inject(WishListService)
  isLogin = input<boolean>(true);
  count:number = 0;
  wishCount:number = 0
  
  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    this.getNumCart()
    this.getNumWish()
    this.cartService.cartCount.subscribe({
      next:(res)=>{
        this.count = res
      }
    })
    this.wishListService.wishNum.subscribe({
      next:(res)=>{
        this.wishCount =res
      }
    })
    
  }


getNumWish(){
  this.wishListService.getWishData().subscribe({
    next:(res)=>{
      this.wishCount = res.count
    }
 } )
  }


  getNumCart(){
    this.cartService.getDataCart().subscribe({
      next:(res)=>{
        console.log(res)
        this.count = res.numOfCartItems
      }
    })
  }


  logOut(){
this.authservice.LogOut();

  }

  changeLang(lang:string){
     this.myTranslateService.changeLang(lang)
  }
  currentLang(lang:string):boolean{
  return  this.translateService.currentLang === lang
  }


}
