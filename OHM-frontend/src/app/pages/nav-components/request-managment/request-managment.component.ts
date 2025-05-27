import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-request-managment',
  imports: [CommonModule,FormsModule],
  templateUrl: './request-managment.component.html',
  styleUrl: './request-managment.component.css'
})
export class RequestManagmentComponent implements OnInit{

  requests: any[] = [];
  responseTexts: { [key: string]: string } = {};
  loading: boolean = false;
  error: string = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.loading = true;
    this.requestService.getRequestsByDepartment().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load requests.';
        this.loading = false;
      }
    });
  }

  sendResponse(requestId: string): void {
    const text = this.responseTexts[requestId];
    if (!text || text.trim() === '') return;

    this.requestService.respondToRequest(requestId, text).subscribe({
      next: (updatedRequest) => {
        const index = this.requests.findIndex(req => req._id === requestId);
        if (index > -1) {
          this.requests[index] = updatedRequest;
        }
        this.responseTexts[requestId] = ''; // clear input
      },
      error: () => {
        alert('Failed to send response');
      }
    });
  }

}
