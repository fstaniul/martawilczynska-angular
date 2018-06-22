import { Routes } from '@angular/router';
import { LanguageRouterComponent } from './components/language-router/language-router.component';
import { SurgicalProceduresComponent } from './components/surgical-procedures/surgical-procedures.component';
import { ContactComponent } from './components/contact/contact.component';
import { DriveComponent } from './components/drive/drive.component';
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { OfficeAndStaffComponent } from './components/office-and-staff/office-and-staff.component';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewAddComponent } from './reviews/review-add/review-add.component';
import { ReviewViewComponent } from './reviews/review-view/review-view.component';
import { InitialRedirectComponent } from './components/initial-redirect/initial-redirect.component';

export const routes: Routes = [
  {
    path: '',
    component: InitialRedirectComponent
  },
  {
    path: ':language',
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
        path: 'surgical-procedures',
        redirectTo: 'surgical-procedures/before-the-surgery'
      },
      {
        path: 'office-and-staff',
        component: OfficeAndStaffComponent
      },
      // {
      //   path: 'reviews',
      //   component: ReviewsComponent,
      //   children: [
      //     { path: '', pathMatch: 'full', component: ReviewAddComponent },
      //     { path: ':id', component: ReviewViewComponent }
      //   ]
      // },
      { path: 'drive', component: DriveComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', redirectTo: 'home' }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
