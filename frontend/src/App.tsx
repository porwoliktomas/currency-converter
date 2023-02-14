import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="App">
      <h1>Currency converter</h1>
      <CurrencyConverter />
      <Stats />
    </div>
  );
}

export default App;
