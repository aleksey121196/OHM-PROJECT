import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  imports: [CommonModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit{

  orders: any[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getOrders().subscribe({
      next: (data) => (this.orders = data),
      error: () => alert('Failed to load orders'),
    });
  }

  updateStatus(orderId: string, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value;

    this.ordersService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        alert('Status updated');
        this.loadOrders();
      },
      error: () => alert('Failed to update status in list component'),
    });
  }
}

