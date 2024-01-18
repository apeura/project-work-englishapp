import { useState, useEffect } from "react";
/**
 * Functional component representing an administrative table.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.selectedTable - The currently selected table name.
 * @param {Function} props.onRowClick - Handler for row click events.
 * @param {Function} props.onRowDelete - Handler for row delete events.
 * @returns {React.ReactElement} The rendered component.
 */
const AdminTable = ({ selectedTable, onRowClick, onRowDelete }) => {
  /**
   * State hook for managing the words displayed in the table.
   *
   * @type {Array}
   */
  const [words, setWords] = useState([]);

  /**
   * useEffect hook to fetch words from the API based on the selected table.
   * Updates the component state with the fetched words.
   *
   * @effect
   */
  useEffect(() => {
    if (selectedTable !== null) {
      /**
       * Async function to fetch words from the API and update the state.
       *
       * @async
       * @function
       * @returns {void}
       */
      const fetchWords = async () => {
        try {
          console.log("fetch effect: ", selectedTable);
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
    }
  }, [selectedTable, onRowClick]);

  /**
   * Handler for row click events.
   *
   * @function
   * @param {number} id - The ID of the clicked row.
   * @param {string} engWord - The English word of the clicked row.
   * @param {string} fiWord - The Finnish word of the clicked row.
   * @returns {void}
   */
  const rowClick = (id, engWord, fiWord) => {
    onRowClick({ id, engWord, fiWord });
  };
  /**
   * Handler for row delete events.
   *
   * @function
   * @param {number} id - The ID of the row to be deleted.
   * @returns {void}
   */
  const handleRowDelete = (id) => {
    onRowDelete({ id });
  };

  /**
   * Render method of the AdminTable component.
   * @returns {JSX.Element} - React element representing the AdminTable component.
   */
  return (
    <>
      <table className="admin">
        <thead>
          <tr>
            <th>Id</th>
            <th>English</th>
            <th>Finnish</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(words).map((word) => (
            <tr
              key={word.id}
              onClick={() => rowClick(word.id, word.eng_word, word.fi_word)}
            >
              <td>{word.id}</td>
              <td>{word.eng_word}</td>
              <td>{word.fi_word}</td>
              <td>
                {" "}
                <button onClick={() => handleRowDelete(word.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminTable;
