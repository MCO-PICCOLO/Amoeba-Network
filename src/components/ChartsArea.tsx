import './ChartsArea.css';
import MyLineChart from './MyLineChart';
import { memo } from 'react';

// interface ChartDataset {
//   key: string;
//   color: string;
// }

// interface ChartConfig {
//   title: string;
//   yDomain: [number, number];
//   datasets: ChartDataset[];
//   unit?: string;
// }

interface ChartsAreaProps {
  distanceChartData: {
    sensor1: number[];
    sensor2: number[];
  };
  rttChartData: {
    mcu1: number[];
    mcu2: number[];
    swLess1: number[];
    swLess2: number[];
  };
  syncOffsetChartData: {
    mcu1: number[];
    mcu2: number[];
  };
  syncOffsetMaxValue?: number;
  sensitivity?: string;
}

const ChartsArea = ({
  distanceChartData,
  rttChartData,
  syncOffsetChartData,
  syncOffsetMaxValue = 0,
  sensitivity,
}: ChartsAreaProps) => {
  // Sensitivity에 따른 Distance Reference Line 값 계산
  const getDistanceReferenceValue = () => {
    switch (sensitivity) {
      case 'Low':
        return 250;
      case 'Mid':
        return 500;
      case 'High':
        return 750;
      default:
        return undefined; // sensitivity가 설정되지 않은 경우 Reference Line 없음
    }
  };

  const distanceRefValue = getDistanceReferenceValue();
  return (
    <div id="charts-area">
      <MyLineChart
        title="Distance"
        yDomain={[0, 1000]}
        datasets={[
          { key: 'Sensor1', color: '#FFC60A', data: distanceChartData.sensor1 },
          { key: 'Sensor2', color: '#EB3437', data: distanceChartData.sensor2 },
        ]}
        maxLineInfo={distanceRefValue ? { value: distanceRefValue } : undefined}
        style={{ position: 'relative', width: '100%', height: 294 }}
      />
      <MyLineChart
        title="End-to-End Response Time"
        yDomain={[0, 30]}
        yTicks={[0, 10, 20, 30]}
        datasets={[
          // { key: 'MCU1', color: '#16B56B', data: rttChartData.mcu1 },
          // { key: 'MCU2', color: '#800AFF', data: rttChartData.mcu2 },
          { key: 'SW-less1', color: '#FF01D9', data: rttChartData.swLess1 },
          // { key: 'SW-less2', color: '#01A4FF', data: rttChartData.swLess2 },
        ]}
        maxLineInfo={{ value: 10, label: 'Chassis Requirement (< 10 ms)' }}
        unit="ms"
        style={{ position: 'relative', width: '100%', height: 294 }}
      />
      <MyLineChart
        title="Time Sync Offset"
        yDomain={[0, 100]}
        yTicks={[0, 30, 60, 100]}
        datasets={[
          { key: 'MCU 1', color: '#FF01D9', data: syncOffsetChartData.mcu1 },
          { key: 'MCU 2', color: '#01A4FF', data: syncOffsetChartData.mcu2 },
        ]}
        unit="μs"
        // maxLineInfo={{ value: syncOffsetMaxValue, label: 'BaseLine' }}
        maxLineInfo={{ value: 10 }}
        style={{ position: 'relative', width: '100%', height: 294 }}
      />
    </div>
  );
};

export default memo(ChartsArea);
