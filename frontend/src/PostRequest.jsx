import React from "react";

class PostRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: null,
    };
  }

  componentDidMount() {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eng_word: "test", fi_word: "testi" }),
    };
    fetch("http://localhost:8080/api/Jobs", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  }

  render() {
    const { postId } = this.state;
    return (
      <div className="card text-center m-3">
        <h5 className="card-header">Simple POST Request</h5>
        <div className="card-body">Returned Id: {postId}</div>
      </div>
    );
  }
}

export { PostRequest };
