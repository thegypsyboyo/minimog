import LineChartPlot from "./LineChartPlot";
// import PieChartPlot from "./PieChartPlot";
// import RadarChartPlot from "./RadarChartPlot";
import BarChartPlot from "./barChartPlot";

const Charts = () => (
    <>
        <section className="flex my-4 px-0 gap-3">
            <div className="w-2/3 min-h-[300px] bg-white rounded p-2">
                <div className="mb-8 px-8 pt-7 text-xl font-normal">
                    <h1 className="font-semibold">
                        Order status
                    </h1>
                    <span className="text-base font-light">Order Status and Tracking. Track your order from ship date to arrival. To begin, enter your order number.
                    </span>
                </div>
                <BarChartPlot />
            </div>

            <div className="w-1/3 min-h-[300px] bg-white rounded p-5">
                <div className="px-8 mb-10 pt-7 text-xl font-normal">
                    <h1 className="font-semibold">
                        Social Impact
                    </h1>
                </div>
                <LineChartPlot />
            </div>
        </section>

        {/* <section className="flex my-4 px-0 gap-2">
            <div className=" w-2/3 h-[250px] bg-gray-700 rounded">
                <RadarChartPlot />
            </div>
            <div className=" w-1/3 h-[250px] bg-gray-700 rounded">
                <LineChartPlot />
            </div>
        </section> */}
    </>
);

export default Charts;