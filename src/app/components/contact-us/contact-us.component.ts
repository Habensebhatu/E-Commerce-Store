import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Customer } from 'src/app/Models/Customer';
import { UserRegistrationService } from 'src/app/service/user-registration.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder,  private autService: UserRegistrationService ) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephoneNumber: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm && this.contactForm.valid) {
      const newCustomer = new Customer(this.contactForm.value);
      newCustomer.Telephone = newCustomer.Telephone.toString();
      console.log(newCustomer);
      this.autService.addCustomer(newCustomer)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (next) => {
            this.contactForm.reset();
          }
        });
    }
  }
}
