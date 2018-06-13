import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const PHONE_NUMBER_PATTERN = /^(?:\+\d{2} ?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3,4}$/;

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  PENDING: 1 = 1;
  SUCCESS: 2 = 2;
  ERROR: 3 = 3;

  status: 1 | 2 | 3 = 1;

  form: FormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)]
      ],
      message: ['', [Validators.required, Validators.maxLength(2000)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((c) => c.markAsDirty());
      this.form.markAsDirty();

      return;
    }

    this.httpClient
      .post('/api/contact', this.form.value)
      .subscribe(
        () => (this.status = this.SUCCESS),
        () => (this.status = this.ERROR)
      );
  }

  get name() {
    return this.form.get('name');
  }

  get phone() {
    return this.form.get('phone');
  }

  get message() {
    return this.form.get('message');
  }

  get email() {
    return this.form.get('email');
  }

  get disabled() {
    return this.form.invalid && (this.form.dirty || this.form.touched);
  }
}
