import VehicleArea from '../components/VehicleArea';
import './RuntimeMonitoring.css';

interface RuntimeMonitoringProps {}

const RuntimeMonitoring = ({}: RuntimeMonitoringProps) => {
  return (
    <div id="runtime-monitoring">
      <VehicleArea />
    </div>
  );
};

export default RuntimeMonitoring;
