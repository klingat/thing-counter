import { useState } from "react";
import styled from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";

const YELLOW = '#fffd82'
const BLUE = '#545A87'

const Button = styled.button`
  all: unset;
  padding: 2px 16px;
  border-radius: 4px;
  border: 1px solid ${YELLOW};
  color: ${YELLOW};
  &:hover {
    cursor: pointer;
    background: ${YELLOW};
    color: ${BLUE}; 
  }
`

const Grid = styled.div`
  padding: 10px;
  background: #2d3047;
  display: flex;
  flex-flow: wrap;
  gap: 8px;
  justify-content: center;
  max-height: 70vh;
  border-top: 1px solid ${YELLOW};
  border-bottom: 1px solid ${YELLOW};
  overflow: auto;
  margin: 10px 0 20px 0;
`;

const ClickableBox = styled.div`
box-sizing: border-box;
  min-width: 35px;
  min-height: 35px;
  max-height: 35px;
  max-width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: ${({ $isChecked }) => ($isChecked ? YELLOW : BLUE)};
  color: #2d3047;
  .material-symbols-outlined {
    font-size: 30px !important;
    font-weight: bold !important;
  }
  &:hover {
    cursor: pointer;
    border: 2px solid ${YELLOW};
  }
`;

const StyledInput = styled.input`
  background: none;
  border: 1px solid ${YELLOW};
  color: ${YELLOW};
  padding: 4px 8px;
  border: 1px solid ${YELLOW};
  border-radius: 4px;
  margin-left: 8px;
  font-size: 16px;
  width: 64px;
`
const Header = styled.header`
  width: 100%;
  padding: 0 20px;
`
const Footer = styled.footer`
  width: 100%;
  padding: 0 20px;
`

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
      const isChecked = countedThings.includes(i);
      boxes.push(
        <ClickableBox
          key={i}
          onClick={() => togglecountedThingsState(i)}
          $isChecked={isChecked}
        >
          {isChecked ? <span className="material-symbols-outlined">
            close
          </span>
            : ''}
        </ClickableBox>
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
      <Header>

      <h1>thing counter</h1>
      <label>How many things?</label>
      <StyledInput type="number" placeholder="Enter something" value={totalThings} onChange={(e) => setTotalThings(e.target.value)} />
      {!totalThings && <Button onClick={() => save()}>Save</Button>}
      <div>
        {countedThings.length} / {totalThings} - Completion:{" "}
        {renderCompletionPercentage()}
      </div>
      </Header>
      <div>{generateGrid()}</div>
      <Footer>
        <Button onClick={() => setAreYouSure(true)}>Reset</Button>
        {areYouSure &&
          <div>
            <Button onClick={() => reset()}>Yes</Button>
            <Button onClick={() => setAreYouSure(false)}>No</Button>
          </div>
        }
      </Footer>
    </div>
  );
};
