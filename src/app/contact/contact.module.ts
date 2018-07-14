import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedComponentsModule } from '../app-shared-components/app-shared-components.module';
import { CustomFormsModule } from '../custom-forms/custom-forms.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ContactComponent }]),
    TranslateModule.forChild(),
    AppSharedComponentsModule,
    CustomFormsModule
  ],
  declarations: [ContactComponent, ContactFormComponent]
})
export class ContactModule {}
