import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    BackgroundVariant,
    type Node,
    type ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import GenericNode from '../Nodes/GenericNode';
import { useBoardStore } from '../../store/boardStore';
import { NODE_KIND_CONFIG, NODE_KIND_ORDER } from '../../nodeKinds';
import type { ArchNode, NodeKind } from '../../types';
import './Board.css';

const nodeTypes = Object.fromEntries(
    NODE_KIND_ORDER.map((kind) => [kind, GenericNode])
) as Record<NodeKind, typeof GenericNode>;

const Board = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const nodes = useBoardStore((state) => state.nodes);
    const edges = useBoardStore((state) => state.edges);
    const onNodesChange = useBoardStore((state) => state.onNodesChange);
    const onEdgesChange = useBoardStore((state) => state.onEdgesChange);
    const onConnect = useBoardStore((state) => state.onConnect);
    const addNode = useBoardStore((state) => state.addNode);
    const setSelectedNodeId = useBoardStore((state) => state.setSelectedNodeId);
    const undo = useBoardStore((state) => state.undo);
    const redo = useBoardStore((state) => state.redo);

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        setSelectedNodeId(node.id);
    }, [setSelectedNodeId]);

    const onPaneClick = useCallback(() => {
        setSelectedNodeId(null);
    }, [setSelectedNodeId]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow') as NodeKind;

            if (!type || !reactFlowInstance) return;

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: ArchNode = {
                id: crypto.randomUUID(),
                type,
                position,
                data: { label: NODE_KIND_CONFIG[type].label },
            };

            addNode(newNode);
        },
        [reactFlowInstance, addNode]
    );

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            if (!(event.ctrlKey || event.metaKey) || key !== 'z') return;

            event.preventDefault();
            if (event.shiftKey) {
                redo();
            } else {
                undo();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [undo, redo]);

    return (
        <div ref={reactFlowWrapper} className="board">
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
                deleteKeyCode={['Backspace', 'Delete']}
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
