import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from 'reactflow';
import type { ArchEdge, ArchNode, NodeData } from '../types';

const STORAGE_KEY = 'arch-board:v1';
const MAX_HISTORY = 50;

const initialNodes: ArchNode[] = [
  {
    id: 'root',
    type: 'server',
    data: { label: 'Projeto de Arquitetura', resourceType: 'Node.js' },
    position: { x: 250, y: 5 },
  },
];

interface Snapshot {
  nodes: ArchNode[];
  edges: ArchEdge[];
}

interface BoardState {
  nodes: ArchNode[];
  edges: ArchEdge[];
  selectedNodeId: string | null;
  past: Snapshot[];
  future: Snapshot[];

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: ArchNode) => void;
  updateNodeData: (id: string, data: NodeData) => void;
  setSelectedNodeId: (id: string | null) => void;
  loadPreset: (preset: Snapshot) => void;
  commitHistory: () => void;
  undo: () => void;
  redo: () => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      edges: [],
      selectedNodeId: null,
      past: [],
      future: [],

      onNodesChange: (changes) => {
        const removed = changes.some((change) => change.type === 'remove');
        const dragEnded = changes.some((change) => change.type === 'position' && change.dragging === false);
        if (removed || dragEnded) get().commitHistory();

        set((state) => {
          const nodes = applyNodeChanges(changes, state.nodes);
          const stillSelected = nodes.some((node) => node.id === state.selectedNodeId);
          return {
            nodes,
            selectedNodeId: stillSelected ? state.selectedNodeId : null,
          };
        });
      },

      onEdgesChange: (changes) => {
        if (changes.some((change) => change.type === 'remove')) get().commitHistory();
        set((state) => ({ edges: applyEdgeChanges(changes, state.edges) }));
      },

      onConnect: (connection) => {
        get().commitHistory();
        set((state) => ({ edges: addEdge(connection, state.edges) }));
      },

      addNode: (node) => {
        get().commitHistory();
        set((state) => ({ nodes: state.nodes.concat(node) }));
      },

      updateNodeData: (id, data) => {
        set((state) => ({
          nodes: state.nodes.map((node) => (node.id === id ? { ...node, data } : node)),
        }));
      },

      setSelectedNodeId: (id) => set({ selectedNodeId: id }),

      loadPreset: ({ nodes, edges }) => {
        get().commitHistory();
        set((state) => ({
          nodes: state.nodes.concat(nodes),
          edges: state.edges.concat(edges),
        }));
      },

      commitHistory: () => {
        const { nodes, edges, past } = get();
        const snapshot: Snapshot = { nodes, edges };
        set({
          past: past.concat(snapshot).slice(-MAX_HISTORY),
          future: [],
        });
      },

      undo: () => {
        const { past, nodes, edges, future } = get();
        if (past.length === 0) return;
        const previous = past[past.length - 1];
        set({
          nodes: previous.nodes,
          edges: previous.edges,
          past: past.slice(0, -1),
          future: [{ nodes, edges }, ...future],
        });
      },

      redo: () => {
        const { future, nodes, edges, past } = get();
        if (future.length === 0) return;
        const next = future[0];
        set({
          nodes: next.nodes,
          edges: next.edges,
          past: past.concat({ nodes, edges }),
          future: future.slice(1),
        });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ nodes: state.nodes, edges: state.edges }),
    }
  )
);
