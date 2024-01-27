import React, { useState, useEffect, useRef } from "react";
import "../PomodoroTimer.css";
import alarmSoundFile from "../sounds/alarm.wav";

function Timer() {
  // State variables
  const [workTime, setWorkTime] = useState(25 * 60); // Default 25 minutes
  const [breakTime, setBreakTime] = useState(5 * 60); // Default 5 minutes
  const [secondsLeft, setSecondsLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const [alarmSound] = useState(new Audio(alarmSoundFile)); // Use the imported sound file
  const alarmSoundRef = useRef(alarmSound);

  // Timer control functions
  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setSecondsLeft(workTime);
    setIsActive(false);
    setOnBreak(false);
  };

  // Form input handlers
  const handleWorkTimeChange = (e) => {
    const newWorkTime = Math.max(1, e.target.value) * 60; // Prevents negative or zero values
    setWorkTime(newWorkTime);
    if (!onBreak) {
      setSecondsLeft(newWorkTime);
    }
  };

  const handleBreakTimeChange = (e) => {
    const newBreakTime = Math.max(1, e.target.value) * 60; // Prevents negative or zero values
    setBreakTime(newBreakTime);
    if (onBreak) {
      setSecondsLeft(newBreakTime);
    }
  };

  useEffect(() => {
    let interval = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      alarmSoundRef.current.play();
      setOnBreak(!onBreak);
      setSecondsLeft(onBreak ? workTime : breakTime);
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, onBreak, workTime, breakTime]);

  // Format time for display
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  return (
    <div className='PomodoroTimer'>
      <h2>Pomodoro Timer</h2>
      <div id='timer-settings'>
        <label>
          Work Time (minutes):
          <input
            type='number'
            value={workTime / 60}
            onChange={handleWorkTimeChange}
          />
        </label>
        <label>
          Break Time (minutes):
          <input
            type='number'
            value={breakTime / 60}
            onChange={handleBreakTimeChange}
          />
        </label>
      </div>
      <div id='timer-display'>{formatTime(secondsLeft)}</div>
      <div id='timer-controls'>
        {!isActive && secondsLeft === workTime && (
          <button onClick={startTimer}>Start</button>
        )}
        {isActive && <button onClick={pauseTimer}>Pause</button>}
        {!isActive && secondsLeft !== workTime && (
          <button onClick={startTimer}>Resume</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div id='session-type'>{onBreak ? "Break Time" : "Work Time"}</div>
    </div>
  );
}

export default Timer;
