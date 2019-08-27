import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { Pager } from './pager.model';

@Component({
  selector: 'ng-pager',
  templateUrl: './ng-pager.component.html',
  styleUrls: ['./ng-pager.component.css']
})

export class NgPagerComponent implements OnChanges {
  @Output() change: EventEmitter<Pager> = new EventEmitter<Pager>();

  @Input() pager: Pager;
  @Input() paged = true;
  @Input() pageSizes = [
      //     { text: '2', value: 2 },
      //     { text: '5', value: 5 },
      //     { text: '10', value: 10 },
      //     { text: '20', value: 20 },
      //     { text: '50', value: 50 },
      //     { text: '100', value: 100 },
      //     { text: 'All', value: 0 }
  ];

  loading = false;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.pager) {
          if (!changes.pager.isFirstChange()) {
              this.pager = changes.pager.currentValue;
              setTimeout(() => {
                  this.loading = false;
              }, 300);
          }

          if (this.pager.totalRecords > this.pager.pageSize) {
              this.el.nativeElement.classList.remove('d-none');
          } else {
              this.el.nativeElement.classList.add('d-none');
          }
      }
  }

  changePageSize(pageSize: number) {
      this.loading = true;
      this.change.emit(new Pager(this.pager.totalRecords, 0, pageSize));
  }

  changePage(pageIndex: number) {
      if (pageIndex !== this.pager.pageIndex) {
          if (pageIndex >= this.pager.pageCount) {
              pageIndex = this.pager.pageCount - 1;
          } else if (pageIndex < 0) {
              pageIndex = 0;
          }
          this.loading = true;
          this.change.emit(new Pager(this.pager.totalRecords, pageIndex, this.pager.pageSize));
      }
  }
}
