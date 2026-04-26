import { useState } from 'react';
import Board from './components/Canvas/Board';
import Sidebar from './components/Canvas/Sidebar';
import EditPanel from './components/Canvas/EditPanel';
import { type Node } from 'reactflow';

function App() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Esta função será passada para o Board, que por sua vez atualizará o nó
  // Mas para o EditPanel parar de dar erro, precisamos de uma função de update aqui
  const onNodeUpdate = (id: string, newData: any) => {
    setSelectedNode((prev: any) => {
      if (!prev) return null;
      return {
        ...prev,
        data: newData // Substituímos o objeto data inteiro
      };
    });
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#111' }}>
      <Sidebar />

      <div style={{ flexGrow: 1, height: '100%' }}>
        <Board
          onNodeSelect={setSelectedNode}
          // Passamos a informação de atualização para o Board sincronizar
          updatedNode={selectedNode}
        />
      </div>

      <EditPanel
        selectedNode={selectedNode}
        onNodeUpdate={onNodeUpdate} // Agora o erro desaparece!
      />
    </div>
  );
}

export default App;