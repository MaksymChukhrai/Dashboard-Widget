//src\App.js

import MicrosoftGraph from "./components/MicrosoftGraph";
import AppleGraph from "./components/AppleGraph";
import NvidiaGraph from "./components/NvidiaGraph";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <p>Take Home Test:</p> */}
        <h2>Financial Dashboard Widget with US Stock </h2>
      </header>
      <main>
        <div className="graphics-container">
          <div className="wrapper-container">
            <div className="scroll-container">
              <MicrosoftGraph />
            </div>
            <div className="scroll-container">
              <AppleGraph />
            </div>
          </div>
          <div className="scroll-container">
            <NvidiaGraph />
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
