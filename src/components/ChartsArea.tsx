import './ChartsArea.css';

interface ChartsAreaProps {}

const ChartsArea = ({}: ChartsAreaProps) => {
  return (
    <div id="charts-area">
      <div className="fan-area">
        <div className="fan-inner-area"></div>
      </div>
      <div className="wheel-area">
        <div className="wheel-inner-area"></div>
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

export default ChartsArea;
