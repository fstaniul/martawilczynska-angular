import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FloatingInputComponent } from './floating-input/floating-input.component';
import { TranslatePrefixDirective } from './directives/translate-prefix.directive';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [FloatingInputComponent, TranslatePrefixDirective],
  exports: [FloatingInputComponent, TranslatePrefixDirective]
})
export class CustomFormsModule {}
