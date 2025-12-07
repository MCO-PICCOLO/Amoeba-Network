import './SensorFanMatchingController.css';
import {
  type HTMLAttributes,
  useState,
  useCallback,
  useMemo,
  memo,
} from 'react';
import { CONTROL_MODE } from './VehicleArea';
import { postDeploy } from '../utils/RestApi';

type SensorFanMatchingType =
  | typeof CONTROL_MODE.SENSOR_1_FAN
  | typeof CONTROL_MODE.SENSOR_2_FAN
  | typeof CONTROL_MODE.INDIVIDUAL_MATCHING;

interface SensorFanMatchingControllerProps
  extends HTMLAttributes<HTMLDivElement> {
  type?: SensorFanMatchingType;
}

const SensorFanMatchingController = ({
  type,
  ...props
}: SensorFanMatchingControllerProps) => {
  const [safetyEnabled, setSafetyEnabled] = useState(false);
  const [sensitivity, setSensitivity] = useState('low');

  // useCallback으로 핸들러 메모이제이션
  const handleDeploy = useCallback(async () => {
    try {
      let sensors: string[] = [];

      if (type === CONTROL_MODE.SENSOR_1_FAN) {
        sensors = ['sensor1'];
      } else if (type === CONTROL_MODE.SENSOR_2_FAN) {
        sensors = ['sensor2'];
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
    } catch (error) {
      console.error('Deploy failed:', error);
    }
  }, [type, sensitivity, safetyEnabled]);

  // useMemo로 className 메모이제이션
  const typeClassName = useMemo(() => {
    if (type === CONTROL_MODE.SENSOR_1_FAN) {
      return 'sensor1';
    } else if (type === CONTROL_MODE.SENSOR_2_FAN) {
      return 'sensor2';
    } else if (type === CONTROL_MODE.INDIVIDUAL_MATCHING) {
      return 'mixed';
    }
    return '';
  }, [type]);

  return (
    <div id="sensor-fan-matching-controller" {...props}>
      <div className={`type-area ${typeClassName}`} />
      <div className="sensitivity-group">
        <div className="Sensitivity-text">Sensitivity</div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="sensitivity"
              value="low"
              checked={sensitivity === 'low'}
              onChange={(e) => setSensitivity(e.target.value)}
            />
            low
          </label>
          <label>
            <input
              type="radio"
              name="sensitivity"
              value="mid"
              checked={sensitivity === 'mid'}
              onChange={(e) => setSensitivity(e.target.value)}
            />
            mid
          </label>
          <label>
            <input
              type="radio"
              name="sensitivity"
              value="high"
              checked={sensitivity === 'high'}
              onChange={(e) => setSensitivity(e.target.value)}
            />
            high
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
  );
};

export default memo(SensorFanMatchingController);
