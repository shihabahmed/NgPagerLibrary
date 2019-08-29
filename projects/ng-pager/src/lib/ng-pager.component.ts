import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { Pager } from './pager.model';

@Component({
    selector: 'ng-pager',
    templateUrl: './ng-pager.component.html',
    styleUrls: ['./ng-pager.component.css']
})

export class NgPagerComponent implements OnChanges {
    @Output() pageChange: EventEmitter<Pager> = new EventEmitter<Pager>();

    @Input() pager: Pager;
    @Input() paged = true;
    @Input() cssClasses = {
        prevButton: '',
        nextButton: '',
        pageNumber: '',
        infoText: ''
    };

    loading = false;

    pageInput: HTMLInputElement;

    private el: HTMLElement;
    private minPageNumber = 1;

    constructor(private _el: ElementRef) {
        this.el = _el.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.pager) {
            if (!changes.pager.isFirstChange()) {
                this.pager = changes.pager.currentValue;
                setTimeout(() => {
                    this.loading = false;
                }, 300);
            }

            if (this.pager.totalRecords > this.pager.pageSize) {
                this.el.classList.remove('d-none');
            } else {
                this.el.classList.add('d-none');
            }
        }
    }

    changePageSize(pageSize: number) {
        this.loading = true;
        this.pageChange.emit(new Pager(this.pager.totalRecords, 0, pageSize));
    }

    changePage(pageIndex: number) {
        if (pageIndex !== this.pager.pageIndex) {
            if (pageIndex >= this.pager.pageCount) {
                pageIndex = this.pager.pageCount - 1;
            } else if (pageIndex < 0) {
                pageIndex = 0;
            }
            this.loading = true;
            this.pageChange.emit(new Pager(this.pager.totalRecords, pageIndex, this.pager.pageSize));
        }
    }

    onKeyUp(e) {
        if (e.keyCode === 86) {
            if (isNaN(parseFloat(e.target.value))) {
                e.target.value = '';
            }
        }

        if (e.target.value === '' || (+e.target.value < this.minPageNumber)) {
            e.target.value = this.minPageNumber.toString();
        }

        if (e.keyCode === 13) {
            this.changePage(+e.target.value - 1);
            e.target.blur();
        }
    }

    onKeyDown(e) {
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            return true;
        } else {
            return false;
        }
    }
}
