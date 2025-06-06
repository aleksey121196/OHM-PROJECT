import { Component,OnInit } from '@angular/core';
import { FoodOrderService } from '../../../services/food-order.service';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-oredr',
  imports: [CommonModule, FormsModule],
  templateUrl: './meal-oredr.component.html',
  styleUrl: './meal-oredr.component.css'
})
export class MealOredrComponent implements OnInit {

  MainCourse: String = '';
  Fish: String = '';
  Vegeterian: String = '';
  ToppingOne: String = '';
  ToppingTwo: String = '';
  Salad: String = '';
  Drink: String = '';

  constructor(private foodOrderService: FoodOrderService, private employeeService: EmployeeService) { }

  ngOnInit(): void {

  }

  submitFoodOrder(): void {
    const user = this.employeeService.getUserFromToken();

    if (!user) {
      alert('User not authenticated');
      return;
    }

    const FoodOrderData = {
      EmployeeId: user.Id,
      FullName: user.FullName,
      MainCourse: this.MainCourse,
      Fish: this.Fish,
      Vegeterian: this.Vegeterian,
      ToppingOne: this.ToppingOne,
      ToppingTwo: this.ToppingTwo,
      Salad: this.Salad,
      Drink: this.Drink
    };

    this.foodOrderService.AddNewFoodOrder(FoodOrderData).subscribe({
      next: () => {
        alert('Your Meal Order has been submitted successfully! Bon Appetite!');
        this.clearForm();
      },
      error: () => {
        alert('Something wrong! Please try again.');
      }
    });

  }

  clearForm() {
    this.MainCourse = '';
    this.Fish = '';
    this.Vegeterian = '';
    this.ToppingOne = '';
    this.ToppingTwo = '';
    this.Salad = '';
    this.Drink = '';
  }

}
