import './VehicleArea.css';
import { useState, memo } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import FanController from './FanController';
import WheelController from './WheelController';
import SensorFanMatchingController from './SensorFanMatchingController';

export const CONTROL_MODE = {
  FAN_ONLY: 'Fan Only',
  WHEEL_ONLY: 'Wheel Only',
  SENSOR_1_FAN: 'Sensor 1: Fan1,2',
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
  onSensitivityChange?: (sensitivity: string) => void;
}

const VehicleArea = ({ mcuStatus, onSensitivityChange }: VehicleAreaProps) => {
  const [selectedMode, setSelectedMode] = useState<ControlMode>(
    CONTROL_MODE.SELECT_ITEM,
  );

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
                selectedMode === CONTROL_MODE.INDIVIDUAL_MATCHING
                  ? 'selected'
                  : ''
              }`}
              onSelect={() => setSelectedMode(CONTROL_MODE.INDIVIDUAL_MATCHING)}
            >
              <span>Individual Matching</span>
              {selectedMode === CONTROL_MODE.INDIVIDUAL_MATCHING && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      {selectedMode === CONTROL_MODE.FAN_ONLY && <FanController />}
      {selectedMode === CONTROL_MODE.WHEEL_ONLY && <WheelController />}
      {(selectedMode === CONTROL_MODE.SENSOR_1_FAN ||
        selectedMode === CONTROL_MODE.INDIVIDUAL_MATCHING) && (
        <SensorFanMatchingController
          type={selectedMode}
          onSensitivityChange={onSensitivityChange}
        />
      )}

      {selectedMode === CONTROL_MODE.FAN_ONLY && (
        <>
          <div className="s1-normal"></div>
          <div className="s2-normal"></div>
          <div className="w1-dimmed"></div>
          <div className="w2-dimmed"></div>
          <div className="f1-normal"></div>
          <div className="f2-normal"></div>
        </>
      )}
      {selectedMode === CONTROL_MODE.WHEEL_ONLY && (
        <>
          <div className="s1-dimmed"></div>
          <div className="s2-dimmed"></div>
          <div className="w1-normal"></div>
          <div className="w2-normal"></div>
          <div className="f1-dimmed"></div>
          <div className="f2-dimmed"></div>
        </>
      )}
      {selectedMode !== CONTROL_MODE.FAN_ONLY &&
        selectedMode !== CONTROL_MODE.WHEEL_ONLY && (
          <>
            <div className="s1-normal"></div>
            <div className="s2-normal"></div>
            <div className="w1-normal"></div>
            <div className="w2-normal"></div>
            <div className="f1-normal"></div>
            <div className="f2-normal"></div>
          </>
        )}
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

export default memo(VehicleArea);
