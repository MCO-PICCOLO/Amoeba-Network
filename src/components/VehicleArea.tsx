import './VehicleArea.css';
import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import FanController from './FanController';
import WheelController from './WheelController';

const CONTROL_MODE = {
  FAN_ONLY: 'Fan Only',
  WHEEL_ONLY: 'Wheel Only',
  SENSOR_1_FAN: 'Sensor 1: Fan1,2',
  SENSOR_2_FAN: 'Sensor 2: Fan1,2',
  INDIVIDUAL_MATCHING: 'Individual Matching',
  SELECT_ITEM: 'Select Item',
} as const;

type ControlMode = (typeof CONTROL_MODE)[keyof typeof CONTROL_MODE];

interface MCUStatus {
  status: 'on' | 'off';
  rtt: number;
}

interface VehicleAreaProps {
  mcuStatus: MCUStatus[];
}

const VehicleArea = ({ mcuStatus }: VehicleAreaProps) => {
  const [selectedMode, setSelectedMode] = useState<ControlMode>(
    CONTROL_MODE.SELECT_ITEM,
  );

  // Handler functions (currently unused - can be used for button click events)
  // const handleFanStart = async () => {
  //   try {
  //     await postFanStart();
  //   } catch (e) {}
  // };
  // const handleFanClear = async () => {
  //   try {
  //     await postFanClear();
  //   } catch (e) {}
  // };
  // const handleFanAccel = async () => {
  //   try {
  //     await postFanAccel();
  //   } catch (e) {}
  // };
  // const handleFanDeaccel = async () => {
  //   try {
  //     await postFanDeaccel();
  //   } catch (e) {}
  // };
  // const handleWheelStart = async () => {
  //   try {
  //     await postWheelStart();
  //   } catch (e) {}
  // };
  // const handleWheelStop = async () => {
  //   try {
  //     await postWheelStop();
  //   } catch (e) {}
  // };
  // const handleWheelAuto = async () => {
  //   try {
  //     await postWheelAuto();
  //   } catch (e) {}
  // };
  // const handleWheelCalibration = async () => {
  //   try {
  //     await postWheelCalibration();
  //   } catch (e) {}
  // };

  return (
    <div id="vehicle-area">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="dropdown-trigger">{selectedMode}</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="dropdown-content">
            <DropdownMenu.Item
              className={`dropdown-item ${
                selectedMode === CONTROL_MODE.FAN_ONLY ? 'selected' : ''
              }`}
              onSelect={() => setSelectedMode(CONTROL_MODE.FAN_ONLY)}
            >
              <span>Fan Only</span>
              {selectedMode === CONTROL_MODE.FAN_ONLY && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={`dropdown-item ${
                selectedMode === CONTROL_MODE.WHEEL_ONLY ? 'selected' : ''
              }`}
              onSelect={() => setSelectedMode(CONTROL_MODE.WHEEL_ONLY)}
            >
              <span>Wheel Only</span>
              {selectedMode === CONTROL_MODE.WHEEL_ONLY && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={`dropdown-item ${
                selectedMode === CONTROL_MODE.SENSOR_1_FAN ? 'selected' : ''
              }`}
              onSelect={() => setSelectedMode(CONTROL_MODE.SENSOR_1_FAN)}
            >
              <span>Sensor 1: Fan1,2</span>
              {selectedMode === CONTROL_MODE.SENSOR_1_FAN && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={`dropdown-item ${
                selectedMode === CONTROL_MODE.SENSOR_2_FAN ? 'selected' : ''
              }`}
              onSelect={() => setSelectedMode(CONTROL_MODE.SENSOR_2_FAN)}
            >
              <span>Sensor 2: Fan1,2</span>
              {selectedMode === CONTROL_MODE.SENSOR_2_FAN && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={`dropdown-item ${
                selectedMode === CONTROL_MODE.INDIVIDUAL_MATCHING
                  ? 'selected'
                  : ''
              }`}
              onSelect={() => setSelectedMode(CONTROL_MODE.INDIVIDUAL_MATCHING)}
            >
              <span>Individidual Matching</span>
              {selectedMode === CONTROL_MODE.INDIVIDUAL_MATCHING && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      {selectedMode === CONTROL_MODE.FAN_ONLY && <FanController />}
      {selectedMode === CONTROL_MODE.WHEEL_ONLY && <WheelController />}
      <div
        className={`mcu-less-1 ${
          mcuStatus[0].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>
      <div
        className={`mcu-less-2 ${
          mcuStatus[1].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>
      <div
        className={`mcu-1 ${
          mcuStatus[2].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>
      <div
        className={`mcu-2 ${
          mcuStatus[3].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>
      <div
        className={`mcu-less-3 ${
          mcuStatus[4].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>
      <div
        className={`mcu-less-4 ${
          mcuStatus[5].status === 'on' ? 'mcu-status-green' : 'mcu-status-black'
        }`}
      ></div>
    </div>
  );
};

export default VehicleArea;
