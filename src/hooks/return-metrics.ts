import { useSelector } from "react-redux"
import { marketData } from "../features/stockData"
import { useMemo } from "react";

const useReturnMetrics = () => {
    const screenerData = useSelector(marketData);
    const dividendPershare = useMemo(() => {
        const dividendYield = Number(screenerData["dividendYield"]);
        const currentPrice = Number(screenerData["currentPrice"].replace(",", ""));

        if (isNaN(dividendYield) || isNaN(currentPrice)) {
            console.warn("Invalid data for dividend yield or current price.");
            return 0;
        }

        return (dividendYield / 100) * currentPrice;
    }, [screenerData]);

    const cagr = useMemo(() => {
        const periods = [1, 3, 5, 10];
        const screenerDataCagr = screenerData["netProfitYear"];

        // Ensure screenerDataCagr is valid and has enough data
        if (!Array.isArray(screenerDataCagr) || screenerDataCagr.length === 0) {
            console.warn("Invalid or insufficient data for CAGR calculation.");
            return {};
        }

        const start = Number(screenerDataCagr[0].replace(",", "")); // First value in the array
        if (start <= 0 || isNaN(start)) {
            console.warn("Start value must be a valid number greater than 0 for CAGR calculation.");
            return {};
        }

        // Calculate CAGR for each period and return as an object
        const cagrObject = periods.reduce((acc, period) => {
            if (period > screenerDataCagr.length) {
                console.warn(`Insufficient data for period ${period}.`);
                acc[`${period}Y`] = null; // Add null for invalid periods
                return acc;
            }
            const end = Number(screenerDataCagr[period - 1].replace(",", "")); // Get the value at the correct index
            if (end <= 0 || isNaN(end)) {
                console.warn(`End value must be a valid number greater than 0 for period ${period}.`);
                acc[`${period} Year`] = null; // Add null for invalid periods
                return acc;
            }
            // CAGR formula: ((End Value / Start Value) ^ (1 / Period)) - 1
            acc[`${period} Year`] = ((Math.pow(end / start, 1 / period) - 1) * 100); // Convert to percentage
            return acc;
        }, {} as Record<string, number | null>);

        return cagrObject;
    }, [screenerData]);

    const estimatedPrices = useMemo(() => {
        const currentPrice = Number(screenerData["currentPrice"].replace(",", ""));
        if (isNaN(currentPrice) || currentPrice <= 0) {
            console.warn("Invalid or missing current price for estimated price calculation.");
            return {};
        }

        // Calculate estimated prices for each period
        const estimatedPricesObject = Object.entries(cagr).reduce((acc, [period, cagrValue]) => {
            if (cagrValue === null || isNaN(cagrValue)) {
                acc[period] = null; // Add null for invalid CAGR values
                return acc;
            }
            const years = Number(period.replace("Year", "")); // Extract the number of years from the period key
            acc[period] = currentPrice * Math.pow(1 + cagrValue / 100, years); // Apply the formula
            return acc;
        }, {} as Record<string, number | null>);

        return estimatedPricesObject;
    }, [cagr, screenerData]);


    return { dividendPershare, cagr, estimatedPrices };
};

export default useReturnMetrics;
