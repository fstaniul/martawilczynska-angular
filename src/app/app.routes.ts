import { Routes } from '@angular/router';
import { LanguageRouterComponent } from './components/language-router/language-router.component';
import { InitialRedirectComponent } from './components/initial-redirect/initial-redirect.component';
import { HomeModule } from './home/home.module';

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
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'about-me', loadChildren: './about-me/about-me.module#AboutMeModule' },
      {
        path: 'surgical-procedures',
        loadChildren: './surgical-procedures/surgical-procedures.module#SurgicalProceduresModule'
      },
      // {
      //   path: 'office-and-staff',
      //   loadChildren: './office-and-staff/office-and-staff.module#OfficeAndStaffModule'
      // },
      // { path: 'drive', loadChildren: './drive/drive.module#DriveModule' },
      { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
      { path: '**', redirectTo: 'home' }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
