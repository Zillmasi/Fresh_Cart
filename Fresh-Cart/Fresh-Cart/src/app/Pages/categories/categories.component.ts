import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../Core/Services/categories/categories.service';
import { Icategories } from '../../Shared/Interfaces/icategories';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy {
 private readonly categoriesService = inject(CategoriesService);
  categories: Icategories[] = [];
  subData:Subscription = new Subscription()


 ngOnInit(): void {
  this.getAllData()
 }

 getAllData():void{
  this.categoriesService.getCategoryData().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.categories = res.data
    }
  })
 }

 ngOnDestroy(): void {
     this.subData.unsubscribe()
 }
}
