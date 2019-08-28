
# NgPager
  
### Installation
	npm install ng-pager --save

 
### Pager Model
    Pager pager = new Pager(totalRecords?: number, pageIndex?: number, pageSize?: number);

### Usage

In `app.module.ts` add the following code

    import { NgPagerModule } from 'ng-pager';
    
    @NgModule({
    	imports: [
    		NgPagerModule
    	],
    	... //other stuff
    })

Then, inside the component

    import { Pager } from  'ng-pager';
    
    export  class  YourComponent {
    	pager: Pager;

		constructor(private  http:  HttpClient) {
	    	this.getData(new Pager()).subscribe((res:  any[]) => {
				this.pager = new Pager(res.length, 0, 10);
			});
		}

		getData(pager:  Pager): Observable<any> {
			return this.http.request('GET', 'DATA_SOURCE', {
				params: {
					page:  pager.pageIndex.toString(),
					length:  pager.pageSize.toString()
				}
			});
		}

		changePage(pager:  Pager) {
			this.getData(pager).subscribe((res: any[]) => {
				this.pager = pager;  // THIS IS IMPORTANT
			});
		}
    }

Finally, in the component template file

    <ng-pager [pager]="pager" (change)="changePage($event)"></ng-pager>

