import ChartsArea from '../components/ChartsArea';
import VehicleArea from '../components/VehicleArea';
import { getNetworkInfo } from '../utils/RestApi';
import './RuntimeMonitoring.css';
import { useEffect, useRef, useState } from 'react';

interface MCUStatus {
  status: 'on' | 'off';
  rtt: number;
}

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
  const [syncOffset1Data, setSyncOffset1Data] = useState({
    title: 'Sync Offset 1',
    value: Array(30).fill(0),
  });
  const [syncOffset2Data, setSyncOffset2Data] = useState({
    title: 'Sync Offset 2',
    value: Array(30).fill(0),
  });
  const [mcuStatus, setMcuStatus] = useState<MCUStatus[]>([
    { status: 'off', rtt: 0 }, // MCULess1
    { status: 'off', rtt: 0 }, // MCULess2
    { status: 'off', rtt: 0 }, // MCU1
    { status: 'off', rtt: 0 }, // MCU2
    { status: 'off', rtt: 0 }, // MCULess3
    { status: 'off', rtt: 0 }, // MCULess4
  ]);
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
        const offset1 = response?.NetworkInfo.Graph?.MCU1?.TimesyncOffset ?? 0;
        const offset2 = response?.NetworkInfo.Graph?.MCU2?.TimesyncOffset ?? 0;

        // MCU 상태 및 RTT 정보 업데이트
        const newMcuStatus: MCUStatus[] = [
          {
            status: response?.NetworkInfo.RttInfo?.MCULess1?.status ?? 'off',
            rtt: response?.NetworkInfo.RttInfo?.MCULess1?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo.RttInfo?.MCULess2?.status ?? 'off',
            rtt: response?.NetworkInfo.RttInfo?.MCULess2?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo.RttInfo?.MCU1?.status ?? 'off',
            rtt: response?.NetworkInfo.RttInfo?.MCU1?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo.RttInfo?.MCU2?.status ?? 'off',
            rtt: response?.NetworkInfo.RttInfo?.MCU2?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo.RttInfo?.MCULess3?.status ?? 'off',
            rtt: response?.NetworkInfo.RttInfo?.MCULess3?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo.RttInfo?.MCULess4?.status ?? 'off',
            rtt: response?.NetworkInfo.RttInfo?.MCULess4?.rtt ?? 0,
          },
        ];

        setDistanceData((prev) => ({
          ...prev,
          value: pushValue(prev.value, distance),
        }));
        setPWMDutyData((prev) => ({
          ...prev,
          value: pushValue(prev.value, duty),
        }));
        setSyncOffset1Data((prev) => ({
          ...prev,
          value: pushValue(prev.value, offset1),
        }));
        setSyncOffset2Data((prev) => ({
          ...prev,
          value: pushValue(prev.value, offset2),
        }));
        setMcuStatus(newMcuStatus);
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
      <VehicleArea mcuStatus={mcuStatus} />
      <ChartsArea
        distanceData={distanceData}
        pwmDutyData={pwmDutyData}
        syncOffset1Data={syncOffset1Data}
        syncOffset2Data={syncOffset2Data}
      />
    </div>
  );
};

export default RuntimeMonitoring;
