import './FanController.css';
import { type HTMLAttributes, useCallback, memo } from 'react';
import {
  postFanStart,
  postFanAccel,
  postFanDeaccel,
  postFanStop,
} from '../utils/RestApi';

interface FanControllerProps extends HTMLAttributes<HTMLDivElement> {}

const FanController = ({ ...props }: FanControllerProps) => {
  // useCallback으로 이벤트 핸들러 메모이제이션하여 불필요한 리렌더 방지
  const handleLeftTop = useCallback(async () => {
    try {
      await postFanStart();
    } catch (e) {
      console.error('Failed to start fan:', e);
    }
  }, []);

  const handleRightTop = useCallback(async () => {
    try {
      await postFanStop();
    } catch (e) {
      console.error('Failed to clear fan:', e);
    }
  }, []);

  const handleLeftBottom = useCallback(async () => {
    try {
      await postFanDeaccel();
    } catch (e) {
      console.error('Failed to deaccel fan:', e);
    }
  }, []);

  const handleRightBottom = useCallback(async () => {
    try {
      await postFanAccel();
    } catch (e) {
      console.error('Failed to accel fan:', e);
    }
  }, []);

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

export default memo(FanController);
