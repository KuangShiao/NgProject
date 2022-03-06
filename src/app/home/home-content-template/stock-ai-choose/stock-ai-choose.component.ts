import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Constants } from 'src/app/utils/constants';
import { StockInfo } from 'src/app/module/StockInfo';

@Component({
    selector: 'stock-ai-choose',
    templateUrl: './stock-ai-choose.component.html',
    styleUrls: ['./stock-ai-choose.component.css']
})
export class StockAiChooseComponent implements OnInit {

    isBlocked = false;

    condition = { typeNo: '' };
    typeOpts: SelectItem[] = [];

    stockList: StockInfo[] = [];
    selected: StockInfo;

    displayDialog = false;
    orderDialog = false;

    stockPriceList = [];

    orderCondition = { closePrice: 0, stockNo: '', stockName: '', stockNum: 1 };
    orderTbl = [];

    constructor( private service: ApiService, private messageService: MessageService ) {
        
    }

    ngOnInit() {
        this.initTypeOpts();
    }

    stockInfoQuery() {
        console.log( this.condition );
        if ( !this.condition.typeNo ) {
            this.messageService.add({ severity: 'warn', detail: '請選擇類型' });
            return;
        }

        this.stockList = [];
        this.isBlocked = true;
        this.service.callApiService( 'findStockByTypeNo', this.condition ).subscribe(
            result => {
                console.log( result );
                if ( result.check ) {
                    this.stockList = result.data
                    if ( !this.stockList || this.stockList.length === 0 ) {
                        this.messageService.add({ severity: 'info', detail: '查無資料' });
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

    initTypeOpts() {
        this.typeOpts.push({ label: Constants.stockAiChooseLabel.BELOW_AVERAGE_THREE_DAYS_LABEL, value: Constants.stockAiChooseValue.BELOW_AVERAGE_THREE_DAYS_VALUE });
        this.typeOpts.push({ label: Constants.stockAiChooseLabel.ABOVE_MOVING_AVERAGE_FIRST_DAY_LABEL, value: Constants.stockAiChooseValue.ABOVE_MOVING_AVERAGE_FIRST_DAY_VALUE });
        this.typeOpts.push({ label: Constants.stockAiChooseLabel.INVESTMENT_TRUST_SELL_TO_BUY_LABEL, value: Constants.stockAiChooseValue.INVESTMENT_TRUST_SELL_TO_BUY_VALUE });
    }

    findStockPrice() {
        console.log( this.selected );
        
        this.isBlocked = true;
        this.stockPriceList = [];
        const paramObj = {
            stockNo: this.selected.stockNo
        };
        this.service.callApiService( 'findStockPriceByStockNo', paramObj ).subscribe(
            result => {
                console.log( result );
                if ( result.check ) {
                    this.stockPriceList = result.data
                    this.displayDialog = true;
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

    getTotal( stock ) {
        return stock.foreignInvestors + stock.investmentTrust + stock.dealer;
    }

    displayOrderDialog() {
        this.orderCondition = {
            closePrice: this.selected.closePrice, 
            stockNo: this.selected.stockNo, 
            stockName: this.selected.stockName, 
            stockNum: 1
        };
        this.orderTbl = [];
        this.orderTbl.push( this.orderCondition );
        this.orderDialog = true;
    }

    orderStock() {
        console.log( 'orderStock: ', this.orderTbl );

        this.isBlocked = true;        
        let paramObj = this.orderTbl[0];
        paramObj.account = localStorage.getItem( Constants.LocalStorageKey.LOCAL_STORAGE_USER_ID_KEY );
        this.service.callApiService( 'orderStock', paramObj ).subscribe(
            result => {
                console.log( result );
                if ( result.check ) {
                    this.messageService.add({ severity: 'success', detail: '下單成功' });
                    this.displayDialog = false;
                    this.orderDialog = false;
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