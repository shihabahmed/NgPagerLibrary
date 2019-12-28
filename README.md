
# NgPager

Demo: https://gqairmxqb.github.stackblitz.io

### Installation
```
npm install ng-pager --save
```

### Pager Model
```
Pager pager = new Pager(totalRecords?: number, pageIndex?: number, pageSize?: number);
```

### Usage

In the module file (the one that declares the component inside which you'll be using `ng-pager`) add the following code
```
import { NgPagerModule } from 'ng-pager';

@NgModule({
    imports: [
        NgPagerModule
    ],
    ... //other stuff
})
```

Then, inside the component
```
import { Pager } from 'ng-pager';
    
export class YourComponent {
    pager: Pager;
    disablePager = false; // You can disable pager in certain situations.

    constructor(private http: HttpClient) {
        this.getData(new Pager()).subscribe((res: any[]) => {
            this.pager = new Pager(res.length, 0, 10);
        });
    }

    getData(pager: Pager): Observable<any> {
        return this.http.request('GET', 'DATA_SOURCE', {
            params: {
                page: pager.pageIndex.toString(),
                length: pager.pageSize.toString()
            }
        });
    }

    changePage(pager: Pager) {
        this.getData(pager).subscribe((res: any[]) => {
            this.pager = pager;  // THIS IS IMPORTANT
        });
    }
}
```

Finally, in the component template file:
```
<ng-pager [pager]="pager" [disabled]="disablePager" (pageChange)="changePage($event)"></ng-pager>
```

### Customization
For `load more` style paging, add the following attribute to the `ng-pager` element:
```
[paged]="false" // Default: true
```

#### Further customization for the paged style...

For customization of the `paged` style, in the component `.ts` file, put something like the following snippet:
```
pagerCssClasses = {
    prevButton: 'btn-pager btn-backward',
    nextButton: 'btn-pager btn-forward',
    pageNumber: 'text-left',
    infoText: 'weight-500'
};
```

Then in the component template file, add the following attribute:
```
[cssClasses]="pagerCssClasses"
```

So final code in the template should be as follows:
```
<ng-pager [pager]="pager" [cssClasses]="pagerCssClasses" (pageChange)="changePage($event)"></ng-pager>
```
