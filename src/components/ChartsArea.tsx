import './ChartsArea.css';
import MyLineChart from './MyLineChart';

interface LineChartData {
  title: string;
  value: number[];
}

interface ChartsAreaProps {
  distanceData: LineChartData;
  pwmDutyData: LineChartData;
  syncOffset1Data: LineChartData;
  syncOffset2Data: LineChartData;
}

const ChartsArea = ({
  distanceData,
  pwmDutyData,
  syncOffset1Data,
  syncOffset2Data,
}: ChartsAreaProps) => {
  return (
    <div id="charts-area">
      <MyLineChart
        title={distanceData.title}
        yDomain={[0, 1000]}
        datasets={[
          { key: 'Sensor1', color: '#FF0AFB', data: distanceData.value },
        ]}
        style={{ top: 30, left: 36, width: 708, height: 294 }}
      />
      <MyLineChart
        title={pwmDutyData.title}
        yDomain={[0, 100]}
        datasets={[{ key: 'Fan 1', color: '#800AFF', data: pwmDutyData.value }]}
        unit="%"
        style={{ top: 333, left: 36, width: 708, height: 294 }}
      />
      <MyLineChart
        title="Sync Offset"
        yDomain={[0, 100]}
        datasets={[
          { key: 'MCU 1', color: '#01A4FF', data: syncOffset1Data.value },
          { key: 'MCU 2', color: '#FF5722', data: syncOffset2Data.value },
        ]}
        unit="μs"
        style={{ top: 636, left: 36, width: 708, height: 294 }}
      />
    </div>
  );
};

export default ChartsArea;
