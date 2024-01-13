function Info() {
  return (
    <>
      <h1>The Info Page</h1>
      <div>
        <div>
          <h2>About this project</h2>{" "}
          <p>
            {" "}
            This project is a part of TAMK's Fall 2023 backend module. <br></br>
            The goal of this project is to make a full stack application.
          </p>
        </div>{" "}
        <h2>Stats/Specs</h2>
        <div className="infoPanel">
          <span className="tables">
            <table className="flex">
              <thead>
                <h3>Tech</h3>
              </thead>
              <tr>
                <span className="bold">Frontend:</span> React + Vite
              </tr>
              <tr>
                <span className="bold">Backend:</span> Express/Node.js
              </tr>
              <tr>
                <span className="bold">Database:</span> MySQL
              </tr>
              <tr>
                <span className="bold">Cloud:</span> Render.com
              </tr>
              <tr>
                <span className="bold">Also utilizing:</span> Docker
              </tr>
            </table>{" "}
            <table className="flex">
              <thead>
                <h3>Creator:</h3>
              </thead>
              Anni Peura
              <thead>
                <h3>Worked hours:</h3>
              </thead>
              Estimate: many(?)
              <thead>
                <h3>Last update:</h3>
              </thead>
              13.01.2024
            </table>
          </span>
        </div>
      </div>
    </>
  );
}

export default Info;
