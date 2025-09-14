import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-orders-managment',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-managment.component.html',
  styleUrl: './orders-managment.component.css'
})
export class OrdersManagmentComponent {
  todayString = new Date().toISOString().split('T')[0];
  
  order = {
    ClientFullName: '',
    ClientEmail: '',
    ClientPhone: '',
    MeetingDate: '',
    OrderDetails: '',
  };

  constructor(private ordersService: OrdersService) { }

  submitOrder(): void {
    this.ordersService.addOrder(this.order).subscribe({
      next: () => {
        alert('Order added successfully');
        this.order = {
          ClientFullName: '',
          ClientEmail: '',
          ClientPhone: '',
          MeetingDate: '',
          OrderDetails: '',
        };
      },
      error: () => alert('Failed to add order'),
    });
  }
}