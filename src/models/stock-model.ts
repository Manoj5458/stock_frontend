export default interface StockData {
    companyName: String;
    about: String;
    marketCap: String;
    currentPrice: String;
    highPrice: String;
    lowPrice: String;
    bookValue: String;
    dividendYield: String;
    roe: String;
    roce: String;
    faceValue: String;
    pe: String;
    netProfitQuarter: Array<String>;
    netProfitYear: Array<String>;
    stockScore: number;
}