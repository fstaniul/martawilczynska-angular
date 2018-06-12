import { Routes } from '@angular/router';
import { LanguageRouterComponent } from './components/language-router/language-router.component';
import { SurgicalProceduresComponent } from './components/surgical-procedures/surgical-procedures.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewAddComponent } from './components/reviews/review-add/review-add.component';
import { ReviewViewComponent } from './components/reviews/review-view/review-view.component';
import { ContactComponent } from './components/contact/contact.component';
import { DriveComponent } from './components/drive/drive.component';
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { OfficeAndStaffComponent } from './components/office-and-staff/office-and-staff.component';

export const routes: Routes = [
  {
    path: ':locale',
    component: LanguageRouterComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'about-me', component: AboutMeComponent },
      {
        path: 'surgical-procedures/:procedure',
        component: SurgicalProceduresComponent
      },
      {
        path: 'office-and-staff',
        component: OfficeAndStaffComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
        children: [
          { path: '', pathMatch: 'full', component: ReviewAddComponent },
          { path: ':id', component: ReviewViewComponent }
        ]
      },
      { path: 'drive', component: DriveComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', redirectTo: 'home' }
    ]
  },
  {
    path: '**',
    redirectTo: 'en'
  }
];