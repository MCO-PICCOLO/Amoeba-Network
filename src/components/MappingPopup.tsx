import './MappingPopup.css';
import { useState, type HTMLAttributes } from 'react';
import * as Slider from '@radix-ui/react-slider';

interface MappingPopupProps extends HTMLAttributes<HTMLDivElement> {}

interface HorizontalValueSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
}

const HorizontalValueSlider = ({
  value,
  onValueChange,
}: HorizontalValueSliderProps) => {
  return (
    <Slider.Root
      className="slide-root"
      value={value}
      max={100}
      step={1}
      onValueChange={onValueChange}
    >
      <Slider.Track className="slide-track">
        <Slider.Range
          className="slide-range"
          style={{
            width: `calc(${value[0] ?? 0}% + ${
              12 - ((value[0] ?? 0) / 100) * 24
            }px)`,
          }}
        />
      </Slider.Track>
      <Slider.Thumb className="slide-thumb" />
    </Slider.Root>
  );
};

const MappingPopup = ({ ...props }: MappingPopupProps) => {
  const [value, setValue] = useState([0]);

  return (
    <div id="mapping-popup" {...props}>
      <div className="inner">
        <div className="close-button" />
        <div className="title-area">
          <div className="text">Sensor/Actuator Mapping & Configuration</div>
        </div>
        <div className="mapping-icons-area"></div>
        <div className="slide-area">
          <div className="text-area">
            <div className="distance-text">Distance</div>
            <div className="value-unit-area">
              <div className="value-text">{value[0]}</div>
              <div className="unit-text">cm</div>
            </div>
          </div>
          <HorizontalValueSlider value={value} onValueChange={setValue} />
        </div>
      </div>
    </div>
  );
};

export default MappingPopup;
