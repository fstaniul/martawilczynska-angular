import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FloatingInputComponent } from './floating-input/floating-input.component';
import { TranslatePrefixDirective } from './directives/translate-prefix.directive';
import { FloatingTextareaComponent } from './floating-textarea/floating-textarea.component';
import { ErrorListComponent } from './error-list/error-list.component';
import { InputWithErrorComponent } from './input-with-error/input-with-error.component';
import { InputGroupPrependDirective } from './input-group-prepend.directive';
import { InputGroupAppendDirective } from './input-group-append.directive';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [
    FloatingInputComponent,
    TranslatePrefixDirective,
    FloatingTextareaComponent,
    ErrorListComponent,
    InputWithErrorComponent,
    InputGroupPrependDirective,
    InputGroupAppendDirective
  ],
  exports: [
    FloatingInputComponent,
    FloatingTextareaComponent,
    TranslatePrefixDirective,
    InputWithErrorComponent,
    InputGroupAppendDirective,
    InputGroupPrependDirective,
    ErrorListComponent
  ]
})
export class CustomFormsModule {}
