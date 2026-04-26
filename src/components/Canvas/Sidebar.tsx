import React from 'react';
import { Database, Server, Cloud, Activity } from 'lucide-react';

const Sidebar = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside style={{
            width: '250px',
            height: '100vh',
            background: '#1a1a1a',
            borderRight: '1px solid #333',
            padding: '20px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Arquitetura</h3>

            <p style={{ fontSize: '0.8rem', color: '#888' }}>Arraste os itens para o board:</p>

            {/* Item: Banco de Dados */}
            <div
                className="dndnode database"
                onDragStart={(event) => onDragStart(event, 'database')}
                draggable
                style={nodeStyle}
            >
                <Database size={20} />
                <span>Database</span>
            </div>

            {/* Item: API/Server */}
            <div
                className="dndnode server"
                onDragStart={(event) => onDragStart(event, 'default')}
                draggable
                style={nodeStyle}
            >
                <Server size={20} />
                <span>API Server</span>
            </div>

            <hr style={{ border: '0.5px solid #333', width: '100%' }} />

            <h3 style={{ fontSize: '1rem' }}>Templates</h3>
            <button style={btnStyle}>Microsserviços</button>
            <button style={btnStyle}>Serverless Stack</button>
        </aside>
    );
};

// Estilos rápidos para os itens arrastáveis
const nodeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    background: '#2a2a2a',
    borderRadius: '6px',
    cursor: 'grab',
    border: '1px solid #444'
};

const btnStyle = {
    padding: '10px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'left' as const
};

export default Sidebar;