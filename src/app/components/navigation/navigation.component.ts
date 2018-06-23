import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, fromEvent } from 'rxjs';

export interface NavItem {
  path: string;
  iconClass: string;
  translateString: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  navItems: NavItem[] = [
    {
      path: 'home',
      iconClass: 'fas fa-home',
      translateString: 'navigation.home'
    },
    {
      path: 'about-me',
      iconClass: 'fas fa-user-md',
      translateString: 'navigation.about-me'
    },
    {
      path: 'surgical-procedures',
      iconClass: 'fas fa-heartbeat',
      translateString: 'navigation.surgical-procedures'
    },
    {
      path: 'office-and-staff',
      iconClass: 'fas fa-users',
      translateString: 'navigation.office-and-staff'
    },
    {
      path: 'reviews',
      iconClass: 'fas fa-star',
      translateString: 'navigation.reviews'
    },
    {
      path: 'drive',
      iconClass: 'fas fa-car',
      translateString: 'navigation.drive'
    },
    {
      path: 'contact',
      iconClass: 'fas fa-envelope',
      translateString: 'navigation.contact'
    }
  ];

  navOpen = false;
  pageScrolled = false;

  private scrollSubscription: Subscription;

  constructor(public translateService: TranslateService) {
    this.onScroll = this.onScroll.bind(this);
  }

  ngOnInit() {
    this.scrollSubscription = fromEvent(window, 'scroll').subscribe(this.onScroll);
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  localizePath(path: string) {
    return `${this.translateService.currentLang}/${path}`;
  }

  onScroll() {
    this.pageScrolled = window.pageYOffset > 0;
  }
}
