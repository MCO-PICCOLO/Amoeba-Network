import './VehicleArea.css';
import { postFanStart, postFanClear, postFanAccel, postFanDeaccel } from '../utils/RestApi';

interface VehicleAreaProps {}

const VehicleArea = ({}: VehicleAreaProps) => {
  const handleFanStart = async () => {
    try {
      await postFanStart();
    } catch (e) {}
  };
  const handleFanClear = async () => {
    try {
      await postFanClear();
    } catch (e) {}
  };
  const handleFanAccel = async () => {
    try {
      await postFanAccel();
    } catch (e) {}
  };
  const handleFanDeaccel = async () => {
    try {
      await postFanDeaccel();
    } catch (e) {}
  };

  return (
    <div id="vehicle-area">
      <div className="control-area">
        <div className="fan-start" onClick={handleFanStart}></div>
        <div className="fan-clear" onClick={handleFanClear}></div>
        <div className="fan-deaccel" onClick={handleFanDeaccel}></div>
        <div className="fan-accel" onClick={handleFanAccel}></div>
        <div className="wheel-start"></div>
        <div className="wheel-stop"></div>
        <div className="wheela-auto"></div>
        <div className="wheela-cali"></div>
      </div>
      <div className="mcu-less-1 mcu-status-green"></div>
      <div className="mcu-less-2 mcu-status-green"></div>
      <div className="mcu-less-3 mcu-status-green"></div>
      <div className="mcu-less-4 mcu-status-green"></div>
      <div className="mcu-1 mcu-status-black"></div>
      <div className="mcu-2 mcu-status-green"></div>
    </div>
  );
};

export default VehicleArea;
