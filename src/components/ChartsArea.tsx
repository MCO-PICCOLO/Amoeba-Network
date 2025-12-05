import './ChartsArea.css';
import MyLineChart from './MyLineChart';

interface ChartDataset {
  key: string;
  color: string;
}

interface ChartConfig {
  title: string;
  yDomain: [number, number];
  datasets: ChartDataset[];
  unit?: string;
}

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
}

const ChartsArea = ({
  distanceChartData,
  rttChartData,
  syncOffsetChartData,
  syncOffsetMaxValue = 0,
}: ChartsAreaProps) => {
  return (
    <div id="charts-area">
      <MyLineChart
        title="Distance"
        yDomain={[0, 1000]}
        datasets={[
          { key: 'Sensor1', color: '#FFC60A', data: distanceChartData.sensor1 },
          { key: 'Sensor2', color: '#EB3437', data: distanceChartData.sensor2 },
        ]}
        style={{ position: 'relative', width: '100%', height: 294 }}
      />
      <MyLineChart
        title="RTT (Round Trip Time)"
        yDomain={[0, 10]}
        yTicks={[0, 5, 10]}
        datasets={[
          { key: 'MCU1', color: '#16B56B', data: rttChartData.mcu1 },
          { key: 'MCU2', color: '#800AFF', data: rttChartData.mcu2 },
          { key: 'SW-less1', color: '#FF01D9', data: rttChartData.swLess1 },
          { key: 'SW-less2', color: '#01A4FF', data: rttChartData.swLess2 },
        ]}
        unit="ms"
        style={{ position: 'relative', width: '100%', height: 294 }}
      />
      <MyLineChart
        title="Time Sync Offset"
        yDomain={[0, 500]}
        datasets={[
          { key: 'MCU 1', color: '#FF01D9', data: syncOffsetChartData.mcu1 },
          { key: 'MCU 2', color: '#01A4FF', data: syncOffsetChartData.mcu2 },
        ]}
        unit="μs"
        maxLineY={syncOffsetMaxValue}
        style={{ position: 'relative', width: '100%', height: 294 }}
      />
    </div>
  );
};

export default ChartsArea;
