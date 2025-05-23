import { Component, HostListener } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  
  cartItemList: Product[] = [];
  
  counter=this.cartItemList?.length;
  constructor(private productService:ServiceService){}


  ngOnInit(){
  this.productService.cartItems.subscribe((data)=>{
    this.cartItemList=data
  })
}

}