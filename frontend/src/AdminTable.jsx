import { useState, useEffect } from "react";

const AdminTable = ({ selectedTable, onRowClick, onRowDelete }) => {
  const [words, setWords] = useState([]); // set words that are displayed on tables

  useEffect(() => {
    if (selectedTable !== null) {
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
    }
  }, [selectedTable, words]);

  const rowClick = (id, engWord, fiWord) => {
    onRowClick({ id, engWord, fiWord });
  };
  const handleRowDelete = (id) => {
    onRowDelete({ id });
  };
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
