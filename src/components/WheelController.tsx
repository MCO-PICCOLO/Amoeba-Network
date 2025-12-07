import {
  postWheelAuto,
  postWheelCalibration,
  postWheelStart,
  postWheelStop,
} from '../utils/RestApi';
import './WheelController.css';
import { type HTMLAttributes, useCallback, memo } from 'react';

interface WheelControllerProps extends HTMLAttributes<HTMLDivElement> {}

const WheelController = ({ ...props }: WheelControllerProps) => {
  // useCallback으로 이벤트 핸들러 메모이제이션하여 불필요한 리렌더 방지
  const handleLeftTop = useCallback(async () => {
    try {
      await postWheelStart();
    } catch (e) {
      console.error('Failed to start wheel:', e);
    }
  }, []);

  const handleRightTop = useCallback(async () => {
    try {
      await postWheelStop();
    } catch (e) {
      console.error('Failed to stop wheel:', e);
    }
  }, []);

  const handleLeftBottom = useCallback(async () => {
    try {
      await postWheelAuto();
    } catch (e) {
      console.error('Failed to auto wheel:', e);
    }
  }, []);

  const handleRightBottom = useCallback(async () => {
    try {
      await postWheelCalibration();
    } catch (e) {
      console.error('Failed to calibrate wheel:', e);
    }
  }, []);

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

export default memo(WheelController);
