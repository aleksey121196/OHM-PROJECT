import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit{
  
  FullName: string= '';
  Email: string= '';
  Message: string= '';
  

  successMessage = '';
  errorMessage = '';

  constructor(private contactService: ContactService,private router: Router) {}

  ngOnInit():void {}

  submitContact() {
    
    const contactData = {
      FullName: this.FullName,
      Email: this.Email,
      Message: this.Message
    }

    this.contactService.addContactData(contactData).subscribe({
      next:() => {
        alert('contact request submitted successfully');
        this.clearForm();
      },
      error:() => {
        alert('Failed to submit contact ');
      }
    });
  }


   clearForm() {
    this.FullName = '';
    this.Email= '';
    this.Message = '';
    
  }

  goToHome(){

    this.router.navigate(['/']);

  }
  
}
