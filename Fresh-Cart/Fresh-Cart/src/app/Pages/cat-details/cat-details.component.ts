import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../Core/Services/categories/categories.service';
import { IspecificCat } from '../../Shared/Interfaces/ispecific-cat';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cat-details',
  imports: [],
  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.scss'
})
export class CatDetailsComponent implements OnInit,OnDestroy {
  private readonly categoriesService = inject(CategoriesService);
    private readonly activatedRoute = inject(ActivatedRoute);
  catId!: string | null;
  categoriesDetails:IspecificCat| null=null;
  subData:Subscription = new Subscription()
  subRouter:Subscription = new Subscription()



  ngOnInit(): void {
      this.getId()
  }

  getId(){
this.subRouter=    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.catId = p.get('id');
 this.subData  =     this.categoriesService.getSpecificCategory(this.catId).subscribe({
          next: (res) => {
            console.log(res);
            this.categoriesDetails = res.data;
          },
        });
      }
    })
  }
  
  ngOnDestroy(): void {
      this.subData.unsubscribe()
      this.subRouter.unsubscribe()
  }
  
}
