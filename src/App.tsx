import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <>
      <div className="m-2">
        <h1 className="text-2xl font-bold">KanbanBoard</h1>
        <Board></Board>
      </div>
    </>
  );
}

export default App;
