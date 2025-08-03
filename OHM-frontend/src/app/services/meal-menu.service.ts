import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealMenu } from '../models/meal-menu.model';


@Injectable({
  providedIn: 'root'
})
export class MealMenuService {

  private apiUrl = 'http://localhost:3000/api/mealMenus';

  constructor(private http: HttpClient) {}

  getMealMenu(): Observable<MealMenu[]> {
    return this.http.get<MealMenu[]>(this.apiUrl);
  }

  getMealMenuById(id: string): Observable<MealMenu>{
    return this.http.get<MealMenu>(`${this.apiUrl}/${id}`);
  }

  createMealMenu(menuData: MealMenu): Observable<MealMenu>{
    return this.http.post<MealMenu>(this.apiUrl, menuData);
  }

  updateMealMenu(id: string, updatedMenuData: MealMenu): Observable<MealMenu>{
    return this.http.put<MealMenu>(`${this.apiUrl}/${id}`, updatedMenuData);
  }

  deleteMealMenu(id: string): Observable<MealMenu>{
    return this.http.delete<MealMenu>(`${this.apiUrl}/${id}`);
  }

}
