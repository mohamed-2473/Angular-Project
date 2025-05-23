import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ServiceService } from '../../services/service.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-home',
  imports: [ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products?:Product[]
  constructor(private productService: ServiceService) { }


 ngOnInit(){
 this.productService.getAllItems().subscribe((data)=>{
  this.products=data.products;
 })
 }

}
