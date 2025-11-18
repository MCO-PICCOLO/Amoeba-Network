import ChartsArea from '../components/ChartsArea';
import VehicleArea from '../components/VehicleArea';
import './RuntimeMonitoring.css';
import { useEffect, useRef } from 'react';
import { getNetworkInfo } from '../utils/RestApi';
import { useState } from 'react';

interface RuntimeMonitoringProps {}

const RuntimeMonitoring = ({}: RuntimeMonitoringProps) => {
  const [distanceData, setDistanceData] = useState({
    title: 'Distance',
    value: Array(30).fill(0),
  });
  const [pwmDutyData, setPWMDutyData] = useState({
    title: 'PWM Duty',
    value: Array(30).fill(0),
  });
  const [syncOffsetData, setSyncOffsetData] = useState({
    title: 'Sync Offset',
    value: Array(30).fill(0),
  });
  const timerRef = useRef<number | null>(null);

  const pushValue = (arr: number[], newValue: number) => {
    const next = [...arr, newValue];
    return next.length > 30 ? next.slice(next.length - 30) : next;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchLoop = async () => {
      if (!isMounted) return;
      try {
        const response = await getNetworkInfo();
        const distance = response?.NetworkInfo.Graph?.MCULess1?.distance ?? 0;
        const duty = response?.NetworkInfo.Graph?.MCULess3?.duty ?? 0;
        const offset = response?.NetworkInfo.Graph?.MCU1?.TimesyncOffset ?? 0;

        setDistanceData((prev) => ({
          ...prev,
          value: pushValue(prev.value, distance),
        }));
        setPWMDutyData((prev) => ({
          ...prev,
          value: pushValue(prev.value, duty),
        }));
        setSyncOffsetData((prev) => ({
          ...prev,
          value: pushValue(prev.value, offset),
        }));
      } catch (e) {
        // 에러 처리
      }
      if (isMounted) {
        timerRef.current = setTimeout(fetchLoop, 1000);
      }
    };
    fetchLoop();
    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div id="runtime-monitoring">
      <VehicleArea />
      <ChartsArea
        distanceData={distanceData}
        pwmDutyData={pwmDutyData}
        syncOffsetData={syncOffsetData}
      />
    </div>
  );
};

export default RuntimeMonitoring;
