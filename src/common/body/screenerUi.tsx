import { useSelector } from "react-redux";
import { marketData } from "../../features/stockData";
import { Card } from "../../components/shadcn/Card";

const ScreenerUi = () => {
  const screenerData = useSelector(marketData);

  return (
    <>
      <div className="w-full container px-4 py-3">
        <Card className="w-full h-full p-5 bg-black shadow-lg">
          <div>
            <h1 className="text-4xl underline font-bold decoration-slate-600">
              {screenerData.companyName}
            </h1>
          </div>
          <div>
            <h2 className="text-2xl mt-5">{screenerData.about}</h2>
          </div>
          <div className="grid grid-cols-3 mt-5">
            <div className="col-span-2">
              <div className="grid grid-cols-3 gap-4 p-4 shadow-md rounded-lg border">
                <div className="text-lg flex justify-between">
                  <b>Market Cap :</b> &#8377; {screenerData.marketCap} Cr.
                </div>
                <div className="text-lg flex justify-between">
                  <b>Current Price :</b> &#8377; {screenerData.currentPrice}
                </div>
                <div className="text-lg flex justify-between">
                  <b>High / Low :</b> {screenerData.highPrice} /{" "}
                  {screenerData.lowPrice}
                </div>
                <div className="text-lg flex justify-between">
                  <b>Stock P/E :</b> &#8377; {screenerData.pe}
                </div>
                <div className="text-lg flex justify-between">
                  <b>Book Value :</b> &#8377; {screenerData.bookValue}
                </div>
                <div className="text-lg flex justify-between">
                  <b>Dividend Yield :</b> &#8377; {screenerData.dividendYield}
                </div>
                <div className="text-lg flex justify-between">
                  <b>ROCE :</b> &#8377; {screenerData.roce}
                </div>
                <div className="text-lg flex justify-between">
                  <b>ROE :</b> &#8377; {screenerData.roe}
                </div>
                <div className="text-lg flex justify-between">
                  <b>Face Value :</b> &#8377; {screenerData.faceValue}
                </div>
              </div>
            </div>
            <div className="ml-5col-span-1">
              <>Stock Score: {screenerData.stockScore} / 7.5</>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ScreenerUi;
