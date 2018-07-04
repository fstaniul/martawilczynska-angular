import { Routes } from '@angular/router';
import { LanguageRouterComponent } from './components/language-router/language-router.component';
import { HomeComponent } from './components/home/home.component';
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
      { path: 'about-me', loadChildren: './about-me/about-me.module#AboutMeModule' },
      {
        path: 'surgical-procedures',
        loadChildren: './surgical-procedures/surgical-procedures.module#SurgicalProceduresModule'
      },
      {
        path: 'office-and-staff',
        loadChildren: './office-and-staff/office-and-staff.module#OfficeAndStaffModule'
      },
      // {
      //   path: 'reviews',
      //   component: ReviewsComponent,
      //   children: [
      //     { path: '', pathMatch: 'full', component: ReviewAddComponent },
      //     { path: ':id', component: ReviewViewComponent }
      //   ]
      // },
      { path: 'drive', loadChildren: './drive/drive.module#DriveModule' },
      { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
      { path: '**', redirectTo: 'home' }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
