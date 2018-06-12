import { Component } from '@angular/core';
import { ContentLoader } from '../../utils/content-loader';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ContentLoader {
  constructor(dataService: DataService) {
    super(dataService, 'home');
  }
}
