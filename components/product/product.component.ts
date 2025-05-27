import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { Product } from '../../types/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  
  @Input() productItem!: Product;


  constructor(private productService: ServiceService) { }

    addToCartFromHome(item: Product) {
      this.productService.addToCart(item)
    }

    addToWishlist() {
      this.productService.addToWishlist(this.productItem);
    }


}
