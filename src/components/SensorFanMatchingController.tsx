import './SensorFanMatchingController.css';
import {
  type HTMLAttributes,
  useState,
  useCallback,
  useMemo,
  memo,
  useEffect,
} from 'react';
import { CONTROL_MODE } from './VehicleArea';
import { postDeploy } from '../utils/RestApi';

type SensorFanMatchingType =
  | typeof CONTROL_MODE.SENSOR_1_FAN
  | typeof CONTROL_MODE.INDIVIDUAL_MATCHING;

interface SensorFanMatchingControllerProps
  extends HTMLAttributes<HTMLDivElement> {
  type?: SensorFanMatchingType;
  onSensitivityChange?: (sensitivity: string) => void;
}

const SensorFanMatchingController = ({
  type,
  onSensitivityChange,
  ...props
}: SensorFanMatchingControllerProps) => {
  const [safetyEnabled, setSafetyEnabled] = useState(false);
  const [sensitivity, setSensitivity] = useState('Low');
  const [isDeployed, setIsDeployed] = useState(false);

  // type이 변경되면 isDeployed를 false로 리셋
  useEffect(() => {
    setIsDeployed(false);
  }, [type]);

  // sensitivity 변경 시 부모 컴포넌트에 알림
  useEffect(() => {
    onSensitivityChange?.(sensitivity);
  }, [sensitivity, onSensitivityChange]);

  // useCallback으로 핸들러 메모이제이션
  const handleDeploy = useCallback(async () => {
    try {
      let sensors: string[] = [];

      if (type === CONTROL_MODE.SENSOR_1_FAN) {
        sensors = ['sensor1'];
      } else if (type === CONTROL_MODE.INDIVIDUAL_MATCHING) {
        sensors = ['sensor1', 'sensor2'];
      }

      await postDeploy({
        mappingInfo: {
          sensor: sensors,
          fan: ['fan1', 'fan2'],
        },
        condition: {
          sensitivity: sensitivity,
        },
        safety_enabled: safetyEnabled,
      });
      console.log('Deploy successful');
      setIsDeployed(true); // 배포 성공 시 상태 업데이트
    } catch (error) {
      console.error('Deploy failed:', error);
    }
  }, [type, sensitivity, safetyEnabled, setIsDeployed]);

  // useMemo로 className 메모이제이션
  const typeClassName = useMemo(() => {
    if (type === CONTROL_MODE.SENSOR_1_FAN) {
      return 'sensor1';
    } else if (type === CONTROL_MODE.INDIVIDUAL_MATCHING) {
      return 'mixed';
    }
    return '';
  }, [type]);

  return (
    <>
      {!isDeployed ? (
        <div id="sensor-fan-matching-controller" {...props}>
          <div className={`type-area ${typeClassName}`} />
          <div className="sensitivity-group">
            <div className="Sensitivity-text">Sensitivity</div>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="sensitivity"
                  value="Low"
                  checked={sensitivity === 'Low'}
                  onChange={(e) => setSensitivity(e.target.value)}
                />
                Low
              </label>
              <label>
                <input
                  type="radio"
                  name="sensitivity"
                  value="Mid"
                  checked={sensitivity === 'Mid'}
                  onChange={(e) => setSensitivity(e.target.value)}
                />
                Mid
              </label>
              <label>
                <input
                  type="radio"
                  name="sensitivity"
                  value="High"
                  checked={sensitivity === 'High'}
                  onChange={(e) => setSensitivity(e.target.value)}
                />
                High
              </label>
            </div>
          </div>
          <div className="divider" />
          <div className="deploy-button" onClick={handleDeploy} />
          <div className="safety-checkbox">
            <input
              type="checkbox"
              id="safety-enabled"
              name="safety-enabled"
              checked={safetyEnabled}
              onChange={(e) => setSafetyEnabled(e.target.checked)}
            />
            <label htmlFor="safety-enabled">Safety</label>
          </div>
        </div>
      ) : (
        <div id="sensor-fan-after-deploy" {...props}>
          <div className={`type-area ${typeClassName}`} />
          <div className="sensitivity-text">{sensitivity}</div>
        </div>
      )}
    </>
  );
};

export default memo(SensorFanMatchingController);
