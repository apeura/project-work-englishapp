import { useState } from "react";
import "../App.css";
import AdminTable from "../AdminTable";

/**
 * Functional component representing the Admin page.
 * @component
 */
function Admin() {
  /**
   * State hook to manage the selected table for Admin operations.
   * @type {[string | null, Function]}
   */
  const [selectedTable, setSelectedTable] = useState(null);
  /**
   * State hook to manage the table choice for Admin operations.
   * @type {[boolean | null, Function]}
   */
  const [table, setTable] = useState(null);
  /**
   * State hook to manage the selected row for Admin operations.
   * @type {[number | null, Function]}
   */
  const [selectedRow, setSelectedRow] = useState(null);
  /**
   * State hook to manage the selected action (add, edit, delete) for Admin operations.
   * @type {[boolean, Function]}
   */
  const [action, setAction] = useState(false);
  /**
   * State hook to manage the English word for Admin operations.
   * @type {[string, Function]}
   */
  const [engWord, setEngWord] = useState("");
  /**
   * State hook to manage the Finnish word for Admin operations.
   * @type {[string, Function]}
   */
  const [fiWord, setFiWord] = useState("");
  /**
   * State hook to manage the ID for Admin operations.
   * @type {[string, Function]}
   */
  const [id, setId] = useState("");

  /**
   * Function to handle the choice of a table for Admin operations.
   * @param {string} table - The selected table.
   * @returns {void}
   */
  const handleChoice = (table) => {
    setTable(true);
    setSelectedTable(table);
  };

  /**
   * Function to handle the choice of an action (add, edit, delete) for Admin operations.
   * @param {boolean} action - The selected action.
   * @returns {void}
   */
  const handleActionChoice = (action) => {
    console.log("action ", action);
    setAction(action);
  };
  /**
   * Handles the update of a word pair in the selected table.
   * Sends a PUT request to update the word pair with new English and Finnish words.
   * Displays alerts based on the success or failure of the update operation.
   * @returns {void}
   */
  const handleUpdateWordPair = async () => {
    // Trim and convert English and Finnish words to lowercase
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
    // Close Admin panel.
    setTable(false);
  };
  /**
   * Handles the addition of a new word pair to the selected table.
   * Sends a POST request to add a new word pair with English and Finnish words.
   * Displays alerts based on the success or failure of the addition operation.
   * @returns {void}
   */
  const handleAddNewWordPair = async () => {
    // Trim and convert English and Finnish words to lowercase
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
    // Close Admin panel.
    setTable(false);
  };
  /**
   * Handles the deletion of a word pair from the selected table.
   * Sends a DELETE request to remove the word pair with the specified ID.
   * Displays alerts based on the success or failure of the deletion operation.
   * @returns {void}
   */
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
    // Close Admin panel.
    setTable(false);
  };
  /**
   * Handles the click event on a table row.
   * Sets the selected row data.
   * @param {Object} rowData - Data of the clicked table row.
   * @returns {void}
   */
  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
  };

  /**
   * Returns the ID of the selected row or a placeholder if no row is selected.
   * @returns {string} - ID or placeholder string.
   */
  const getIdOrPlaceholder = () => {
    if (selectedRow !== null) {
      return selectedRow.id;
    } else {
      return "ID";
    }
  };
  /**
   * Returns the English word of the selected row or a placeholder if no row is selected.
   * @returns {string} - English word or placeholder string.
   */
  const getEngOrPlaceholder = () => {
    if (selectedRow !== null) {
      return selectedRow.engWord;
    } else {
      return "English Word";
    }
  };
  /**
   * Returns the Finnish word of the selected row or a placeholder if no row is selected.
   * @returns {string} - Finnish word or placeholder string.
   */
  const getFiOrPlaceholder = () => {
    if (selectedRow !== null) {
      return selectedRow.fiWord;
    } else {
      return "Finnish Word";
    }
  };

  /**
   * Render method of the App component.
   * @returns {JSX.Element} The JSX element representing the Admin Page.
   */
  return (
    <>
      <h1>Admin Page</h1>
      <div className="card">
        <p>
          Here you can add, delete or update wordpairs for learning purposes.
          <br></br> Choose below which table you&apos;ll be handling.
        </p>
        {/* Table buttons. */}
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
        {/* Action buttons. */}
        <button onClick={() => handleActionChoice("Add")}>Add</button>
        <button onClick={() => handleActionChoice("Edit")}>Edit</button>
        <button onClick={() => handleActionChoice("Delete")}>Delete</button>
        {/* Add panel. */}
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
        {/* Edit panel. */}
        <div className={`editPanel ${action === "Edit" ? "" : "hidden"}`}>
          <div className="flex">
            <div>
              <h3>
                Click on the table to select which word pair you&apos;d like to
                edit.
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
        {/* Delete panel. */}
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
