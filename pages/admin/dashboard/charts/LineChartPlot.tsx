import React from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from 'recharts';

const LineChartPlot = () => {
  const data = [
    {
      month: 'Jan',
      paid: 5000,
      organic: 4230
    },
    {
      month: 'Feb',
      paid: 7800,
      notprocessed: 2900
    },
    {
      month: 'Mar',
      paid: 4700,
      notprocessed: 2400
    },
    {
      month: 'Apr',
      paid: 9000,
      notprocessed: 2600
    },
    {
      month: 'May',
      paid: 7000,
      notprocessed: 3210
    }
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" className='text-xs' />
          <YAxis className='text-xs' />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="paid" stroke="#2e2e" strokeWidth={2} />
          <Line type="monotone" dataKey="notprocessed" stroke="#d3d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default LineChartPlot