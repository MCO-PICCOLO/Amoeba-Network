import {
  postWheelAuto,
  postWheelCalibration,
  postWheelStart,
  postWheelStop,
} from '../utils/RestApi';
import './WheelController.css';
import { type HTMLAttributes } from 'react';

interface WheelControllerProps extends HTMLAttributes<HTMLDivElement> {}

const handleLeftTop = async () => {
  try {
    await postWheelStart();
  } catch (e) {
    console.error('Failed to start wheel:', e);
  }
};

const handleRightTop = async () => {
  try {
    await postWheelStop();
  } catch (e) {
    console.error('Failed to stop wheel:', e);
  }
};

const handleLeftBottom = async () => {
  try {
    await postWheelAuto();
  } catch (e) {
    console.error('Failed to auto wheel:', e);
  }
};

const handleRightBottom = async () => {
  try {
    await postWheelCalibration();
  } catch (e) {
    console.error('Failed to calibrate wheel:', e);
  }
};

const WheelController = ({ ...props }: WheelControllerProps) => {
  return (
    <div id="wheel-controller" {...props}>
      <div className="inner-area">
        <div className="left-top" onClick={handleLeftTop}></div>
        <div className="right-top" onClick={handleRightTop}></div>
        <div className="left-bottom" onClick={handleLeftBottom}></div>
        <div className="right-bottom" onClick={handleRightBottom}></div>
      </div>
    </div>
  );
};

export default WheelController;
