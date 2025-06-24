import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.css'
})
export class OrderConfirmComponent {

  orderNumber: string = '';
  estimatedDelivery: string = '';
  totalAmount: number = 0;

  constructor(
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Generate a random order number
    this.orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    
    // Calculate delivery date (3 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    this.estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Get total amount from cart service
    this.totalAmount = this.serviceService.getTotalPrice();
    
    // Clear the cart after order confirmation
    this.serviceService.clearCart();
  }

  continueShopping() {
    this.router.navigate(['/']);
  }

}
