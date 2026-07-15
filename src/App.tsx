import Board from './components/Canvas/Board';
import Sidebar from './components/Canvas/Sidebar';
import EditPanel from './components/Canvas/EditPanel';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-layout__canvas">
        <Board />
      </div>

      <EditPanel />
    </div>
  );
}

export default App;
