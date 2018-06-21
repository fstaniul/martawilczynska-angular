import { Injectable } from '@angular/core';

export interface Review {
  score: number;
  signature: string;
  content: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor() {}
}
