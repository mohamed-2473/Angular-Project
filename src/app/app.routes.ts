import { Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { CartComponent } from '../../components/cart/cart.component';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { SingleProductComponent } from '../../components/single-product/single-product.component';
import { ProductComponent } from '../../components/product/product.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Home Page' },
    { path: 'register', component: RegisterComponent, title: 'register Page' },
    { path: 'login', component: LoginComponent, title: 'login Page' },
    { path: 'cart', component: CartComponent, title: 'cart Page' },
    { path: 'single-product/:id', component: SingleProductComponent },
    { path: 'home', component: ProductComponent, title: 'Products Page' },  // <-- هنا أضفت المسار

    {path:'',redirectTo:'/home',pathMatch:'full'},
    { path: '**', component: NotFoundComponent, title: 'not found ⚠ ' },
];
