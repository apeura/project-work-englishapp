import { useState } from "react";
import Alert from "../Alert";
import "../App.css";
import AdminTable from "../AdminTable";

function Admin() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [table, setTable] = useState(false); //table choice
  const [action, setAction] = useState(false); //action choise del add edit
  const [engWord, setEngWord] = useState("");
  const [fiWord, setFiWord] = useState("");

  const handleChoice = (table) => {
    // open admin panel
    setTable(true);
    // set table
    setSelectedTable(table);
  };

  const handleActionChoice = (action) => {
    console.log("action ", action);
    setAction(action);
  };
  const handleUpdateWordPair = (async) => {
    console.log("handleUpdateWordPair in use");
    
    let formattedEngWord = engWord.trim().toLowerCase();
    let formattedFiWord = fiWord.trim().toLowerCase();

    
  };

  const handleAddNewWordPair = async () => {
    console.log("handleAddNewPair in use");

    let formattedEngWord = engWord.trim().toLowerCase();
    let formattedFiWord = fiWord.trim().toLowerCase();

    try {
      const response = await fetch(
        // use set table
        `http://localhost:8080/api/${selectedTable}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // use set words
          body: JSON.stringify({
            eng_word: formattedEngWord,
            fi_word: formattedFiWord,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Adding new word pair:", engWord, fiWord);
        console.log(result);
      } else {
        console.error("Error adding new word pair:", response.status);
      }
    } catch (error) {
      console.error("Error adding new word pair:", error);
    }
    // close admin panel
    setTable(false);
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    //console.log("admin row data ", rowData);
  };

  // edit
  const getIdOrPlaceholder = () => {
    if (selectedRow !== null) {
      return selectedRow.id;
    } else {
      return "ID";
    }
  };
  const getEngOrPlaceholder = () => {
    if (selectedRow !== null) {
      return selectedRow.engWord;
    } else {
      return "English Word";
    }
  };
  const getFiOrPlaceholder = () => {
    if (selectedRow !== null) {
      return selectedRow.fiWord;
    } else {
      return "Finnish Word";
    }
  };

  return (
    <>
      <div></div>
      <h1>Admin Page</h1>
      <div className="card">
        <p>
          Here you can add, delete or update wordpairs for learning purposes.
          <br></br> Choose which table you'll be handling.
        </p>
        <button onClick={() => handleChoice("Animals")}>Animals</button>
        <button onClick={() => handleChoice("Colors")}>Colors</button>
        <button onClick={() => handleChoice("Locations")}>Locations</button>
        <button onClick={() => handleChoice("Jobs")}>Jobs</button>
        <button onClick={() => handleChoice("Foods")}>Foods</button>
      </div>

      <div className={`adminPanel ${table ? "" : "hidden"}`}>
        {" "}
        <h2>Chosen table: {selectedTable}</h2>
        <p className="grey">What would you like to do?</p>
        <button onClick={() => handleActionChoice("Add")}>Add</button>
        <button onClick={() => handleActionChoice("Edit")}>Edit</button>
        <button onClick={() => handleActionChoice("Delete")}>Delete</button>
        <div className={`addPanel ${action === "Add" ? "" : "hidden"}`}>
          <div>
            <input
              type="text"
              placeholder="english word"
              value={engWord}
              onChange={(e) => setEngWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="finnish word"
              value={fiWord}
              onChange={(e) => setFiWord(e.target.value)}
            />
          </div>

          <button
            id="adminButton"
            className="admin"
            onClick={handleAddNewWordPair}
            disabled={
              !(engWord.trim().length >= 2 && fiWord.trim().length >= 2)
            }
          >
            Add
          </button>
        </div>{" "}
        <div className={`editPanel ${action === "Edit" ? "" : "hidden"}`}>
          <div className="flex">
            <div>
              <h3>Which ID would you like to edit?</h3>
              <input type="text" placeholder={getIdOrPlaceholder()} disabled />
              <input
                type="text"
                value={engWord}
                placeholder={getEngOrPlaceholder()}
                onChange={(e) => setEngWord(e.target.value)}
              />
              <input
                type="text"
                value={fiWord}
                placeholder={getFiOrPlaceholder()}
                onChange={(e) => setFiWord(e.target.value)}
              />
            </div>
            <button
              id="adminButton"
              className="admin"
              onClick={handleUpdateWordPair}
              disabled={
                !(engWord.trim().length >= 2 && fiWord.trim().length >= 2)
              }
            >
              Update Word Pair
            </button>
          </div>
          <div className="flex">
            <AdminTable
              selectedTable={selectedTable}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
        <div className={`delPanel ${action === "Delete" ? "" : "hidden"}`}>
          <p>DEL PANEL</p>
        </div>
      </div>
      {/*       <Alert /> */}
      <p className="grey">
        word thing here?word thing here? word thing here? word thing here? word{" "}
      </p>
    </>
  );
}

export default Admin;
