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
      const towerKeyValue: [string, number[]] = [
        towerKey,
        key === 0 ? [...Array(5)].map((_, index: number) => 5 - index) : [],
      ];

      return [...acc, towerKeyValue];
    }, []);

    setTowers(new Map(initialStateTowers));
  }, []);

  return (
    <div className='App'>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${DEFAULT_NUMBER_TOWERS}, minmax(200px, 200px))`,
          gap: '5rem',
        }}
      >
        {[...towers].map(([towerId, towerItems]: [string, number[]], _: number) => {
          return (
            <div key={towerId} style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className='towerStick'
                style={{
                  height: '400px',
                  width: '2px',
                  backgroundColor: 'red',
                  borderTopRightRadius: '3px',
                  borderTopLeftRadius: '3px',
                  position: 'relative',
                }}
              >
                {towerItems.map((item: number, index: number) => {
                  return (
                    <div
                      key={`item-${item}-towerId-${towerId}`}
                      style={{
                        height: '50px',
                        width: `calc(${item} * 2rem)`,
                        backgroundColor: 'orange',
                        borderRadius: '3px',
                        border: '1px solid',
                        position: 'absolute',
                        //* the bottom position will be calculated
                        //* using the item height (50px) + the border px
                        //* value multiplied by the element index
                        //* in order to stack them on top of another
                        bottom: `calc(((50px + 1px) * ${index}))`,
                        left: '50%',
                        //? no need to use translate (only X or Y)
                        transform: 'translate(-50%, 0)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
