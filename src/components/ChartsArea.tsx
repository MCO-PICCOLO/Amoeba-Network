import './ChartsArea.css';
import MyLineChart from './MyLineChart';

interface LineChartData {
  title: string;
  value: number[];
}

interface ChartsAreaProps {
  distanceData: LineChartData;
  pwmDutyData: LineChartData;
  syncOffsetData: LineChartData;
}

const ChartsArea = ({
  distanceData,
  pwmDutyData,
  syncOffsetData,
}: ChartsAreaProps) => {
  return (
    <div id="charts-area">
      <MyLineChart
        title={distanceData.title}
        lineColor="#FF0AFB"
        value={distanceData.value}
        style={{ top: 30, left: 36, width: 708, height: 294 }}
      />
      <MyLineChart
        title={pwmDutyData.title}
        lineColor="#800AFF"
        value={pwmDutyData.value}
        style={{ top: 333, left: 36, width: 708, height: 294 }}
      />
      <MyLineChart
        title={syncOffsetData.title}
        lineColor="#01A4FF"
        value={syncOffsetData.value}
        style={{ top: 636, left: 36, width: 708, height: 294 }}
      />
    </div>
  );
};

export default ChartsArea;
