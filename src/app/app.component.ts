import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pager } from 'projects/ng-pager/src/public_api';
import { Observable } from 'rxjs';

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
        this.getData(new Pager()).subscribe((data:  any[]) => {
            this.allChars = data;
            this.pager = new Pager(data.length, 0, 5);
            this.getChars();
        });
    }

    getChars(start = 0) {
        this.chars = this.allChars.slice(start, start + this.pager.pageSize);
    }

    getData(pager:  Pager): Observable<any> {
        return this.http.request('GET', './assets/data.json', {
            params: {
                page:  pager.pageIndex.toString(),
                length:  pager.pageSize.toString()
            }
        });
    }

    changePage(pager:  Pager) {
        this.getData(pager).subscribe((data: any[]) => {
            this.pager = pager;  // THIS IS IMPORTANT
        });
    }
}
