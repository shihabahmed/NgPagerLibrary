import { NgModule } from '@angular/core';
import { NgPagerComponent } from './ng-pager.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgPagerComponent],
  exports: [NgPagerComponent]
})
export class NgPagerModule { }
