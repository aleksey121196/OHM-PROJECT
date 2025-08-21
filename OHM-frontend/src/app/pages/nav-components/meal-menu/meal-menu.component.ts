import { Component, OnInit } from '@angular/core';
import { MealMenuService } from '../../../services/meal-menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Menu {
  mainCourses: string[];
  fishes: string[];
  vegeterians: string[];
  toppings: string[];
  salads: string[];
  drinks: string[];
}
@Component({
  selector: 'app-meal-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meal-menu.component.html',
  styleUrl: './meal-menu.component.css'
})
export class MealMenuComponent implements OnInit {

  newMenu = {
    mainCourses: '',
    fishes: '',
    vegeterians: '',
    toppings: '',
    salads: '',
    drinks: '',
  };
  currentMenu: Menu | null = null;

  constructor(private mealMenuService: MealMenuService) { }

  ngOnInit() {
    this.loadCurrentMenu();
  }

  loadCurrentMenu() {
    this.mealMenuService.getMealMenu().subscribe(
      (menus: Menu[]) => {
        if (menus && menus.length > 0) {
          this.currentMenu = menus[menus.length - 1]; 
        }
      },
      (error) => {
        console.error('Error fetching menu:', error);
      }
    );
  }

  onSubmit() {

    const menuItems: Menu = {
      mainCourses: this.splitAndTrim(this.newMenu.mainCourses),
      fishes: this.splitAndTrim(this.newMenu.fishes),
      vegeterians: this.splitAndTrim(this.newMenu.vegeterians),
      toppings: this.splitAndTrim(this.newMenu.toppings),
      salads: this.splitAndTrim(this.newMenu.salads),
      drinks: this.splitAndTrim(this.newMenu.drinks),
    };

    this.mealMenuService.createMealMenu(menuItems).subscribe(
      (response: Menu) => {
        console.log('Meal Menu created successfully!', response);
        this.currentMenu = response;
        this.resetForm();
      },
      (error) => {
        console.error('Failed to create meal menu!', error);
        alert('Failed to create meal menu. Please try again.');
      }
    );

  }

  private splitAndTrim(input: string): string[] {
    return input.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  private resetForm() {

    this.newMenu = {
      mainCourses: '',
      fishes: '',
      vegeterians: '',
      toppings: '',
      salads: '',
      drinks: ''
    };

  }

}
