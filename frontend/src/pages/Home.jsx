import { useState, useEffect } from "react";
import WordTable from "../WordTable";

import clovers from "../assets/cube.png";
import "../App.css";
 

const App = () => {
  // tag selection visual change
  const [selectedTag, setSelectedTag] = useState(false);
  //word tables
  const [filteredTables, setFilteredTables] = useState([]);

 useEffect(() => {


 }, []);

  const filterTables = (table) => {
    // if table already selected, remove
    if (filteredTables.includes(table)) {
      setFilteredTables(filteredTables.filter((t) => t !== table));
    } else {
      /*     else if (filteredTables) {
      console.log(filteredTables);
    } */
      // if not in visible tables, add to it
      setFilteredTables([...filteredTables, table]);
    }
  };

  //troubleshooting
  //console.log(filteredTables);

  function randomTopic() {
    const topics = ["Animals", "Colors", "Locations", "Foods", "Jobs"];
    console.log(topics[Math.floor(5 * Math.random())]);
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
          className={`tag ${selectedTag ? "active" : ""}`}
          style={{ backgroundColor: selectedTag ? "#18a753" : "" }}
          onClick={() => filterTables("Animals")}
        >
          Animals
        </button>
        <button
          className={`tag ${selectedTag ? "active" : ""}`}
          style={{ backgroundColor: selectedTag ? "red" : "" }}
          onClick={() => filterTables("Colors")}
        >
          Colors
        </button>
        <button
          className={`tag ${selectedTag ? "active" : ""}`}
          style={{ backgroundColor: selectedTag ? "red" : "" }}
          onClick={() => filterTables("Locations")}
        >
          Locations
        </button>

        <button
          className={`tag ${selectedTag ? "active" : ""}`}
          style={{ backgroundColor: selectedTag ? "red" : "" }}
          onClick={() => filterTables("Jobs")}
        >
          Jobs
        </button>
        <button
          className={`tag ${selectedTag ? "active" : ""}`}
          style={{ backgroundColor: selectedTag ? "red" : "" }}
          onClick={() => filterTables("Foods")}
        >
          Foods
        </button>
        <br></br>
        <button
          className={`tag ${selectedTag ? "active" : ""}`}
          style={{ backgroundColor: selectedTag ? "red" : "" }}
          onClick={() => filterTables(randomTopic())}
        >
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
