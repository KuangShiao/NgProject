import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService, SelectItem } from 'primeng/api';
import { StockInfo } from 'src/app/module/StockInfo';

@Component({
    selector: 'stock-info-query',
    templateUrl: './stock-info-query.component.html',
    styleUrls: ['./stock-info-query.component.css']
})
export class StockInfoQueryComponent implements OnInit {

    isBlocked = false;

    condition = { stockNoName: '', industryNo: '' };
    industryOpts: SelectItem[] = [];

    stockList: StockInfo[] = [];

    constructor( private service: ApiService, private messageService: MessageService ) {
        
    }

    ngOnInit() {
        // init industryOpts
        this.initIndustryOpts();
    }

    
    stockInfoQuery() {
        console.log( 'condition: ', this.condition );
        this.stockList = [];
        this.isBlocked = true;
        this.service.callApiService( 'findStockInfo', this.condition ).subscribe(
            result => {
                console.log( result );
                if ( result.check ) {
                    this.stockList = result.data
                }
                else {
                    console.log( result.msg );
                    this.messageService.add({ severity: 'error', summary: '錯誤', detail: result.msg });
                }
                this.isBlocked = false;
            },
            error => {
                console.log( error );
                this.messageService.add({ severity: 'error', summary: '錯誤', detail: error });
                this.isBlocked = false;
            }
        );
    }

    initIndustryOpts() {

        this.industryOpts = [];
        this.isBlocked = true;
        this.service.callApiService( 'findAllIndustryConfig', {} ).subscribe(
            result => {
                console.log( result );
                if ( result.check ) {
                    this.industryOpts.push({ label: '全部', value: '' });
                    for ( const item of result.data ) {
                        this.industryOpts.push({ label: item.industryName, value: item.industryNo });
                    }
                }
                else {
                    console.log( result.msg );
                    this.messageService.add({ severity: 'error', summary: '錯誤', detail: result.msg });
                }
                this.isBlocked = false;
            },
            error => {
                console.log( error );
                this.messageService.add({ severity: 'error', summary: '錯誤', detail: error });
                this.isBlocked = false;
            }
        );

    }
}