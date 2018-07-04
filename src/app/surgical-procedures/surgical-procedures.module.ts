import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurgicalProceduresComponent } from './surgical-procedures.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedComponentsModule } from '../app-shared-components/app-shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'before-the-surgery'
      },
      {
        path: ':procedure',
        component: SurgicalProceduresComponent
      }
    ]),
    TranslateModule.forChild(),
    AppSharedComponentsModule
  ],
  declarations: [SurgicalProceduresComponent]
})
export class SurgicalProceduresModule {}
