import { useState, useEffect } from "react";

const AdminTable = ({ selectedTable, onRowClick }) => {
  const [words, setWords] = useState([]); // set words that are displayed on tables

  useEffect(() => {
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
  }, [selectedTable]);

  const rowClick = (id, engWord, fiWord) => {
    //alert
    //console.log(`id ${id}, eng ${engWord}, fi ${fiWord}`);
    onRowClick({ id, engWord, fiWord });
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
              onClick={() => rowClick(word.id, word.eng_word, word.fi_word)}
              key={word.id}
            >
              <td>{word.id}</td>
              <td>{word.eng_word}</td>
              <td>{word.fi_word}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminTable;
