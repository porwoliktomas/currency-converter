import CurrencyConverter from "./components/CurrencyConverter";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="flex items-center max-w-screen-lg m-auto flex-col p-4 md:p-20 gap-4 md:gap-14">
      <div className="flex flex-col items-center divide-y divide-slate-300 bg-white rounded-lg border-slate-300 border shadow-lg">
        <h1 className="p-6 font-semibold text-2xl text-center">
          Currency converter
        </h1>
        <CurrencyConverter />
      </div>
      <Stats />
    </div>
  );
}

export default App;
