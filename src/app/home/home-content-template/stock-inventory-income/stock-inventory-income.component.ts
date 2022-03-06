import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService } from 'primeng/api';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'stock-inventory-income',
    templateUrl: './stock-inventory-income.component.html',
    styleUrls: ['./stock-inventory-income.component.css']
})
export class StockInventoryIncomeComponent implements OnInit {

    isBlocked = false;
    displayDialog = false;

    stockInventoryList = [];

    totalProfitLoss = 0;

    currentDate = new Date();

    stockList = [];
    condition = { stockNoName: '', industryNo: '', stockNum: 0 };

    constructor( private service: ApiService, private messageService: MessageService ) {
        
    }

    ngOnInit() {
        this.stockList.push( { closePrice: 115.5, stockName: '陽明', stockNo: '2609' } );
        this.stockInventoryQuery();
    }

    stockInventoryQuery() {
        const paramObj = {
            account: localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY )
        };
        this.stockInventoryList = [];
        this.isBlocked = true;
        this.service.callApiService( 'stockInventoryQuery', paramObj ).subscribe(
            result => {
                console.log( result );
                if ( result.check ) {
                    this.stockInventoryList = result.data
                    this.totalProfitLoss = this.stockInventoryList.reduce((sum, current) => sum + (current.income - current.costPrice), 0);
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

    ceil( n: number ) {
        return Math.ceil( ( n + Number.EPSILON ) * 100 ) / 100;
    }
}