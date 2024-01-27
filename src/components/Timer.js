import React, { useState, useEffect } from "react";
import "../PomodoroTimer.css";
const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [minutes, setMinutes] = useState(workMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(workMinutes);
    setSeconds(0);
  };

  const addWorkTime = () => {
    setWorkMinutes((prevWorkMinutes) => prevWorkMinutes + 1);
    if (!isActive) {
      setMinutes((prevMinutes) => prevMinutes + 1);
    }
  };

  const subtractWorkTime = () => {
    if (workMinutes > 1) {
      setWorkMinutes((prevWorkMinutes) => prevWorkMinutes - 1);
      if (!isActive) {
        setMinutes((prevMinutes) => prevMinutes - 1);
      }
    }
  };

  const addBreakTime = () => {
    setBreakMinutes((prevBreakMinutes) => prevBreakMinutes + 1);
  };

  const subtractBreakTime = () => {
    if (breakMinutes > 1) {
      setBreakMinutes((prevBreakMinutes) => prevBreakMinutes - 1);
    }
  };

  return (
    <div className="pomodoro-container">
      <div className="timer-display">
        <p>{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`}</p>
      </div>
      <div className="control-buttons">
        <button onClick={startTimer} disabled={isActive}>
          ▶️
        </button>
        <button onClick={pauseTimer} disabled={!isActive}>
          ⏸️
        </button>
        <button onClick={resetTimer}>⏹️</button>
      </div>
      <div className="settings-section">
        <p>Work Time: {workMinutes} minutes</p>
        <button onClick={addWorkTime}>+</button>
        <button onClick={subtractWorkTime}>-</button>
        <p>Break Time: {breakMinutes} minutes</p>
        <button onClick={addBreakTime}>+</button>
        <button onClick={subtractBreakTime}>-</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
