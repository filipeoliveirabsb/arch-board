import { Handle, Position, type NodeProps } from 'reactflow';
import type { NodeData, NodeKind } from '../../types';
import { NODE_KIND_CONFIG } from '../../nodeKinds';
import './Nodes.css';

const GenericNode = ({ data, type }: NodeProps<NodeData>) => {
  const config = NODE_KIND_CONFIG[type as NodeKind];
  const Icon = config.icon;

  return (
    <div className="arch-node" style={{ borderColor: config.color }}>
      <Handle type="target" position={Position.Top} style={{ background: config.color }} />

      <Icon size={24} color={config.color} />
      <div className="arch-node__label">{data.label}</div>
      {config.resourceOptions.length > 0 && (
        <div className="arch-node__resource">{data.resourceType || config.resourceOptions[0]}</div>
      )}

      <Handle type="source" position={Position.Bottom} style={{ background: config.color }} />
    </div>
  );
};

export default GenericNode;
