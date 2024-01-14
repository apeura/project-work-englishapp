import { useState } from "react";
import WordTable from "../WordTable";
import "../App.css";

/**
 * React component representing the main application.
 * @component
 */
const App = () => {
  /**
   * State hook to manage filtered tables based on selected tags.
   * @type {[Array<string>, Function]}
   */
  const [filteredTables, setFilteredTables] = useState([]);
  /**
   * State hook to track clicked tags for filtering tables.
   * @type {[Array<string>, Function]}
   */
  const [clickedTag, setClickedTag] = useState([]);

  /**
   * Function to toggle and filter tables based on selected tags.
   * @param {string} table - The table (tag) to filter.
   * @returns {void}
   */
  const filterTables = (table) => {
    if (clickedTag.includes(table)) {
      setClickedTag(clickedTag.filter((clickedTag) => clickedTag !== table));
    } else {
      setClickedTag([...clickedTag, table]);
    }

    if (filteredTables.includes(table)) {
      setFilteredTables(filteredTables.filter((t) => t !== table));
    } else {
      setFilteredTables([...filteredTables, table]);
    }
  };
  /**
   * Function to generate a random topic from predefined options.
   * @returns {string} - Randomly selected topic.
   */
  function randomTopic() {
    const topics = ["Animals", "Colors", "Locations", "Foods", "Jobs"];
    return topics[Math.floor(5 * Math.random())];
  }
  /**
   * Function to toggle and filter tables based on selected tags.
   * @param {string} table - The table (tag) to filter.
   * @returns {void}
   */
  const handleSurprise = () => {
    setFilteredTables([]);
    filterTables(randomTopic());
  };
  /**
   * Render method of the App component.
   * @returns {JSX.Element} - React element representing the App component.
   */
  return (
    <>
      <div className="header"> </div>
      <h1>Learn English!</h1>
      <p className="grey">
        What would you like to study?<br></br> (All selected topics are shown,
        you may select several.)
      </p>
      {/* Tag buttons to select topics */}
      <div>
        <button
          className={clickedTag.includes("Animals") ? "tag clicked" : "tag"}
          onClick={() => filterTables("Animals")}
        >
          Animals
        </button>
        <button
          className={clickedTag.includes("Colors") ? "tag clicked" : "tag"}
          onClick={() => filterTables("Colors")}
        >
          Colors
        </button>
        <button
          className={clickedTag.includes("Locations") ? "tag clicked" : "tag"}
          onClick={() => filterTables("Locations")}
        >
          Locations
        </button>

        <button
          className={clickedTag.includes("Jobs") ? "tag clicked" : "tag"}
          onClick={() => filterTables("Jobs")}
        >
          Jobs
        </button>
        <button
          className={clickedTag.includes("Foods") ? "tag clicked" : "tag"}
          onClick={() => filterTables("Foods")}
        >
          Foods
        </button>
        <br></br>
        <button className={`tag`} onClick={() => handleSurprise()}>
          Surprise me!
        </button>

        {/* Tables, rendered based on selected tags.*/}
        <div className="tables">
          {filteredTables.map((table) => (
            <WordTable key={table} selectedTable={table} />
          ))}
        </div>
      </div>
    </>
  );
};
export default App;
