import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pager } from 'projects/ng-pager/src/public_api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ng-pager-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    pager: Pager;
    title = 'ng-pager';
    chars: any[];

    constructor(private http: HttpClient) {
        this.getData(new Pager(0, 0, 5)).subscribe((res: any) => {
            this.chars = res.data;
            this.pager = res.pager;
        });
    }

    getData(pager: Pager): Observable<any> {
        return this.http.request('GET', './assets/data.json').pipe(
            map((x: any[]) => {
                const start = pager.pageIndex * pager.pageSize;
                return {
                    data: x.slice(start, start + pager.pageSize),
                    pager: new Pager(x.length, pager.pageIndex, pager.pageSize)
                };
            })
        );
    }

    changePage(pager: Pager) {
        this.getData(pager).subscribe((res: any) => {
            this.chars = res.data;
            this.pager = res.pager;
        });
    }
}
