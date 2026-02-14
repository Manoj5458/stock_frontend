export default interface StockData {
    companyName: String;
    companyCode: String;
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
    relativeStrength?: number;
    rsRating?: string;
    rsDetails?: {
        current_price: number;
        price_63_days_ago: number;
        price_126_days_ago: number;
        price_189_days_ago: number;
        price_252_days_ago: number;
        calculation: string;
    };
}