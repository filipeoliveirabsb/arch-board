import type React from 'react';
import { useBoardStore } from '../../store/boardStore';
import { createMicroservicesPreset, createServerlessPreset } from '../../data/templates';
import { NODE_KIND_CONFIG, NODE_KIND_ORDER } from '../../nodeKinds';
import './Sidebar.css';

const Sidebar = () => {
    const nodes = useBoardStore((state) => state.nodes);
    const loadPreset = useBoardStore((state) => state.loadPreset);

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const nextOffsetY = () =>
        nodes.length === 0 ? 250 : Math.max(...nodes.map((node) => node.position.y)) + 250;

    return (
        <aside className="sidebar">
            <h3 className="sidebar__heading">Arquitetura</h3>

            <p className="sidebar__hint">Arraste os itens para o board:</p>

            <div className="sidebar__nodes">
                {NODE_KIND_ORDER.map((kind) => {
                    const config = NODE_KIND_CONFIG[kind];
                    const Icon = config.icon;
                    return (
                        <div
                            key={kind}
                            className="sidebar__node"
                            onDragStart={(event) => onDragStart(event, kind)}
                            draggable
                        >
                            <Icon size={20} color={config.color} />
                            <span>{config.label}</span>
                        </div>
                    );
                })}
            </div>

            <hr className="sidebar__divider" />

            <h3 className="sidebar__heading sidebar__heading--small">Templates</h3>
            <button className="sidebar__button" onClick={() => loadPreset(createMicroservicesPreset(nextOffsetY()))}>
                Microsserviços
            </button>
            <button className="sidebar__button" onClick={() => loadPreset(createServerlessPreset(nextOffsetY()))}>
                Serverless Stack
            </button>
        </aside>
    );
};

export default Sidebar;
