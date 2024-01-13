import { useState, useEffect } from "react";
import WordTable from "../WordTable";
import "../App.css";

const App = () => {
  const [filteredTables, setFilteredTables] = useState([]);
  const [clickedTag, setClickedTag] = useState([]);

  useEffect(() => {}, []);

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

  function randomTopic() {
    const topics = ["Animals", "Colors", "Locations", "Foods", "Jobs"];
    return topics[Math.floor(3 * Math.random())];
  }

  return (
    <>
      <div className="header"> </div>
      <h1>Learn English!</h1>
      <p className="grey">
        What would you like to study?<br></br> (All selected topics are shown,
        you may select several.)
      </p>
      {/* Tags */}
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
        <button className={`tag`} onClick={() => filterTables(randomTopic())}>
          Surprise me!
        </button>

        {/* Tables, which ones show is based on selected tags */}
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
