import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishListService } from '../../Core/Services/WishList/wish-list.service';
import { IWishList } from '../../Shared/Interfaces/iwish-list';
import { SplitPipe } from '../../Shared/Pipes/split.pipe';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../Core/Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  imports: [SplitPipe, CurrencyPipe, TranslatePipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit,OnDestroy {
  private readonly wishList = inject(WishListService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  subGet:Subscription = new Subscription()
  subcart:Subscription = new Subscription()
  subdel:Subscription = new Subscription()



  wish: IWishList[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
 this.subGet =  this.wishList.getWishData().subscribe({
      next: (res) => {
        console.log(res);
        this.wish = res.data;
        this.wishList.wishNum.next(res.data.length)
      },
    });
  }
  getCart(id: string): void {
 this.subcart=   this.cartService.postToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastr.success(
            'Product added successfully to your cart',
            'Fresh Cart'
          );
          this.cartService.cartCount.next(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteItem(id: string) {
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
 this.subdel =      this.wishList.deleteWishData(id).subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            this.wish=res.data;
            this.wishList.wishNum.next(res.data.length)

          },
        });
      }
    });
  }

  ngOnDestroy(): void {
      this.subGet.unsubscribe();
      this.subcart.unsubscribe();
      this.subdel.unsubscribe()
  }

}
