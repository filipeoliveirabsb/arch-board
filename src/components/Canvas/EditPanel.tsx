import { useBoardStore } from '../../store/boardStore';
import { NODE_KIND_CONFIG } from '../../nodeKinds';
import type { NodeKind } from '../../types';
import './EditPanel.css';

const EditPanel = () => {
    const selectedNodeId = useBoardStore((state) => state.selectedNodeId);
    const selectedNode = useBoardStore((state) =>
        state.nodes.find((node) => node.id === state.selectedNodeId)
    );
    const updateNodeData = useBoardStore((state) => state.updateNodeData);
    const commitHistory = useBoardStore((state) => state.commitHistory);

    if (!selectedNodeId || !selectedNode) {
        return (
            <aside className="edit-panel">
                <p className="edit-panel__empty">Selecione um componente</p>
            </aside>
        );
    }

    const kind = (selectedNode.type ?? 'server') as NodeKind;
    const resourceOptions = NODE_KIND_CONFIG[kind].resourceOptions;

    const handleChange = (field: 'label' | 'resourceType', value: string) => {
        updateNodeData(selectedNode.id, {
            ...selectedNode.data,
            [field]: value,
        });
    };

    return (
        <aside className="edit-panel">
            <h3 className="edit-panel__title">Propriedades</h3>

            <label className="edit-panel__label">Nome do Componente:</label>
            <input
                className="edit-panel__input"
                value={selectedNode.data.label || ''}
                onChange={(evt) => handleChange('label', evt.target.value)}
                onBlur={commitHistory}
            />

            {resourceOptions.length > 0 && (
                <>
                    <label className="edit-panel__label">Tipo de Recurso:</label>
                    <select
                        className="edit-panel__input"
                        value={selectedNode.data.resourceType || resourceOptions[0]}
                        onChange={(evt) => {
                            handleChange('resourceType', evt.target.value);
                            commitHistory();
                        }}
                    >
                        {resourceOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </aside>
    );
};

export default EditPanel;
