import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DriveComponent } from './drive.component';
import { AppSharedComponentsModule } from '../app-shared-components/app-shared-components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DriveComponent }]),
    TranslateModule.forChild(),
    AppSharedComponentsModule
  ],
  declarations: [DriveComponent]
})
export class DriveModule {}
