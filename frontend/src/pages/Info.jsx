/**
 * Info component representing the information page of the application.
 * This component displays information about the project.
 *
 * @returns {JSX.Element} The JSX element representing the Info page.
 */
function Info() {
  return (
    <>
      <h1>The Info Page</h1>
      <div>
        <div>
          <h2>About this project</h2>{" "}
          <p>
            {" "}
            This project is a part of TAMK&apos;s Fall 2023 backend module.{" "}
            <br></br>
            The goal of this project is to make a full stack application.
          </p>
          <p className="infoLink">
            <a href="https://github.com/apeura/project-work-englishapp">
              GitHub repo
            </a>
          </p>
        </div>{" "}
        <h2>Stats/Specs</h2>
        <div className="infoPanel">
          <div className="tables">
            <div className="flex">
              <h3>Tech</h3>
              <div>
                <span className="bold">Frontend:</span> <span>React + Vite</span>
              </div>
              <div>
                <span className="bold">Backend:</span> <span>Express/Node.js</span>
              </div>
              <div>
                <span className="bold">Database:</span> <span>MySQL</span>
              </div>
              <div>
                <span className="bold">Cloud:</span> <span>Render.com</span>
              </div>
              <div>
                <span className="bold">Container:</span> <span>Docker</span>
              </div>
            </div>{" "}
            <div className="flex">
              <h3>Creator:</h3>
              <span>Anni Peura</span>
              <h3>Last update:</h3>
              <span>17.01.2024</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
