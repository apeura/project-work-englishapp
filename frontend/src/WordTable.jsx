import { useState, useEffect } from "react";

/**
 * React component representing a table for words.
 * @component
 * @param {Object} props - React component props.
 * @param {string} props.selectedTable - The selected table for fetching words.
 * @returns {JSX.Element} - React element representing the WordTable component.
 */
const WordTable = ({ selectedTable }) => {
  /**
   * State hook to manage the words displayed on the table.
   * @type {[Array<Object>, Function]}
   */
  const [words, setWords] = useState([]);
  /**
   * State hook to manage user answers.
   * @type {[Object, Function]}
   */
  const [userAnswers, setUserAnswers] = useState({});
  /**
   * State hook to manage the score for the table.
   * @type {[number, Function]}
   */
  const [score, setScore] = useState(0);
  /**
   * State hook to track whether answers have been submitted.
   * @type {[boolean, Function]}
   */
  const [submitted, setSubmitted] = useState(false);

  /**
   * useEffect hook to fetch words from the API based on the selected table.
   */
  useEffect(() => {
    /**
     * Async function to fetch words from the API and update the state.
     * If the fetched data contains more than 8 items, it shuffles the data and selects the first 8.
     * @returns {void}
     */
    const fetchWords = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/${selectedTable}`
        );
        const data = await response.json();
        if (data.length > 8) {
          const shuffledData = data.sort(() => Math.random() - 0.5);
          const selectedWords = shuffledData.slice(0, 8);
          setWords(selectedWords);
        } else {
          setWords(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWords();
  }, [selectedTable]);

  /**
   * Function to handle user answers for each word.
   * @param {number} wordId - The ID of the word.
   * @param {string} answer - The user's answer for the word.
   * @returns {void}
   */
  const handleAnswer = (wordId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [wordId]: answer,
    }));
  };

  /**
   * Function to calculate and set the score based on user answers.
   * @returns {void}
   */
  const handleSubmit = () => {
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

  /**
   * Render method of the WordTable component.
   * @returns {JSX.Element} - React element representing the WordTable component.
   */
  return (
    <>
      <div className="singleTable">
        <h2>{selectedTable}</h2>
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
