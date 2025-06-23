import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealOrderListService } from '../../../meal-order-list.service';
import { FoodOrder } from '../../../models/food-order.model';

@Component({
  selector: 'app-meal-order-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './meal-order-list.component.html',
  styleUrl: './meal-order-list.component.css'
})
export class MealOrderListComponent implements OnInit {

  mealOrders: FoodOrder[] = [];
  selectedDate: string = new Date().toISOString().split('T')[0];

  constructor(private mealOrderListService: MealOrderListService) {}

  ngOnInit() {
      this.loadOrders();
  }

  loadOrders() {
    this.mealOrderListService.getMealOrder(this.selectedDate).subscribe(
      (orders) => {
        console.log('Fetched meal orders:', orders);
        this.mealOrders = orders;
      },
      (error) => {
        console.error('Error fetching meal orders', error);
      }
    );
  }

  downloadPdf() {
    //implement functionality
    console.log('Dowloading PDF...')
  }
}
