import './ChartsArea.css';
import MyLineChart from './MyLineChart';

interface ChartsAreaProps {}

const ChartsArea = ({}: ChartsAreaProps) => {
  const tmpDistanceData = { title: 'Distance', value: [1, 2, 3] };
  const tmpPWMdutyData = { title: 'PWM Duty', value: [4, 5, 6] };
  const tmpSyncOffsetData = { title: 'Sync Offset', value: [7, 8, 9] };

  return (
    <div id="charts-area">
      <MyLineChart
        title={tmpDistanceData.title}
        lineColor="#FF0AFB"
        value={tmpDistanceData.value}
        style={{ top: 30, left: 36, width: 708, height: 294 }}
      />
      <MyLineChart
        title={tmpPWMdutyData.title}
        lineColor="#800AFF"
        value={tmpPWMdutyData.value}
        style={{ top: 333, left: 36, width: 708, height: 294 }}
      />
      <MyLineChart
        title={tmpSyncOffsetData.title}
        lineColor="#01A4FF"
        value={tmpSyncOffsetData.value}
        style={{ top: 636, left: 36, width: 708, height: 294 }}
      />
    </div>
  );
};

export default ChartsArea;
