
import { OrdersService } from './../../Core/Services/Orders/orders.service';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/Services/Auth/auth.service';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly ordersService=inject(OrdersService)
  private readonly authService=inject(AuthService)
  UserId:string = this.authService.UsertokenInfo.id


  ngOnInit(): void {
      this.ordersService.getUserOrders(this.UserId).subscribe({
        next:(res)=>{
          console.log(res)
      },

      error:(err)=>{
        console.log(err)
      }
      }
    )
  }
}
