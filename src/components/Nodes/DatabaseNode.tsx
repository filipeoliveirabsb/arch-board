import { Handle, Position } from 'reactflow';
import { Database } from 'lucide-react';

const DatabaseNode = ({ data }: any) => {
    return (
        <div style={{
            background: '#1e1e1e',
            color: '#fff',
            padding: '10px',
            borderRadius: '8px',
            border: '2px solid #3b82f6', // Um azul vibrante para destaque
            minWidth: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px'
        }}>
            {/* Ponto de conexão no topo */}
            <Handle type="target" position={Position.Top} style={{ background: '#3b82f6' }} />

            <Database size={24} color="#3b82f6" />
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{data.label}</div>
            <div style={{ fontSize: '10px', color: '#888' }}>
                {data.resourceType || 'PostgreSQL'}
            </div>

            {/* Ponto de conexão na base */}
            <Handle type="source" position={Position.Bottom} style={{ background: '#3b82f6' }} />
        </div>
    );
};

export default DatabaseNode;