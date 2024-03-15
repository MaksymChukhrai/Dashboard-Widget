//src\App.js
import './App.css';
import MicrosoftGraph from './components/MicrosoftGraph';
import AppleGraph from './components/AppleGraph';
import NvidiaGraph from './components/NvidiaGraph';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <p>Take Home Test:</p> 
      <h2>Financial Dashboard Widget with US Stock </h2>
      </header>
      <main>
        <MicrosoftGraph />
        <AppleGraph />
        <NvidiaGraph />
      </main>
      <footer>
        {/* Код для подвала, если нужен */}
      </footer>
    </div>
  );
}

export default App;
