import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [getInputValue, setInputValue] = useState(0);

  const handleChangeInput = (e) => {
    e.preventDefault();
    const textInput = e.target.value.trim();
    setInputValue(textInput);
  };

  const addAmount = () =>{
    dispatch(incrementByAmount(getInputValue))
    setInputValue("")
  }

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

        <input
          type="number"
          value={getInputValue}
          onChange={handleChangeInput}
        />
        <button
          aria-label="Increment value"
          onClick={() => addAmount()}
        >
          addMoreIncrement
        </button>
      </div>
    </div>
  );
}
