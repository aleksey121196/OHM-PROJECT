import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { SecretaryComponent } from './pages/secretary/secretary.component';
import { authGuard } from './guards/auth.guard';
import { AbsenceComponent } from './pages/nav-components/absence/absence.component';
import { MeetingsInqueriesComponent } from './pages/nav-components/meetings-inqueries/Meetings-inqueries.component';
import { MealMenuComponent } from './pages/nav-components/meal-menu/meal-menu.component';
import { MealOrderListComponent } from './pages/nav-components/meal-order-list/meal-order-list.component';
import { MealOredrComponent } from './pages/nav-components/meal-oredr/meal-oredr.component';
import { OrdersManagmentComponent } from './pages/nav-components/orders-managment/orders-managment.component';
import { OvertimeRegisterComponent } from './pages/nav-components/overtime-register/overtime-register.component';
import { PerformenceTrackingComponent } from './pages/nav-components/performence-tracking/performence-tracking.component';
import { PersonalDataComponent } from './pages/nav-components/personal-data/personal-data.component';
import { RequestManagmentComponent } from './pages/nav-components/request-managment/request-managment.component';
import { RequestsComponent } from './pages/nav-components/requests/requests.component';
import { TaskStatusComponent } from './pages/nav-components/task-status/task-status.component';
import { TransportationComponent } from './pages/nav-components/transportation/transportation.component';
import { WorkPlanComponent } from './pages/nav-components/work-plan/work-plan.component';
import { EmployeeManagComponent } from './pages/nav-components/employee-manag/employee-manag.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SetBusimessMeetingsComponent } from './pages/nav-components/set-busimess-meetings/set-busimess-meetings.component';
import { SetDepartmentMeetingsComponent } from './pages/nav-components/set-department-meetings/set-department-meetings.component';
import { OrdersListComponent } from './pages/nav-components/orders-list/orders-list.component';
import { ContactRequestsComponent } from './pages/nav-components/contact-requests/contact-requests.component';
import { EmployeePerformanceDashboardComponent } from './pages/employee-performance-dashboard/employee-performance-dashboard.component';
import { ManagerPerformanceDashboardComponent } from './pages/manager-performance-dashboard/manager-performance-dashboard.component';

export const routes: Routes = [
    {
        path : '', component: HomeComponent
    },
    {
        path : 'login', component: LoginComponent
    },
    {
        path : 'contactUs', component: ContactUsComponent
    },
    {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [authGuard],
        data:{roles: ['Employee']},
        children: [
          { path: '', redirectTo: 'my-performance', pathMatch: 'full' },
          { path: 'my-performance', component: EmployeePerformanceDashboardComponent }, 
          { path: 'personal-data', component: PersonalDataComponent },
          { path: 'meal-order', component: MealOredrComponent },
          { path: 'transportation', component: TransportationComponent },
          { path: 'absence', component: AbsenceComponent },
          { path: 'overtime-register', component: OvertimeRegisterComponent },
          { path: 'requests', component: RequestsComponent },
          { path: 'task-status', component: TaskStatusComponent }
        ]
      },
    {
        path : 'manager', 
         component: ManagerComponent, 
         canActivate: [authGuard],
         data:{roles: ['Manager']},
         children: [
            { path: '', redirectTo: 'performence-traking', pathMatch: 'full' },
            { path: 'performence-traking', component: ManagerPerformanceDashboardComponent },
            { path: 'personal-data', component: PersonalDataComponent },
            { path: 'meal-order', component: MealOredrComponent },
            { path: 'transportation', component: TransportationComponent },
            { path: 'absence', component: AbsenceComponent },
            { path: 'overtime-register', component: OvertimeRegisterComponent },
            { path: 'requests-managment', component: RequestManagmentComponent },
            { path: 'create-work-plan', component: WorkPlanComponent},
            { path: 'orders-list', component:OrdersListComponent},
            { path: 'performence-traking', component: PerformenceTrackingComponent},
            { path: 'Meetings-inqueries', component: MeetingsInqueriesComponent},
            { path: 'set-department-meetings', component:SetDepartmentMeetingsComponent}
          ]
    },
    {
        path : 'secretary', 
         component: SecretaryComponent, 
         canActivate: [authGuard],
         data:{roles: ['Secretary']},
         children: [
            { path: 'personal-data', component: PersonalDataComponent },
            { path: 'meal-order', component: MealOredrComponent },
            { path: 'transportation', component: TransportationComponent },
            { path: 'absence', component: AbsenceComponent },
            { path: 'overtime-register', component: OvertimeRegisterComponent },
            { path: 'meal-menu', component: MealMenuComponent},
            { path: 'meal-oredr-list', component: MealOrderListComponent},
            { path: 'employee-manag', component: EmployeeManagComponent},
            { path: 'order-managment', component: OrdersManagmentComponent},
            { path: 'set-business-meetings', component:SetBusimessMeetingsComponent},
            { path: 'contact-requests', component:ContactRequestsComponent}
          ]
    }
];
