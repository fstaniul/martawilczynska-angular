import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      visitDate: [null, [Validators.required]],
      text: ['', [Validators.required, Validators.maxLength(2000)]],
      score: [0]
    });
  }
}
