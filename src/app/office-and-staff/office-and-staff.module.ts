import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { OfficeAndStaffComponent } from './office-and-staff.component';
import { AppSharedComponentsModule } from '../app-shared-components/app-shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OfficeAndStaffComponent }]),
    TranslateModule.forChild(),
    AppSharedComponentsModule
  ],
  declarations: [OfficeAndStaffComponent]
})
export class OfficeAndStaffModule {}
