import { useState } from "react";
import "../App.css";
import { addNewWordPair } from "../../../backend/util.js";
import { PostRequest } from "../PostRequest";
function Admin() {
  const [selectedTable, setSelectedTable] = useState();
  const [submitted, setSubmitted] = useState(false); // submitted, for score display
  const [engWord, setEngWord] = useState("");
  const [fiWord, setFiWord] = useState("");

  const handleChoice = (table) => {
    // open admin panel
    setSubmitted(true);
    setSelectedTable(table);
  };

  const handleAddNewWordPair = () => {
    console.log("Adding new word pair:", engWord, fiWord);
    addNewWordPair(selectedTable, engWord, fiWord);

    // close admin panel
    //setSubmitted(false);
  };

  return (
    <>
      <div></div>
      <h1>Admin Page</h1>
      <div className="card">
        {/*         <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <p>
          Here you can Add new wordpairs for learning purposes.<br></br> Add to
          table:
        </p>
        <button onClick={() => handleChoice("Animals")}>Animals</button>
        <button onClick={() => handleChoice("Colors")}>Colors</button>
        <button onClick={() => handleChoice("Locations")}>Locations</button>
        <button onClick={() => handleChoice("Jobs")}>Jobs</button>
        <button onClick={() => handleChoice("Foods")}>Foods</button>
      </div>
      <div className={`adminPanel ${submitted ? "" : "hidden"}`}>
        <h2>Adding to table: {selectedTable}</h2>
        <div>
          <input
            type="text"
            id="eng_word"
            placeholder="english word"
            value={engWord}
            onChange={(e) => setEngWord(e.target.value)}
          />
          <input
            type="text"
            id="fi_word"
            placeholder="finnish word"
            value={fiWord}
            onChange={(e) => setFiWord(e.target.value)}
          />
        </div>
        <button className="admin" onClick={handleAddNewWordPair}>
          Add
        </button>
      </div>
      <p className="grey">
        <PostRequest />
        word thing here?word thing here? word thing here? word thing here? word{" "}
      </p>
    </>
  );
}

export default Admin;
