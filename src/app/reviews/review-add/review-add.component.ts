import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

function DATE_BEFORE_VALIDATOR(control: AbstractControl) {
  if (control.value) {
    const { year, month, day } = control.value;
    const now = Date.now();
    const selectedDate = new Date(year, month - 1, day).getTime();
    if (now - selectedDate < 0) {
      return {
        before: 'Selected date is before now!'
      };
    }
  }
  return null;
}

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss']
})
export class ReviewAddComponent implements OnInit {
  addForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      visitDate: [null, [Validators.required, DATE_BEFORE_VALIDATOR]],
      text: ['', [Validators.required, Validators.maxLength(2000)]],
      score: [0, [Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit() {
    if (!this.addForm.valid) {
      Object.values(this.addForm.controls).forEach((c) => c.markAsDirty());
      return;
    }
  }

  get textControl() {
    return this.addForm.get('text');
  }

  get dateControl() {
    return this.addForm.get('visitDate');
  }

  get maxDate() {
    const now = new Date();
    const value = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    return value;
  }
}
