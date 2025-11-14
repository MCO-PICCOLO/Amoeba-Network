import './VehicleArea.css';

interface VehicleAreaProps {}

const VehicleArea = ({}: VehicleAreaProps) => {
  return (
    <div id="vehicle-area">
      <div className="fan-area">
        <div className="fan-inner-area"></div>
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
