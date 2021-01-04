import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFlipDirective } from './page-flip.directive';



@NgModule({
  declarations: [PageFlipDirective],
  imports: [
    CommonModule
  ],
  exports: [
    PageFlipDirective
  ]
})
export class SharedModule { }
