export interface StockInfo {
    closePrice: number;      // 目前股價
    stockNo: string;         // 股票代號
	stockName: string;       // 股票名稱
	listingDate: Date;       // 上市日期
	marketNo: string;        // 市場別代碼
	industryNo: string       // 產業別代碼
	industryName: string;    // 產業別名稱
}