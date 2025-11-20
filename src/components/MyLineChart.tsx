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

interface LineDataSet {
  key: string;
  color: string;
  data: number[];
}

interface MyLineChartsProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  yDomain?: [number, number];
  datasets: LineDataSet[];
  unit?: string;
}

const MyLineCharts = ({
  title,
  yDomain = [0, 1000],
  datasets,
  unit = '',
  ...props
}: MyLineChartsProps) => {
  const fixedMaxTime = 30;

  const data: Array<{ time: number; [key: string]: number | null }> =
    Array.from({ length: fixedMaxTime }, (_v, i) => {
      const point: { time: number; [key: string]: number | null } = {
        time: i + 1,
      };

      datasets.forEach((dataset) => {
        const n = dataset.data.length;
        if (n === 0) {
          point[dataset.key] = null;
        } else if (n < fixedMaxTime) {
          point[dataset.key] = i < n ? dataset.data[i] : null;
        } else {
          const slice = dataset.data.slice(-fixedMaxTime);
          point[dataset.key] = slice[i] ?? null;
        }
      });

      return point;
    });
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
            width={50}
            domain={yDomain}
            axisLine={false}
            tickFormatter={(value) => `${value}${unit}`}
            tick={{
              fontFamily: 'Pretendard, Arial, sans-serif',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 16,
              fill: '#1D1D1D',
            }}
          />
          {datasets.map((dataset) => (
            <Line
              key={dataset.key}
              type="natural"
              dataKey={dataset.key}
              stroke={dataset.color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyLineCharts;
