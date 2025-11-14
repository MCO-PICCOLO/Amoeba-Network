import ChartsArea from '../components/ChartsArea';
import VehicleArea from '../components/VehicleArea';
import './RuntimeMonitoring.css';

interface RuntimeMonitoringProps {}

const RuntimeMonitoring = ({}: RuntimeMonitoringProps) => {
  return (
    <div id="runtime-monitoring">
      <VehicleArea />
      <ChartsArea />
    </div>
  );
};

export default RuntimeMonitoring;
