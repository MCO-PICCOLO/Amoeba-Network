import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import './MyLineChart.css';
import type { HTMLAttributes } from 'react';

interface MyLineChartsProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  lineColor: string;
  value?: number[];
}

const MyLineCharts = ({
  title,
  lineColor,
  value = [],
  ...props
}: MyLineChartsProps) => {
  const fixedMaxTime = 30;
  const n = value.length;
  const data: Array<{ time: number; v: number | null }> = Array.from(
    { length: fixedMaxTime },
    (_v, i) => {
      if (n === 0) return { time: i + 1, v: null };
      if (n < fixedMaxTime) {
        const v = i < n ? value[i] : null;
        return { time: i + 1, v };
      }
      const slice = value.slice(-fixedMaxTime);
      return { time: i + 1, v: slice[i] ?? null };
    },
  );
  const domainMax = fixedMaxTime;
  const xTicks = [5, 10, 15, 20, 25, 30];
  return (
    <div className="line-chart" {...props}>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" height={266}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="time"
            type="number"
            domain={[1, domainMax]}
            ticks={xTicks}
            tick={{
              fontFamily: 'Pretendard, Arial, sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 16,
              fill: '#1D1D1D',
            }}
          />
          <YAxis
            width={40}
            domain={[0, 40]}
            axisLine={false}
            tick={{
              fontFamily: 'Pretendard, Arial, sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 16,
              fill: '#1D1D1D',
            }}
          />
          <Line
            type="natural"
            dataKey="v"
            stroke={lineColor}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyLineCharts;
