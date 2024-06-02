import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend, ResponsiveContainer } from "recharts";


const BarChartPlot = () => {

    const data = [
        { name: "Jan", success: 100, pending: 400, failed: 200 },
        { name: "Feb", success: 120, pending: 300, failed: 150 },
        { name: "Mar", success: 200, pending: 350, failed: 180 },
        { name: "Apr", success: 180, pending: 250, failed: 100 },
        { name: "May", success: 220, pending: 450, failed: 210 },
        { name: "Jun", success: 240, pending: 400, failed: 220 },
        { name: "Jul", success: 260, pending: 300, failed: 180 },
        { name: "Aug", success: 280, pending: 350, failed: 190 },
        { name: "Sep", success: 300, pending: 400, failed: 200 },
        { name: "Oct", success: 320, pending: 250, failed: 150 },
        { name: "Nov", success: 340, pending: 300, failed: 170 },
        { name: "Dec", success: 360, pending: 450, failed: 220 }
    ];

    return (
        <>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data} className="">
                    <Tooltip />
                    <Legend className="" />
                    <XAxis dataKey="name" className="text-[14px]" />
                    <YAxis className="text-[12px]" />
                    <Bar dataKey="success" fill="#0074d9" barSize={5} />
                    <Bar dataKey="failed" fill="#dc3545" barSize={5} />
                    <Bar dataKey="pending" fill="#ffc107" barSize={5} />
                </BarChart>
            </ResponsiveContainer>
        </>

    )
}


export default BarChartPlot;