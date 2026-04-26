import React from 'react';

// 1. Atualizamos a interface para aceitar o objeto newData
interface EditPanelProps {
    selectedNode: any;
    onNodeUpdate: (id: string, newData: { label: string; resourceType: string }) => void;
}

const EditPanel = ({ selectedNode, onNodeUpdate }: EditPanelProps) => {
    if (!selectedNode) {
        return (
            <aside style={panelStyle}>
                <p style={{ color: '#666' }}>Selecione um componente</p>
            </aside>
        );
    }

    // Função auxiliar para não repetir código
    const handleChange = (field: string, value: string) => {
        onNodeUpdate(selectedNode.id, {
            ...selectedNode.data,
            [field]: value
        });
    };

    return (
        <aside style={panelStyle}>
            <h3 style={{ marginBottom: '15px' }}>Propriedades</h3>

            <label style={labelStyle}>Nome do Componente:</label>
            <input
                style={inputStyle}
                value={selectedNode.data.label || ''}
                onChange={(evt) => handleChange('label', evt.target.value)}
            />

            <label style={labelStyle}>Tipo de Recurso:</label>
            <select
                style={inputStyle}
                value={selectedNode.data.resourceType || 'PostgreSQL'}
                onChange={(evt) => handleChange('resourceType', evt.target.value)}
            >
                <option value="PostgreSQL">PostgreSQL</option>
                <option value="Redis">Redis</option>
                <option value="MongoDB">MongoDB</option>
                <option value="Node.js">Node.js</option>
            </select>
        </aside>
    );
};

const panelStyle = {
    width: '250px',
    background: '#1a1a1a',
    borderLeft: '1px solid #333',
    padding: '20px',
    color: '#fff'
};

const labelStyle = { fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '5px' };
const inputStyle = {
    width: '100%',
    background: '#333',
    border: '1px solid #444',
    color: '#fff',
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '15px'
};

export default EditPanel;