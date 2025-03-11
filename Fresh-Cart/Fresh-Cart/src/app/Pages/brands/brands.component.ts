import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../Core/Services/Brands/brands.service';
import { Ibrands } from '../../Shared/Interfaces/ibrands';
import { NgxPaginationModule ,PaginatePipe } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule , RouterLink , TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {
private readonly brandsService = inject(BrandsService);
Page:number=1
brands:Ibrands[]= []
subData:Subscription = new Subscription()

ngOnInit(): void {
 this.getAllData()

}

getAllData():void{
this.subData=  this.brandsService.getAllData().subscribe({
    next:(res)=>{
      console.log(res)
      this.brands = res.data
    }
  })
}

changePage(event: number) {
  this.Page = event;
  scrollTo({ top: 0, behavior: 'smooth' }); 
}

ngOnDestroy(): void {
  this.subData.unsubscribe()  
}
}
