import { useCallback, useState } from 'react';
import './App.css';
import RuntimeMonitoring from './pages/RuntimeMonitoring';
import { postReset } from './utils/RestApi';

const App = () => {
  const [resetCount, setResetCount] = useState(0);
  const handleReset = useCallback(async () => {
    console.log('Reset button clicked! Starting reset process...');
    try {
      const result = await postReset();
      console.log('Reset API call successful:', result);
      setResetCount((prev) => {
        const newCount = prev + 1;
        console.log(`Reset count updated: ${prev} -> ${newCount}`);
        return newCount;
      });
      console.log('Reset process completed successfully!');
    } catch (e) {
      console.error('Failed to reset:', e);
    }
  }, []);
  return (
    <div className="App">
      <RuntimeMonitoring key={resetCount} />
      <div
        className="reset-button"
        onClick={() => handleReset()}
        // style={{ position: 'absolute' , left: 984, top: 107, cursor: 'pointer' }}
      />
    </div>
  );
};

export default App;
