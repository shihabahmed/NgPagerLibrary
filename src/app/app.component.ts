import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pager } from 'projects/ng-pager/src/public_api';

@Component({
    selector: 'ng-pager-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ng-pager';
    allChars: any[];
    chars: any[];
    pager: Pager;

    constructor(private http: HttpClient) {
        this.pager = new Pager();
        this.http.request('GET', './assets/data.json', {
            params: {
                page: this.pager.pageIndex.toString(),
                length: this.pager.pageSize.toString()
            }
        }).subscribe((data: any[]) => {
            this.allChars = data;
            this.pager = new Pager(this.allChars.length, 0, 5);
            this.getChars();
        });
    }

    getChars(start = 0) {
        this.chars = this.allChars.slice(start, start + this.pager.pageSize);
    }

    changePage(pager: Pager) {
        this.getChars(pager.pageIndex * pager.pageSize);
        this.pager = pager;
    }
}
