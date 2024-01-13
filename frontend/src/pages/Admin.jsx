import { useState, useEffect } from "react";
import "../App.css";
import AdminTable from "../AdminTable";

function Admin() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [table, setTable] = useState(null); //table choice
  const [selectedRow, setSelectedRow] = useState(null);
  const [action, setAction] = useState(false); //action choise del add edit
  const [engWord, setEngWord] = useState("");
  const [fiWord, setFiWord] = useState("");
  const [id, setId] = useState("");

 useEffect(() => {}, []);

  const handleChoice = (table) => {
    setTable(true);
    setSelectedTable(table);
  };



  const handleActionChoice = (action) => {
    console.log("action ", action);
    setAction(action);
  };

  const handleUpdateWordPair = async () => {
    let formattedEngWord = engWord.trim().toLowerCase();
    let formattedFiWord = fiWord.trim().toLowerCase();

    try {
      const response = await fetch(
        `http://localhost:8080/api/${selectedTable}/${selectedRow.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eng_word: formattedEngWord,
            fi_word: formattedFiWord,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert(
          `Word pair with id ${selectedRow.id} updated in table ${selectedTable}!`
        );
      } else {
        console.error("Error editing word pair:", response.status);
        alert(`Unable to update word pair in table ${selectedTable}!`);
      }
    } catch (error) {
      console.error("Error editing word pair:", error);
    }
    setTable(false);
  };

  const handleAddNewWordPair = async () => {
    let formattedEngWord = engWord.trim().toLowerCase();
    let formattedFiWord = fiWord.trim().toLowerCase();

    try {
      const response = await fetch(
        `http://localhost:8080/api/${selectedTable}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eng_word: formattedEngWord,
            fi_word: formattedFiWord,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert(
          `New word pair ${formattedEngWord} & ${formattedFiWord} added to ${selectedTable}!`
        );
      } else {
        console.error("Error adding new word pair:", response.status);
        alert(`Unable to add new word pair to table ${selectedTable}!`);
      }
    } catch (error) {
      console.error("Error adding new word pair:", error);
    }
    setTable(false);
  };

  const handleDeleteWordPair = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/${selectedTable}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert(`Word pair with id ${id} deleted!`);
      } else {
        console.error("Error deleting word pair:", response.status);
        alert(`Unable to delete word pair in table ${id}!`);
      }
    } catch (error) {
      console.error("Error deleting new word pair:", error);
    }
    setTable(false);
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    //console.log("admin row data ", rowData);
  };

  // edit del
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
          <br></br> Choose which table you`&apos;`ll be handling.
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
          <h3>Given words will be added to {selectedTable}: </h3>
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
            id="addButton"
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
              <h3>
                Click on the table to select which word pair you`&apos;`d like
                to edit.
              </h3>
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
              id="editButton"
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
          <div className="flex">
            <div>
              <h3>Type the ID of the word pair you wish to delete: </h3>
              <input type="text" onChange={(e) => setId(e.target.value)} />
            </div>
            <p className={`delPanel ${id !== "" ? "" : "hidden"}`}>
              Delete word pair with id {id}?
            </p>
            <button
              id="delButton"
              className="admin"
              onClick={handleDeleteWordPair}
              disabled={!(id.trim().length >= 1 && id.trim().length <= 2)}
            >
              Delete
            </button>
          </div>
          <div className="flex">
            <AdminTable
              selectedTable={selectedTable}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
