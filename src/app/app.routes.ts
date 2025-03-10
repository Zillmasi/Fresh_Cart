import { DetailsComponent } from './Pages/details/details.component';
import { Routes } from '@angular/router';
import { AuthLayoutsComponent } from './Layouts/auth-layouts/auth-layouts.component';
import { BlankLayoutsComponent } from './Layouts/blank-layouts/blank-layouts.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { authGuard } from './Core/Guards/Auth/auth.guard';
import { loggedInGuard } from './Core/Guards/LoggedIn/logged-in.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutsComponent,
    canActivate:[loggedInGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./Pages/login/login.component').then((c) => c.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./Pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./Pages/forget-pass/forget-pass.component').then(
            (c) => c.ForgetPassComponent
          ),
        title: 'ForgetPassword',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutsComponent,
    canActivate:[authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./Pages/home/home.component').then((c) => c.HomeComponent),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./Pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./Pages/wish-list/wish-list.component').then((c) => c.WishListComponent),
        title: 'WishList',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./Pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./Pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./Pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./Pages/check-out/check-out.component').then(
            (c) => c.CheckOutComponent
          ),
        title: 'Check Out',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./Pages/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'details',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./Pages/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'allorders',
      },
      {
        path: 'categoriesDetails/:id',
        loadComponent: () =>
          import('./Pages/cat-details/cat-details.component').then(
            (c) => c.CatDetailsComponent
          ),
        title: 'Categories Details',
      },
      {
        path: 'brandsDetails/:id',
        loadComponent: () =>
          import('./Pages/brands-details/brands-details.component').then(
            (c) => c.BrandsDetailsComponent
          ),
        title: 'Categories Details',
      },
      { path: '**', component: NotFoundComponent, title: 'Page Not Found' },
    ],
  },
];
