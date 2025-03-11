import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../Core/Services/Brands/brands.service';
import { Subscription } from 'rxjs';
import { IspecificDataBrands } from '../../Shared/Interfaces/ispecific-data-brands';

@Component({
  selector: 'app-brands-details',
  imports: [],
  templateUrl: './brands-details.component.html',
  styleUrl: './brands-details.component.scss',
})
export class BrandsDetailsComponent implements OnInit,OnDestroy {
  private readonly brandsService = inject(BrandsService);
  private readonly ActivatedRoute = inject(ActivatedRoute);
  brandId!: string | null;
  subData: Subscription = new Subscription();
  subRouter: Subscription = new Subscription();
brandsDetials: IspecificDataBrands | null = null;

ngOnInit(): void {
    this.getId()
}

  getId() {
    this.subRouter = this.ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.brandId = p.get('id');
        this.subData = this.brandsService
          .getSpecificData(this.brandId)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.brandsDetials = res.data;
            },
          });
      },
    });
  }

  ngOnDestroy(): void {
    this.subRouter.unsubscribe()
    this.subData.unsubscribe()
    
  }
}
