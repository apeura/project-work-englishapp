/* // backend stuff
export const addNewWordPair = async (table, user_eng_word, user_fi_word) => {
  console.log(`table ${table} eng ${user_eng_word} fi ${user_fi_word}`)
  //console.log(`http://localhost:8080/api/${table}`);

  try {
    const response = await fetch(`http://localhost:8080/api/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eng_word: user_eng_word,
        fi_word: user_fi_word
      }),
    });
        const done = await response.json();
        return done;
  } catch (error) {
    console.error("Error adding new word pair:", error);
    throw error;
  }
}; */