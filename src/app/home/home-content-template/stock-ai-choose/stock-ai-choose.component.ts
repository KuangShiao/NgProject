import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'stock-ai-choose',
    templateUrl: './stock-ai-choose.component.html',
    styleUrls: ['./stock-ai-choose.component.css']
})
export class StockAiChooseComponent implements OnInit {

    isBlocked = false;

    condition = { typeNo: '' };
    typeOpts: SelectItem[] = [];

    stockList = [];

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
    }

}