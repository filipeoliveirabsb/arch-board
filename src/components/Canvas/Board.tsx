import { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    type Connection,
    type ReactFlowInstance,
    type Node
} from 'reactflow';
import 'reactflow/dist/style.css';

// Importando nosso nó customizado
import DatabaseNode from '../Nodes/DatabaseNode';

// Registro de tipos de nós
const nodeTypes = {
    database: DatabaseNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        data: { label: 'Projeto de Arquitetura' },
        position: { x: 250, y: 5 },
        style: { background: '#333', color: '#fff', border: '1px solid #777', padding: 10 }
    },
];

interface BoardProps {
    onNodeSelect: (node: Node | null) => void;
    updatedNode: Node | null; // Adicione esta linha
}

const Board = ({ onNodeSelect, updatedNode }: BoardProps) => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    // 1. Lógica de Conexão entre nós
    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    // 2. Lógica de Seleção
    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        onNodeSelect(node);
    }, [onNodeSelect]);

    const onPaneClick = useCallback(() => {
        onNodeSelect(null);
    }, [onNodeSelect]);

    // 3. Lógica de Drag & Drop
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            if (!type || !reactFlowInstance) return;

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: `${type}_${Date.now()}`,
                type,
                position,
                data: { label: `${type.toUpperCase()} Component` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );

    useEffect(() => {
        if (updatedNode) {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === updatedNode.id) {
                        return { ...node, data: updatedNode.data }; // Sincroniza o objeto data todo
                    }
                    return node;
                })
            );
        }
    }, [updatedNode, setNodes]);

    return (
        <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%', background: '#111' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background variant={BackgroundVariant.Dots} color="#333" gap={20} />
                <Controls />
                <MiniMap nodeColor="#444" maskColor="rgba(0,0,0,0.5)" />
            </ReactFlow>
        </div>
    );
};

export default Board;