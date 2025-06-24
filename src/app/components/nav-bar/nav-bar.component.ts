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
  
  // cartItemList: Product[] = [];
  // wishItemList: Product[] = [];
  // constructor(private productService:ServiceService){}

  // ngOnInit() {
  //   this.productService.cartItems$.subscribe((data) => {
  //     this.cartItemList = data;
  //   });

  //   this.productService.wishlistItems$.subscribe((wish) => {
  //     this.wishItemList = wish;
  //   });
  // }




  cartCount = 0;
  wishlistCount = 0;

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.service.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });

    this.service.wishlistItems$.subscribe(items => {
      this.wishlistCount = items.length;
    });
  }

}