import StockData from "../models/stock-model";

const mapToStockData = (data: any): StockData => {
    const [high, low] = data["High / Low"].split(" / ");
    return {
        companyName: data["companyName"],
        companyCode: data["companyCode"],
        about: data["about"],
        marketCap: data["Market Cap"],
        currentPrice: data["Current Price"],
        highPrice: high.trim(),
        lowPrice: low.trim(),
        bookValue: data["Book Value"],
        dividendYield: data["Dividend Yield"],
        roe: data["ROE"],
        roce: data['ROCE'],
        faceValue: data["Face Value"],
        pe: data['Stock P/E'],
        netProfitQuarter: data["Net Profit Quarterly"],
        netProfitYear: data["Net Profit Yearly"],
        stockScore: data["stockScore"],
        relativeStrength: data["Relative Strength"],
        rsRating: data["RS Rating"],
        rsDetails: data["RS Details"]
    };
};

export default mapToStockData;