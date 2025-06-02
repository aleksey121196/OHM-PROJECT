import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessMeetingsService } from '../../../services/business-meetings.service';

@Component({
  selector: 'app-Meetings-inqueries',
  imports: [CommonModule,FormsModule],
  templateUrl: './Meetings-inqueries.component.html',
  styleUrl: './Meetings-inqueries.component.css'
})
export class MeetingsInqueriesComponent implements OnInit{

  
    meetings: any[] = [];
    loading: boolean = false;
    error: string = '';
  
    constructor(private businessMeetingsService: BusinessMeetingsService) {}
  
    ngOnInit(): void {
      this.fetchBusinessMeetings();
    }
  
    fetchBusinessMeetings(): void {
      this.loading = true;
      this.businessMeetingsService.getBusinesMeetingsByName().subscribe({
        next: (data) => {
          this.meetings = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load Meetings.';
          this.loading = false;
        }
      });
    }

}
