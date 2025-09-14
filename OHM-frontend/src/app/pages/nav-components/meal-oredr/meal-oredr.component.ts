import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodOrderService } from '../../../services/food-order.service';
import { EmployeeService } from '../../../services/employee.service';
import { MealMenuService } from '../../../services/meal-menu.service';
import { MealMenu } from '../../../interfaces/meal-menu.interface';

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
  
  // Track if fields should be disabled based on selections
  fieldsDisabled = {
    MainCourse: false,
    Fish: false,
    Vegeterian: false,
    ToppingOne: false,
    ToppingTwo: false,
    Salad: false
  }

  recommendations: Recommendations[] = [];
  currentMenu: Menu | null = null;
  isLoading: boolean = true;
  orderHistory: any[] = [];
  
  // Track if user already has an order for today
  hasOrderForToday: boolean = false;
  todayOrder: any = null;

  constructor(
    private foodOrderService: FoodOrderService,
    private employeeService: EmployeeService,
    private mealMenuService: MealMenuService
  ) { }

  ngOnInit(): void {
    this.checkTodayOrder();
    this.getUserOrderHistory();
    this.loadCurrentMenu();
    this.updateDisabledFields();
  }
  
  checkTodayOrder(): void {
    const user = this.employeeService.getUserFromToken();
    
    if (user && user.Id) {
      this.foodOrderService.getUserTodayOrder(user.Id).subscribe({
        next: (response) => {
          this.hasOrderForToday = response.hasOrder;
          if (response.hasOrder) {
            this.todayOrder = response.order;
            console.log('User already has an order for today:', this.todayOrder);
          } else {
            console.log('User does not have an order for today');
          }
        },
        error: (error) => {
          console.error('Error checking today\'s order:', error);
        }
      });
    }
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
    // Reset all fields first
    this.newOrder = {
      MainCourse: '',
      Fish: '',
      Vegeterian: '',
      ToppingOne: '',
      ToppingTwo: '',
      Salad: '',
      Drink: ''
    };
    
    // Apply recommendation values one by one to trigger validation
    if (recommendation.mainCourse) {
      this.newOrder.MainCourse = recommendation.mainCourse;
      this.updateDisabledFields();
    }
    
    if (recommendation.fish && !this.fieldsDisabled.Fish) {
      this.newOrder.Fish = recommendation.fish;
      this.updateDisabledFields();
    }
    
    if (recommendation.vegeterian && !this.fieldsDisabled.Vegeterian) {
      this.newOrder.Vegeterian = recommendation.vegeterian;
      this.updateDisabledFields();
    }
    
    if (recommendation.salad && !this.fieldsDisabled.Salad) {
      this.newOrder.Salad = recommendation.salad;
      this.updateDisabledFields();
    }
    
    if (recommendation.toppingOne && !this.fieldsDisabled.ToppingOne) {
      this.newOrder.ToppingOne = recommendation.toppingOne;
    }
    
    if (recommendation.toppingTwo && !this.fieldsDisabled.ToppingTwo) {
      this.newOrder.ToppingTwo = recommendation.toppingTwo;
    }
    
    if (recommendation.drink) {
      this.newOrder.Drink = recommendation.drink;
    }
    
    // Final update of disabled fields
    this.updateDisabledFields();
  }

  submitFoodOrder(): void {
    const user = this.employeeService.getUserFromToken();

    if (!user) {
      alert('User not authenticated');
      return;
    }
    
    // Validate form based on all restrictions
    const hasMainCourse = this.newOrder.MainCourse !== '';
    const hasFish = this.newOrder.Fish !== '';
    const hasVegeterian = this.newOrder.Vegeterian !== '';
    const hasSalad = this.newOrder.Salad !== '';
    
    // Ensure at least one main option is selected
    if (!hasMainCourse && !hasFish && !hasVegeterian && !hasSalad) {
      alert('Please select at least one of: Main Course, Fish, Vegetarian, or Salad');
      return;
    }
    
    // Check for invalid combinations
    if (hasMainCourse && (hasFish || hasVegeterian || hasSalad)) {
      alert('Invalid selection: When Main Course is selected, you cannot select Fish, Vegetarian, or Salad options.');
      return;
    }
    
    if (hasFish && (hasMainCourse || hasVegeterian || hasSalad)) {
      alert('Invalid selection: When Fish is selected, you cannot select Main Course, Vegetarian, or Salad options.');
      return;
    }
    
    if (hasVegeterian && (hasMainCourse || hasFish || hasSalad)) {
      alert('Invalid selection: When Vegetarian is selected, you cannot select Main Course, Fish, or Salad options.');
      return;
    }
    
    if (hasSalad && (hasMainCourse || hasFish || hasVegeterian || this.newOrder.ToppingOne || this.newOrder.ToppingTwo)) {
      alert('Invalid selection: When Salad is selected, you cannot select Main Course, Fish, Vegetarian, Topping One, or Topping Two options.');
      return;
    }
    
    // Check if required fields are filled based on selection
    if (hasMainCourse || hasFish || hasVegeterian) {
      // When any of these are selected, ToppingOne and ToppingTwo are required
      if (!this.newOrder.ToppingOne || !this.newOrder.ToppingTwo) {
        alert('Please select both Topping One and Topping Two');
        return;
      }
    }
    
    // Apply the disabled fields logic again to ensure consistency
    this.updateDisabledFields();
    
    // Create the food order data with empty values for disabled fields
    const FoodOrderData = {
      EmployeeId: user.Id,
      FullName: user.FullName,
      MainCourse: this.fieldsDisabled.MainCourse ? '' : (this.newOrder.MainCourse || ''),
      Fish: this.fieldsDisabled.Fish ? '' : (this.newOrder.Fish || ''),
      Vegeterian: this.fieldsDisabled.Vegeterian ? '' : (this.newOrder.Vegeterian || ''),
      ToppingOne: this.fieldsDisabled.ToppingOne ? '' : (this.newOrder.ToppingOne || ''),
      ToppingTwo: this.fieldsDisabled.ToppingTwo ? '' : (this.newOrder.ToppingTwo || ''),
      Salad: this.fieldsDisabled.Salad ? '' : (this.newOrder.Salad || ''),
      Drink: this.newOrder.Drink,
    };

    console.log('Submitting food order with data:', FoodOrderData);
    
    this.foodOrderService.AddNewFoodOrder(FoodOrderData).subscribe({
      next: (response) => {
        alert('Your Meal Order has been submitted successfully! Bon Appetite!');
        this.clearForm();
        // Update today's order status after successful submission
        this.hasOrderForToday = true;
        this.todayOrder = response;
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
    
    // Reset disabled fields
    this.updateDisabledFields();
  }
  
  // Update disabled fields based on selections
  updateDisabledFields() {
    // Reset all disabled fields first
    Object.keys(this.fieldsDisabled).forEach(key => {
      this.fieldsDisabled[key as keyof typeof this.fieldsDisabled] = false;
    });
    
    // Check which option is selected and apply restrictions
    const hasMainCourse = this.newOrder.MainCourse !== '';
    const hasFish = this.newOrder.Fish !== '';
    const hasVegeterian = this.newOrder.Vegeterian !== '';
    const hasSalad = this.newOrder.Salad !== '';
    
    // Apply restrictions based on selected options
    if (hasMainCourse) {
      // If MainCourse is selected, disable Fish, Vegeterian, and Salad
      this.fieldsDisabled.Fish = true;
      this.fieldsDisabled.Vegeterian = true;
      this.fieldsDisabled.Salad = true;
      
      // Clear disabled fields
      this.newOrder.Fish = '';
      this.newOrder.Vegeterian = '';
      this.newOrder.Salad = '';
      
      console.log('Main Course selected, disabled Fish, Vegeterian, and Salad');
    } 
    else if (hasFish) {
      // If Fish is selected, disable MainCourse, Vegeterian, and Salad
      this.fieldsDisabled.MainCourse = true;
      this.fieldsDisabled.Vegeterian = true;
      this.fieldsDisabled.Salad = true;
      
      // Clear disabled fields
      this.newOrder.MainCourse = '';
      this.newOrder.Vegeterian = '';
      this.newOrder.Salad = '';
      
      console.log('Fish selected, disabled MainCourse, Vegeterian, and Salad');
    } 
    else if (hasVegeterian) {
      // If Vegeterian is selected, disable MainCourse, Fish, and Salad
      this.fieldsDisabled.MainCourse = true;
      this.fieldsDisabled.Fish = true;
      this.fieldsDisabled.Salad = true;
      
      // Clear disabled fields
      this.newOrder.MainCourse = '';
      this.newOrder.Fish = '';
      this.newOrder.Salad = '';
      
      console.log('Vegeterian selected, disabled MainCourse, Fish, and Salad');
    } 
    else if (hasSalad) {
      // If Salad is selected, disable MainCourse, Fish, Vegeterian, ToppingOne, and ToppingTwo
      this.fieldsDisabled.MainCourse = true;
      this.fieldsDisabled.Fish = true;
      this.fieldsDisabled.Vegeterian = true;
      this.fieldsDisabled.ToppingOne = true;
      this.fieldsDisabled.ToppingTwo = true;
      
      // Clear disabled fields
      this.newOrder.MainCourse = '';
      this.newOrder.Fish = '';
      this.newOrder.Vegeterian = '';
      this.newOrder.ToppingOne = '';
      this.newOrder.ToppingTwo = '';
      
      console.log('Salad selected, disabled MainCourse, Fish, Vegeterian, ToppingOne, and ToppingTwo');
    } else {
      console.log('No restrictions applied, all options available');
    }
  }

}
