import React, { useEffect, useRef, useState } from 'react';
import { preventDefault } from './helpers/prevent-default';
import { recursivelyCheckDataAttibute } from './utils/check-data-attribute';
import './App.css';

const DEFAULT_NUMBER_TOWERS = 3;

type Towers = Map<string, number[]>;

/**
 * TODO: keep track of the user moves through the whole game and the time
 */
function App() {
  const [towers, setTowers] = useState<Towers>(new Map());
  const [userWon, setUserWon] = useState<boolean>(false);
  const towerItemDraggedFrom = useRef<string | null>(null);

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

  const handleItemDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const towerId = recursivelyCheckDataAttibute({
      currentElement: e.target as HTMLDivElement,
      dataAttributeKey: 'towerId',
    });

    if (towerId) {
      towerItemDraggedFrom.current = towerId;
    }
  };

  const handleItemDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    const { dataset } = e.target as HTMLDivElement;
    const { towerId: arrivalTowerId } = dataset;
    const departureTowerId = towerItemDraggedFrom.current;

    if (typeof arrivalTowerId === 'undefined' || !departureTowerId) return;

    setTowers((prevTowers) => {
      const updatedTowers = new Map(prevTowers);

      const departureTowerPrevItems: number[] = updatedTowers.get(departureTowerId) ?? [];
      const lastItem: number | undefined = departureTowerPrevItems.pop();
      if (typeof lastItem === 'undefined') return prevTowers;

      const arrivalTowerPrevItems: number[] = updatedTowers.get(arrivalTowerId) ?? [];
      updatedTowers.set(arrivalTowerId, [...arrivalTowerPrevItems, lastItem]);

      return updatedTowers;
    });
  };

  //* as soon as the third column will have all of the items (5)
  //* the user has finished playing the game
  useEffect(() => {
    const towersSize: number = towers.size;
    const [, lastTowerItems] = [...towers][towersSize - 1] ?? [];

    if (Array.isArray(lastTowerItems) && lastTowerItems.length >= 5) {
      setUserWon(true);
    }
  }, [towers]);

  return (
    <div className='App'>
      {userWon ? (
        <React.Fragment>
          <h1>Congrats! You finished the game!</h1>
        </React.Fragment>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${DEFAULT_NUMBER_TOWERS}, minmax(200px, 200px))`,
            gap: '5rem',
          }}
        >
          {[...towers].map(([towerId, towerItems]: [string, number[]], _: number) => {
            return (
              <div
                key={towerId}
                onDrop={handleItemDrop}
                onDragOver={preventDefault}
                data-tower-id={towerId}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
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
                  {towerItems.map(
                    (item: number, index: number, arr: typeof towerItems) => {
                      const isFirstItemOnStack = index === arr.length - 1;

                      return (
                        <div
                          key={`item-${item}-towerId-${towerId}`}
                          draggable={isFirstItemOnStack}
                          onDragStart={handleItemDrag}
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
                            cursor: isFirstItemOnStack ? 'grab' : 'not-allowed',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {item}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
