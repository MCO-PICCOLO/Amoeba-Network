import './VehicleArea.css';
import {
  postFanStart,
  postFanClear,
  postFanAccel,
  postFanDeaccel,
  postWheelStart,
  postWheelStop,
  postWheelAuto,
  postWheelCalibration,
} from '../utils/RestApi';

interface MCUStatus {
  status: 'on' | 'off';
  rtt: number;
}

interface VehicleAreaProps {
  mcuStatus: MCUStatus[];
}

const VehicleArea = ({ mcuStatus }: VehicleAreaProps) => {
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

  const handleWheelStart = async () => {
    try {
      await postWheelStart();
    } catch (e) {}
  };

  const handleWheelStop = async () => {
    try {
      await postWheelStop();
    } catch (e) {}
  };

  const handleWheelAuto = async () => {
    try {
      await postWheelAuto();
    } catch (e) {}
  };

  const handleWheelCalibration = async () => {
    try {
      await postWheelCalibration();
    } catch (e) {}
  };

  return (
    <div id="vehicle-area">
      <div className="control-area">
        <div className="fan-start" onClick={handleFanStart}></div>
        <div className="fan-clear" onClick={handleFanClear}></div>
        <div className="fan-deaccel" onClick={handleFanDeaccel}></div>
        <div className="fan-accel" onClick={handleFanAccel}></div>
        <div className="wheel-start" onClick={handleWheelStart}></div>
        <div className="wheel-stop" onClick={handleWheelStop}></div>
        <div className="wheel-auto" onClick={handleWheelAuto}></div>
        <div className="wheel-cali" onClick={handleWheelCalibration}></div>
      </div>
      <div className="mcu-less-1-rtt">{mcuStatus[0].rtt}μs</div>
      <div
        className={`mcu-less-1 ${
          mcuStatus[0].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-less-2-rtt">{mcuStatus[1].rtt}μs</div>
      <div
        className={`mcu-less-2 ${
          mcuStatus[1].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-1-rtt">{mcuStatus[2].rtt}μs</div>
      <div
        className={`mcu-1 ${
          mcuStatus[2].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-2-rtt">{mcuStatus[3].rtt}μs</div>
      <div
        className={`mcu-2 ${
          mcuStatus[3].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-less-3-rtt">{mcuStatus[4].rtt}μs</div>
      <div
        className={`mcu-less-3 ${
          mcuStatus[4].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-less-4-rtt">{mcuStatus[5].rtt}μs</div>
      <div
        className={`mcu-less-4 ${
          mcuStatus[5].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>
    </div>
  );
};

export default VehicleArea;
