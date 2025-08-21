import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealOrderListService } from '../../../services/meal-order-list.service';
@Component({
  selector: 'app-meal-order-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './meal-order-list.component.html',
  styleUrl: './meal-order-list.component.css'
})
export class MealOrderListComponent implements OnInit {

  mealOrders: any[] = [];

  selectedDate: string = new Date().toISOString().split('T')[0];

  constructor(private mealOrderListService: MealOrderListService) {}

  ngOnInit() {
      this.allOrders();
  }

  allOrders(): void{
    this.mealOrderListService.getMealOrder(this.selectedDate).subscribe({
      next: (data) => (this.mealOrders = data),
      error: () => alert('Error fetching meal orders'),
    });
  }

  downloadPdf() {
    console.log('Dowloading PDF...')
  }
}
