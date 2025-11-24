import './VehicleArea.css';
import { useState } from 'react';
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
  // Tab state: 'left' or 'right'
  const [selectedTab, setSelectedTab] = useState<'left' | 'right'>('left');
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
        <div className="popup-area">
          <div className="tabber">
            <div
              className={`tabber-left${
                selectedTab === 'left' ? ' selected' : ''
              }`}
              onClick={() => setSelectedTab('left')}
              style={{ cursor: 'pointer' }}
            ></div>
            <div
              className={`tabber-right${
                selectedTab === 'right' ? ' selected' : ''
              }`}
              onClick={() => setSelectedTab('right')}
              style={{ cursor: 'pointer' }}
            ></div>
          </div>
          <div className="btn-area">
            <div className="top">
              {selectedTab === 'left' ? (
                <>
                  <div className="fan-start" onClick={handleFanStart}></div>
                  <div className="fan-clear" onClick={handleFanClear}></div>
                </>
              ) : (
                <>
                  <div className="wheel-auto" onClick={handleWheelAuto}></div>
                  <div
                    className="wheel-cali"
                    onClick={handleWheelCalibration}
                  ></div>
                </>
              )}
            </div>
            <div className="bottom">
              {selectedTab === 'left' ? (
                <>
                  <div className="fan-up" onClick={handleFanAccel}></div>
                  <div className="fan-down" onClick={handleFanDeaccel}></div>
                </>
              ) : (
                <>
                  <div className="wheel-start" onClick={handleWheelStart}></div>
                  <div className="wheel-clear" onClick={handleWheelStop}></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mcu-less-1-rtt">{mcuStatus[0].rtt.toFixed(2)}ms</div>
      <div
        className={`mcu-less-1 ${
          mcuStatus[0].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-less-2-rtt">{mcuStatus[1].rtt.toFixed(2)}ms</div>
      <div
        className={`mcu-less-2 ${
          mcuStatus[1].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-1-rtt">{mcuStatus[2].rtt.toFixed(2)}ms</div>
      <div
        className={`mcu-1 ${
          mcuStatus[2].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-2-rtt">{mcuStatus[3].rtt.toFixed(2)}ms</div>
      <div
        className={`mcu-2 ${
          mcuStatus[3].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-less-3-rtt">{mcuStatus[4].rtt.toFixed(2)}ms</div>
      <div
        className={`mcu-less-3 ${
          mcuStatus[4].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>

      <div className="mcu-less-4-rtt">{mcuStatus[5].rtt.toFixed(2)}ms</div>
      <div
        className={`mcu-less-4 ${
          mcuStatus[5].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>
    </div>
  );
};

export default VehicleArea;
