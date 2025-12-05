import './FanController.css';
import { type HTMLAttributes } from 'react';
import {
  postFanStart,
  postFanAccel,
  postFanDeaccel,
  postFanStop,
} from '../utils/RestApi';

interface FanControllerProps extends HTMLAttributes<HTMLDivElement> {}

const FanController = ({ ...props }: FanControllerProps) => {
  const handleLeftTop = async () => {
    try {
      await postFanStart();
    } catch (e) {
      console.error('Failed to start fan:', e);
    }
  };

  const handleRightTop = async () => {
    try {
      await postFanStop();
    } catch (e) {
      console.error('Failed to clear fan:', e);
    }
  };

  const handleLeftBottom = async () => {
    try {
      await postFanDeaccel();
    } catch (e) {
      console.error('Failed to deaccel fan:', e);
    }
  };

  const handleRightBottom = async () => {
    try {
      await postFanAccel();
    } catch (e) {
      console.error('Failed to accel fan:', e);
    }
  };

  return (
    <div id="fan-controller" {...props}>
      <div className="inner-area">
        <div className="left-top" onClick={handleLeftTop}></div>
        <div className="right-top" onClick={handleRightTop}></div>
        <div className="left-bottom" onClick={handleLeftBottom}></div>
        <div className="right-bottom" onClick={handleRightBottom}></div>
      </div>
    </div>
  );
};

export default FanController;
