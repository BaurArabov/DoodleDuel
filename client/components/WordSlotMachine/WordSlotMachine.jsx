import { Button } from "@mui/material";
import React, { useState } from "react";
import ObjectToDraw from "../ObjectToDraw/ObjectToDraw";
import "./WordSlotMachine.css";

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
  const [currentWord, setCurrentWord] = useState("");

  const [revealedWord, setRevealedWord] = useState("");
  const [isPlay, setPlay] = useState(false);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const startSpinning = () => {
    setIsSpinning(true);
    setRevealedWord(""); // Reset revealedWord when spinning starts

    const duration = Math.floor(Math.random() * 1500);

    setTimeout(() => {
      setIsSpinning(false);
      const newWord = getRandomWord();
      setCurrentWord(newWord);
      setRevealedWord(newWord); // Set revealedWord when spinning stops
    }, duration);
  };

  const handleCategoryClick = (selectedWord) => {
    if (!isSpinning) {
      setCurrentWord(selectedWord);
      setRevealedWord(selectedWord);
    }
  };

  const handlePlay = () => {
    setPlay(true);
  };

  return !isPlay ? (
    <div className="slot-machine">
      <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
        Click randomize button to get a category, or select it yourself
      </h3>

      <div style={{ display: "flex" }}>
        <div className="slot-machine-images">
          {words.map((word) => (
            <img
              key={word}
              src={`../../assets/${word}.png`} // Replace with your image URLs for each category
              alt={word}
              className={
                revealedWord === word
                  ? "revealed"
                  : isSpinning
                  ? "spinning"
                  : ""
              }
              onClick={() => handleCategoryClick(word)}
            />
          ))}
        </div>
        <div className="slot-machine-content">
          <div className="slot-machine-words">Draw: {currentWord}</div>
          <div className="slot-machine-buttons">
            <Button onClick={startSpinning} disabled={isSpinning}>
              {isSpinning ? "Spinning..." : "Randomize"}
            </Button>
            <Button disabled={!revealedWord} onClick={handlePlay}>
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ObjectToDraw currentWord={currentWord} />
  );
};

export default WordSlotMachine;
