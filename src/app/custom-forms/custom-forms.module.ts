import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePrefixDirective } from './directives/translate-prefix.directive';
import { ErrorListComponent } from './error-list/error-list.component';
import { InputWithErrorComponent } from './input-with-error/input-with-error.component';
import { InputGroupPrependDirective } from './directives/input-group-prepend.directive';
import { InputGroupAppendDirective } from './directives/input-group-append.directive';
import { TranslatePlaceholderDirective } from './directives/translate-placeholder.directive';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [
    TranslatePrefixDirective,
    ErrorListComponent,
    InputWithErrorComponent,
    InputGroupPrependDirective,
    InputGroupAppendDirective,
    TranslatePlaceholderDirective
  ],
  exports: [
    TranslatePrefixDirective,
    InputWithErrorComponent,
    InputGroupAppendDirective,
    InputGroupPrependDirective,
    ErrorListComponent,
    TranslatePlaceholderDirective
  ]
})
export class CustomFormsModule {}
