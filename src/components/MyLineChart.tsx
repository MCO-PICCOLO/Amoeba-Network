import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import './MyLineChart.css';
import type { HTMLAttributes } from 'react';
import { useMemo, memo } from 'react';

interface LineDataSet {
  key: string;
  color: string;
  data: number[];
}

interface MaxLineInfo {
  value: number;
  label?: string;
}

interface MyLineChartsProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  yDomain?: [number, number];
  datasets: LineDataSet[];
  unit?: string;
  maxLineInfo?: MaxLineInfo;
  yTicks?: number[];
}

const MyLineCharts = ({
  title,
  yDomain = [0, 1000],
  datasets,
  unit = '',
  maxLineInfo,
  yTicks,
  ...props
}: MyLineChartsProps) => {
  const fixedMaxTime = 30;

  // useMemo로 data 배열 메모이제이션하여 불필요한 객체 생성 방지
  const data: Array<{ time: number; [key: string]: number | null }> = useMemo(
    () =>
      Array.from({ length: fixedMaxTime }, (_v, i) => {
        const point: { time: number; [key: string]: number | null } = {
          time: i + 1,
        };

        datasets.forEach((dataset) => {
          const n = dataset.data.length;
          let value: number | null = null;

          if (n === 0) {
            value = null;
          } else if (n < fixedMaxTime) {
            value = i < n ? dataset.data[i] : null;
          } else {
            const slice = dataset.data.slice(-fixedMaxTime);
            value = slice[i] ?? null;
          }

          // yDomain의 최대값보다 높은 경우 yDomain 최대값으로 제한
          if (value !== null && yDomain && value > yDomain[1]) {
            value = yDomain[1];
          }

          point[dataset.key] = value;
        });

        return point;
      }),
    [datasets, yDomain],
  );
  const domainMax = fixedMaxTime;
  const xTicks = [5, 10, 15, 20, 25, 30];
  return (
    <div className="line-chart" {...props}>
      <div className="chart-title-legend">
        <div className="chart-title">{title}</div>
        <div className="chart-legend">
          {datasets
            .filter((dataset) => dataset.key !== 'SW-less1')
            .map((dataset, index) => (
              <div key={`legend-${index}`} className="legend-item">
                <div
                  className="legend-icon"
                  style={{ borderColor: dataset.color }}
                />
                <span className="legend-label">{dataset.key}</span>
              </div>
            ))}
          {maxLineInfo !== undefined && maxLineInfo.label !== undefined && (
            <div className="legend-item">
              <div
                className="legend-icon-image"
                style={{
                  width: '18px',
                  height: '18px',
                  // backgroundColor: 'blue',
                  backgroundImage: "url('/src/assets/images/legend-icon.png')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                }}
              />
              <span className="legend-label">{maxLineInfo.label}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ position: 'absolute', top: '66px', left: '20px' }}>
        <ResponsiveContainer width={668} height={223}>
          <LineChart
            key={`chart-${maxLineInfo?.value}`}
            data={data}
            margin={{ top: 5, right: 15, left: 0, bottom: 5 }}
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
              width={70}
              domain={yDomain}
              ticks={yTicks}
              allowDataOverflow={false}
              axisLine={true}
              tickFormatter={(value) =>
                `${
                  unit === 'ms' && typeof value === 'number'
                    ? Math.round(value)
                    : value
                }${unit}`
              }
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
                type="linear"
                dataKey={dataset.key}
                stroke={dataset.color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={false}
                activeDot={false}
                isAnimationActive={false}
                connectNulls={false}
                name={dataset.key}
              />
            ))}
            {maxLineInfo !== undefined && (
              <ReferenceLine
                key={`refline-${maxLineInfo.value}`}
                y={maxLineInfo.value}
                stroke="#FF1414"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(MyLineCharts);
