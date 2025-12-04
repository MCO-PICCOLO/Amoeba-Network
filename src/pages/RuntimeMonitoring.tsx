import ChartsArea from '../components/ChartsArea';
import MappingPopup from '../components/MappingPopup';
import VehicleArea from '../components/VehicleArea';
import { getNetworkInfo } from '../utils/RestApi';
// import { getNetworkInfo } from '../utils/RestApi';
// 샘플 데이터 반환 함수
const getSampleNetworkInfo = async () => {
  // Helper to randomly pick 'on' or 'off'
  const randStatus = () => (Math.random() > 0.5 ? 'on' : 'off') as 'on' | 'off';
  return {
    NetworkInfo: {
      'SW-less1': {
        status: randStatus(),
        distance: Math.random() * 100,
        rtt: Math.random() * 10,
      },
      'SW-less2': {
        status: randStatus(),
        distance: Math.random() * 100,
        rtt: Math.random() * 10,
      },
      'SW-less3': { status: randStatus() },
      'SW-less4': { status: randStatus() },
      MCU1: {
        status: randStatus(),
        rtt: Math.random() * 10,
        TimesyncOffset: Math.random() * 10,
      },
      MCU2: {
        status: randStatus(),
        rtt: Math.random() * 10,
        TimesyncOffset: Math.random() * 10,
      },
    },
  };
};
import './RuntimeMonitoring.css';
import { useEffect, useRef, useState } from 'react';

interface MCUStatus {
  status: 'on' | 'off';
  rtt: number;
}

interface RuntimeMonitoringProps {}

const RuntimeMonitoring = ({}: RuntimeMonitoringProps) => {
  const [distance1Data, setDistance1Data] = useState(Array(30).fill(0));
  const [distance2Data, setDistance2Data] = useState(Array(30).fill(0));
  const [rttMCU1Data, setRttMCU1Data] = useState(Array(30).fill(0));
  const [rttMCU2Data, setRttMCU2Data] = useState(Array(30).fill(0));
  const [rttSWLess1Data, setRttSWLess1Data] = useState(Array(30).fill(0));
  const [rttSWLess2Data, setRttSWLess2Data] = useState(Array(30).fill(0));
  const [syncOffset1Data, setSyncOffset1Data] = useState({
    title: 'Sync Offset 1',
    value: Array(30).fill(0),
  });
  const [syncOffset2Data, setSyncOffset2Data] = useState({
    title: 'Sync Offset 2',
    value: Array(30).fill(0),
  });
  const [syncOffsetMaxValue, setSyncOffsetMaxValue] = useState(250);
  const [mcuStatus, setMcuStatus] = useState<MCUStatus[]>([
    { status: 'off', rtt: 0 }, // SW-less1
    { status: 'off', rtt: 0 }, // SW-less2
    { status: 'off', rtt: 0 }, // MCU1
    { status: 'off', rtt: 0 }, // MCU2
    { status: 'off', rtt: 0 }, // SW-less3
    { status: 'off', rtt: 0 }, // SW-less4
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
        // const response = await getNetworkInfo();
        const response = await getSampleNetworkInfo();
        const offset1 = response?.NetworkInfo.MCU1?.TimesyncOffset ?? 0;
        const offset2 = response?.NetworkInfo.MCU2?.TimesyncOffset ?? 0;

        // MCU 상태 및 RTT 정보 업데이트
        const newMcuStatus: MCUStatus[] = [
          {
            status: response?.NetworkInfo['SW-less1']?.status ?? 'off',
            rtt: response?.NetworkInfo['SW-less1']?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo['SW-less2']?.status ?? 'off',
            rtt: response?.NetworkInfo['SW-less2']?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo.MCU1?.status ?? 'off',
            rtt: response?.NetworkInfo.MCU1?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo.MCU2?.status ?? 'off',
            rtt: response?.NetworkInfo.MCU2?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo['SW-less3']?.status ?? 'off',
            rtt: (response?.NetworkInfo['SW-less3'] as any)?.rtt ?? 0,
          },
          {
            status: response?.NetworkInfo['SW-less4']?.status ?? 'off',
            rtt: (response?.NetworkInfo['SW-less4'] as any)?.rtt ?? 0,
          },
        ];

        const distance1 = response?.NetworkInfo['SW-less1']?.distance ?? 0;
        const distance2 = response?.NetworkInfo['SW-less2']?.distance ?? 0;
        const rttMCU1 = response?.NetworkInfo.MCU1?.rtt ?? 0;
        const rttMCU2 = response?.NetworkInfo.MCU2?.rtt ?? 0;
        const rttSWLess1 = response?.NetworkInfo['SW-less1']?.rtt ?? 0;
        const rttSWLess2 = response?.NetworkInfo['SW-less2']?.rtt ?? 0;

        setDistance1Data((prev) => pushValue(prev, distance1));
        setDistance2Data((prev) => pushValue(prev, distance2));
        setRttMCU1Data((prev) => pushValue(prev, rttMCU1));
        setRttMCU2Data((prev) => pushValue(prev, rttMCU2));
        setRttSWLess1Data((prev) => pushValue(prev, rttSWLess1));
        setRttSWLess2Data((prev) => pushValue(prev, rttSWLess2));
        setSyncOffset1Data((prev) => ({
          ...prev,
          value: pushValue(prev.value, offset1),
        }));
        setSyncOffset2Data((prev) => ({
          ...prev,
          value: pushValue(prev.value, offset2),
        }));

        // Sync Offset Max Value 업데이트
        const currentMax = Math.max(offset1, offset2);
        setSyncOffsetMaxValue((prevMax) =>
          currentMax > prevMax ? currentMax : prevMax,
        );

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
        distanceChartData={{
          sensor1: distance1Data,
          sensor2: distance2Data,
        }}
        rttChartData={{
          mcu1: rttMCU1Data,
          mcu2: rttMCU2Data,
          swLess1: rttSWLess1Data,
          swLess2: rttSWLess2Data,
        }}
        syncOffsetChartData={{
          mcu1: syncOffset1Data.value,
          mcu2: syncOffset2Data.value,
        }}
        syncOffsetMaxValue={syncOffsetMaxValue}
      />
      {/* <MappingPopup style={{ top: 130, left: 224 }} /> */}
    </div>
  );
};

export default RuntimeMonitoring;
