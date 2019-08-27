export class Pager {
    totalRecords: number;
    pageIndex: number;
    pageSize: number;

    pageCount: number;
    hasNext: boolean;
    hasPrevious: boolean;

    records = {
        from: 1,
        to: 0
    };

    constructor(totalRecords?: number, pageIndex?: number, pageSize?: number) {
        this.pageIndex = pageIndex || 0;
        this.pageSize = pageSize || 10;
        this.totalRecords = totalRecords || 0;

        this.update();
    }

    get currentPage() {
        return this.pageIndex + 1;
    }

    update() {
        this.pageCount = Math.ceil(this.totalRecords / this.pageSize) || 1;
        this.hasNext = this.pageCount > 1 && this.pageIndex < (this.pageCount - 1);
        this.hasPrevious = this.pageCount > 1 && this.pageIndex > 0;

        this.records.from = (this.pageIndex * this.pageSize) + 1;
        this.records.to = (this.records.from - 1) + this.pageSize;
        if (this.records.to > this.totalRecords) {
            this.records.to = this.totalRecords;
        }
    }
}
