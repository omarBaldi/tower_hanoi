import { useEffect, useState } from 'react';
import './App.css';

const DEFAULT_NUMBER_TOWERS = 3;

type Towers = Map<string, number[]>;

function App() {
  const [towers, setTowers] = useState<Towers>(new Map());

  /**
   * As soon as the component is mounted, I need to
   * create an initial state for the towers.
   */
  useEffect(() => {
    const initialStateTowers = [...Array(DEFAULT_NUMBER_TOWERS).keys()].reduce<
      [string, number[]][]
    >((acc, key: number) => {
      const towerKey = `tower-${key}`;
      const towerKeyValue: [string, number[]] = [towerKey, key === 0 ? [] : []];

      return [...acc, towerKeyValue];
    }, []);

    setTowers(new Map(initialStateTowers));
  }, []);

  return <div className='App'></div>;
}

export default App;
