import { useState, useEffect } from "react";

const WordTable = ({ selectedTable }) => {
  const [words, setWords] = useState([]); // set words that are displayed on tables
  const [userAnswers, setUserAnswers] = useState({}); // set user answers
  const [score, setScore] = useState(0); // set score for table
  const [submitted, setSubmitted] = useState(false); // submitted, for score display

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/${selectedTable}`
        );
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWords();
  }, [selectedTable]);

  // Answer intake and logging
  const handleAnswer = (wordId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      // add/update wordId's key to answer
      [wordId]: answer,
    }));
  };

  // Count score
  const handleSubmit = () => {
    // reduce() executes a "reducer" callback function on each element of the array.
    // The final result of running the reducer across all elements of the array is a single value.
    const newScore = words.reduce((score, word) => {
      // comparing trimmed & lowercased answer to fi_word, if correct score +1
      if (
        (userAnswers[word.id] !== undefined &&
          userAnswers[word.id].toLowerCase().trim()) === word.fi_word
      ) {
        return score + 1;
      }
      return score;
    }, 0);
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <>
      <div className="singleTable"><h2>{selectedTable}</h2>
        <table>
          <thead>
            
            <tr>
              <th>Word</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr key={word.id}>
                <td>{word.eng_word}</td>
                <td>
                  <input
                    type="text"
                    name={`field${word.id}`}
                    onChange={(e) => handleAnswer(word.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
        <div className="submitBox">
          <button onClick={handleSubmit}>Submit Answers</button>
          <div className={`score ${submitted ? "" : "hidden"}`}>
            SCORE: {score}
          </div>
        </div>
      </div>
    </>
  );
};

export default WordTable;
