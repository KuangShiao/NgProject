import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
    selector: 'stock-inventory-income',
    templateUrl: './stock-inventory-income.component.html',
    styleUrls: ['./stock-inventory-income.component.css']
})
export class StockInventoryIncomeComponent implements OnInit {

    isBlocked = false;
    displayDialog = false;

    inventoryIncomeList = [];

    totalProfitLoss = 0;

    currentDate = new Date();

    stockList = [];
    condition = { stockNoName: '', industryNo: '', stockNum: 0 };

    constructor( private service: ApiService, private messageService: MessageService ) {
        
    }

    ngOnInit() {
        this.isBlocked = true;
        this.inventoryIncomeList.push( { closePrice: 83.3, stockName: '宏達電', stockNo: '2498', stockNum: 1, avgPrice: 80, investmentCost: 80000, income: 83300, profitLoss: 3300, profitLossRate: '4.125%', balancePrice: 83.3} );
        this.isBlocked = false;
        this.totalProfitLoss = this.inventoryIncomeList.reduce((sum, current) => sum + current.profitLoss, 0);

        this.stockList.push( { closePrice: 115.5, stockName: '陽明', stockNo: '2609' } );
    }

    stockInfoQuery() {
    }
}