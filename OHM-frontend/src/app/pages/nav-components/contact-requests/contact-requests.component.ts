import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-requests',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-requests.component.html',
  styleUrl: './contact-requests.component.css'
})
export class ContactRequestsComponent implements OnInit{

  Businessrequests: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private contactService: ContactService,private router: Router) {}
  

   ngOnInit(): void {
    this.fetchBusinesRequestData();
  }

  fetchBusinesRequestData(): void {
    this.loading = true;
    this.contactService.getBusinessRequests().subscribe({
      next: (data) => {
        this.Businessrequests= data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load requests.';
        this.loading = false;
      }
    });
  }

}
