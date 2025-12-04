import './VehicleArea.css';
import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface MCUStatus {
  status: 'on' | 'off';
  rtt: number;
}

interface VehicleAreaProps {
  mcuStatus: MCUStatus[];
}

const VehicleArea = ({ mcuStatus }: VehicleAreaProps) => {
  const [selectedMode, setSelectedMode] = useState<string>('Select Item');

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
                selectedMode === 'Fan Only' ? 'selected' : ''
              }`}
              onSelect={() => setSelectedMode('Fan Only')}
            >
              <span>Fan Only</span>
              {selectedMode === 'Fan Only' && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={`dropdown-item ${
                selectedMode === 'Wheel Only' ? 'selected' : ''
              }`}
              onSelect={() => setSelectedMode('Wheel Only')}
            >
              <span>Wheel Only</span>
              {selectedMode === 'Wheel Only' && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={`dropdown-item ${
                selectedMode === 'Sensor 1: Fan1,2' ? 'selected' : ''
              }`}
              onSelect={() => setSelectedMode('Sensor 1: Fan1,2')}
            >
              <span>Sensor 1: Fan1,2</span>
              {selectedMode === 'Sensor 1: Fan1,2' && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={`dropdown-item ${
                selectedMode === 'Sensor 2: Fan1,2' ? 'selected' : ''
              }`}
              onSelect={() => setSelectedMode('Sensor 2: Fan1,2')}
            >
              <span>Sensor 2: Fan1,2</span>
              {selectedMode === 'Sensor 2: Fan1,2' && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={`dropdown-item ${
                selectedMode === 'Individual Matching' ? 'selected' : ''
              }`}
              onSelect={() => setSelectedMode('Individual Matching')}
            >
              <span>Individidual Matching</span>
              {selectedMode === 'Individual Matching' && (
                <span className="check-icon">✓</span>
              )}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
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
