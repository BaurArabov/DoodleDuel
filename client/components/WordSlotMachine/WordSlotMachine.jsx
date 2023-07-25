import React, { useEffect, useState } from "react";

const words = [
  "airplane",
  "apple",
  "bus",
  "fish",
  "lion",
  "moon",
  "shoe",
  "spider",
  "train",
];

const WordSlotMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentWord, setCurrentWord] = useState("Ready to Spin!");

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const startSpinning = () => {
    setIsSpinning(true);
    setCurrentWord("Spinning...");

    const duration = Math.floor(Math.random() * 2000) + 2000;

    setTimeout(() => {
      setIsSpinning(false);
      setCurrentWord(getRandomWord());
    }, duration);
  };

  return (
    <div
      className="slot-machine"
      onClick={startSpinning}
      style={{ cursor: "pointer" }}
    >
      {isSpinning ? (
        <WordSlotMachineSpin />
      ) : (
        <div className="slot-machine">Draw: {currentWord}</div>
      )}
    </div>
  );
};

export default WordSlotMachine;

const WordSlotMachineSpin = () => {
  const [currentWord, setCurrentWord] = useState("Loading...");

  useEffect(() => {
    const getRandomWord = () => {
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    };

    const updateSlotMachine = () => {
      setCurrentWord(getRandomWord());
    };

    updateSlotMachine();

    const interval = setInterval(updateSlotMachine, 50);

    return () => clearInterval(interval);
  }, []);

  return <div className="slot-machine">Draw: {currentWord}</div>;
};
