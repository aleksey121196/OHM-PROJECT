import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodOrderService } from '../../../services/food-order.service';
import { EmployeeService } from '../../../services/employee.service';
import { MealMenuService } from '../../../meal-menu.service';
import { MealMenu } from '../../../models/meal-menu.model';

interface Recommendations {
  mainCourse?: string;
  vegeterian?: string;
  fish?: string;
  toppingOne?: string;
  toppingTwo?: string;
  salad?: string;
  drink?: string;
}

interface Menu {
  mainCourses: string[];
  fishes: string[];
  vegeterians: string[];
  toppings: string[];
  salads: string[];
  drinks: string[];
}

@Component({
  selector: 'app-meal-oredr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meal-oredr.component.html',
  styleUrl: './meal-oredr.component.css'
})
export class MealOredrComponent implements OnInit {

  newOrder = {
    MainCourse: '',
    Fish: '',
    Vegeterian: '',
    ToppingOne: '',
    ToppingTwo: '',
    Salad: '',
    Drink: ''
  }

  recommendations: Recommendations[] = [];
  currentMenu: Menu | null = null;
  isLoading: boolean = true;
  orderHistory: any[] = [];

  constructor(
    private foodOrderService: FoodOrderService,
    private employeeService: EmployeeService,
    private mealMenuService: MealMenuService
  ) { }

  ngOnInit(): void {
    this.getUserOrderHistory();
    this.loadCurrentMenu();
  }

  getUserOrderHistory(): void {
    const user = this.employeeService.getUserFromToken();
    console.log('User:', user);

    if (user && user.Id) {
      console.log('Fetching user order history for user', user.Id);
      this.foodOrderService.getUserOrderHistory(user.Id).subscribe({
        next: (history) => {
          console.log('User order history:', history);
          this.orderHistory = history;
          this.generateRecomendations();
        },
        error: (error) => {
          console.error('Error loading user order history:', error);
        }
      });
    }
    else {
      console.error('No user logged in');
    }
  }

  loadCurrentMenu() {
    this.isLoading = true;
    console.log('Fetching current menu');
    this.mealMenuService.getMealMenu().subscribe(
      (menus: MealMenu[]) => {
        this.isLoading = false;
        console.log('Menus:', menus);
        if (menus && menus.length > 0) {
          this.currentMenu = menus[menus.length - 1];
          console.log('Current menu:', this.currentMenu);
        }
        else{
          console.error('No menu found');
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching menu: ', error);
      }
    )
  }

  generateRecomendations(): void {
    //Count of each main course
    const mainCourseCounts: { [key: string]: number } = {};
    const vegeterianCounts: { [key: string]: number } = {};
    const fishCounts: { [key: string]: number } = {};
    const toppingOneCounts: { [key: string]: number } = {};
    const toppingTwoCounts: { [key: string]: number } = {};
    const saladCounts: { [key: string]: number } = {};
    const drinkCounts: { [key: string]: number } = {};
    this.orderHistory.forEach(order => {
      this.incrementCount(mainCourseCounts, order.MainCourse);
      this.incrementCount(vegeterianCounts, order.Vegeterian);
      this.incrementCount(fishCounts, order.Fish);
      this.incrementCount(toppingOneCounts, order.ToppingOne);
      this.incrementCount(toppingTwoCounts, order.ToppingTwo);
      this.incrementCount(saladCounts, order.Salad);
      this.incrementCount(drinkCounts, order.Drink);
    });

    const topMainCourses = this.getTopItems(mainCourseCounts, 3);
    const topVegeterian = this.getTopItems(vegeterianCounts, 3);
    const topFish = this.getTopItems(fishCounts, 3);
    const topToppingOne = this.getTopItems(toppingOneCounts, 3);
    const topToppingTwo = this.getTopItems(toppingTwoCounts, 3);
    const topSalad = this.getTopItems(saladCounts, 3);
    const topDrink = this.getTopItems(drinkCounts, 3);

    this.recommendations = [
      this.createRecomendation(topMainCourses[0], topToppingOne[0], topToppingTwo[0], topDrink[0]),
      this.createRecomendation(undefined, topVegeterian[0], topToppingOne[0], topToppingTwo[0], topDrink[0]),
      this.createRecomendation(undefined, undefined, topFish[0], topToppingOne[0], topToppingTwo[0], topDrink[0]),
      this.createRecomendation(undefined, undefined, undefined, undefined, undefined, topSalad[0], topDrink[0]),
    ];

    /*while (this.recommendations.length < 3) {
      const defaultOptions = [
        'Grilled Chicken Breast',
        'Grilled Kebabs'
      ];
      for (const option of defaultOptions) {
        if (!this.recommendations.includes(option)) {
          this.recommendations.push(option);
          if (this.recommendations.length === 3) break;
        }
      }
    }
    console.log('Recomendations:', this.recommendations);
    */
  }

  private getTopItems(counts: { [key: string]: number }, num: number): string[] {
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, num)
      .map(entry => entry[0]);
  }

  private incrementCount(counts: { [key: string]: number }, item: string): void {
    if (item) {
      counts[item] = (counts[item] || 0) + 1;
    }
  }

  private createRecomendation(
    mainCourse?: string,
    vegeterian?: string,
    fish?: string,
    toppingOne?: string,
    toppingTwo?: string,
    salad?: string,
    drink?: string,
  ): Recommendations {
    return {
      mainCourse,
      vegeterian,
      fish,
      toppingOne,
      toppingTwo,
      salad,
      drink
    };
  }

  applyRecomendation(recommendation: Recommendations): void {
    this.newOrder.MainCourse = recommendation.mainCourse || '';
    this.newOrder.Vegeterian = recommendation.vegeterian || '';
    this.newOrder.Fish = recommendation.fish || '';
    this.newOrder.ToppingOne = recommendation.toppingOne || '';
    this.newOrder.ToppingTwo = recommendation.toppingTwo || '';
    this.newOrder.Salad = recommendation.salad || '';
    this.newOrder.Drink = recommendation.drink || '';
    //console.log('Main Course:', this.MainCourse);
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
      MainCourse: this.newOrder.MainCourse,
      Fish: this.newOrder.Fish,
      Vegeterian: this.newOrder.Vegeterian,
      ToppingOne: this.newOrder.ToppingOne,
      ToppingTwo: this.newOrder.ToppingTwo,
      Salad: this.newOrder.Salad,
      Drink: this.newOrder.Drink,
    };

    this.foodOrderService.AddNewFoodOrder(FoodOrderData).subscribe({
      next: () => {
        alert('Your Meal Order has been submitted successfully! Bon Appetite!');
        this.clearForm();
      },
      error: (error) => {
        console.error('Error submitting food order', error);
        alert('Something wrong! Please try again.');
      }
    });

  }

  clearForm() {

    this.newOrder = {
      MainCourse: '',
      Fish: '',
      Vegeterian: '',
      ToppingOne: '',
      ToppingTwo: '',
      Salad: '',
      Drink: ''
    }

  }

}
