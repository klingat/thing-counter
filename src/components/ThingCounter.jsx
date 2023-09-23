import { useState } from "react";
import styled from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";

const Grid = styled.div`
  padding: 10px;
  background: #141414;
  display: flex;
  flex-flow: wrap;
  gap: 6px;
  justify-content: center;
`;

const ClickableBox = styled.div`
  min-width: 30px;
  min-height: 30px;
  background: ${({ $isChecked }) => ($isChecked ? "yellow" : "grey")};
  border-radius: 50%;
  &:hover {
    background: pink;
    cursor: pointer;
  }
`;

const INITIAL_VALUES = {
  countedThings: [],
  totalThings: 0,
}

export const ThingCounter = () => {
  const [areYouSure, setAreYouSure] = useState(false);
  const { storedValue: countedThings, setStoredValue: setCountedThings } = useLocalStorage('TC_COUNTED_THINGS', INITIAL_VALUES.countedThings);
  const { storedValue: totalThings, setStoredValue: setTotalThings } = useLocalStorage('TC_TOTAL_THINGS', INITIAL_VALUES.totalThings);

  const save = () => {
    console.log('save')
  }

  const togglecountedThingsState = (index) => {
    if (countedThings.includes(index)) {
      const newcountedThings = countedThings.filter((i) => i !== index);
      setCountedThings(newcountedThings);
    } else {
      setCountedThings([...countedThings, index]);
    }
  };

  const generateGrid = () => {
    const boxes = [];

    for (let i = 0; i < totalThings; i++) {
      boxes.push(
        <ClickableBox
          key={i}
          onClick={() => togglecountedThingsState(i)}
          $isChecked={countedThings.includes(i)}
        />,
      );
    }

    return <Grid>{boxes}</Grid>;
  };

  const reset = () => {
    setCountedThings(INITIAL_VALUES.countedThings);
    setTotalThings(INITIAL_VALUES.totalThings);
    setAreYouSure(false);
  }


  const renderCompletionPercentage = () => {
    if (totalThings) {
      const completionPercentage = ((countedThings.length / totalThings) * 100).toFixed(2)
      return (
        <span>
          {completionPercentage}%
        </span>
      )
    }
  }

  return (
    <div>
      <h1>thing counter</h1>
      <label>How many things?</label>
      <input type="number" placeholder="Enter something" value={totalThings} onChange={(e) => setTotalThings(e.target.value)} />
      {!totalThings && <button onClick={() => save()}>Save</button>}
      <div>
        {countedThings.length} / {totalThings} - Completion:{" "}
        {renderCompletionPercentage()}
      </div>
      <div>{generateGrid()}</div>
      <div>
        <button onClick={() => setAreYouSure(true)}>Reset</button>
        {areYouSure &&
          <div>
            <button onClick={() => reset()}>Yes</button>
            <button onClick={() => setAreYouSure(false)}>No</button>
          </div>
        }
      </div>
    </div>
  );
};
