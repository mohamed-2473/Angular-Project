import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { Prod } from '../types/Prod';

@Injectable({
  providedIn: 'root'
})


export class ServiceService {

  constructor(private http: HttpClient) { }

  private cart = new BehaviorSubject<Product[]>([])

  public cartItems = this.cart.asObservable();


  // Add to cart with quantity tracking
  addToCart(product: Product) {
    const currentItems = this.cart.getValue();
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex === -1) {
      
      this.cart.next([...currentItems, product]);
    } else {
      
      alert("This item is already in your cart");
    }
  }

  // Remove items with two modes
  removeFromCart(item: Product, removeAll: boolean = false) {
    const currentItems = this.cart.getValue();
    
    if (removeAll) {
      
      this.removeAllQuantities(item, currentItems);
    } else {
      
      this.removeOneQuantity(item, currentItems);
    }
  }

  private removeAllQuantities(item: Product, currentItems: Product[]) {
    const updatedCart = currentItems.filter(
      cartItem => cartItem.id !== item.id
    );
    this.cart.next(updatedCart);
  }

  private removeOneQuantity(item: Product, currentItems: Product[]) {
    const itemIndex = currentItems.findIndex(
      cartItem => cartItem.id === item.id
    );

    if (itemIndex !== -1) {
      const updatedCart = [...currentItems];
      updatedCart.splice(itemIndex, 1);
      this.cart.next(updatedCart);
    }
  }

  // Get current cart items (synchronous)
  getCurrentCart(): Product[] {
    return this.cart.getValue();
  }


  getAllItems(): Observable<Prod> {
    return this.http.get<Prod>('https://dummyjson.com/products')
  }


  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/${id}`)
  }
}
