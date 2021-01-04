import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFlipComponent } from './page-flip/page-flip.component';
import { AnnotationsComponent } from './annotations/annotations.component';
import { DemoComponent } from './demo/demo.component';



@NgModule({
  declarations: [
    PageFlipComponent,
    AnnotationsComponent,
    DemoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageFlipComponent,
    DemoComponent,
    AnnotationsComponent
  ]
})
export class BookModule { }
