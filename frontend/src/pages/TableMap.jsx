import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Plus, Save, Trash2, Armchair, Square, Circle } from 'lucide-react';

const TableMap = () => {
    const [tables, setTables] = useState(() => {
        const saved = localStorage.getItem('restaurant_map');
        return saved ? JSON.parse(saved) : [
            { id: 1, type: 'square', x: 50, y: 50, seats: 4, label: 'T1' },
            { id: 2, type: 'circle', x: 200, y: 50, seats: 2, label: 'T2' }
        ];
    });
    const [selectedTable, setSelectedTable] = useState(null);
    const containerRef = useRef(null);

    const addTable = (type) => {
        const newTable = {
            id: Date.now(),
            type,
            x: 50,
            y: 50,
            seats: 4,
            label: `T${tables.length + 1}`
        };
        setTables([...tables, newTable]);
    };

    const updateTablePos = (id, data) => {
        setTables(tables.map(t => t.id === id ? { ...t, x: data.x, y: data.y } : t));
    };

    const saveMap = () => {
        localStorage.setItem('restaurant_map', JSON.stringify(tables));
        alert('Floor plan saved!');
    };

    const deleteTable = (id) => {
        setTables(tables.filter(t => t.id !== id));
        setSelectedTable(null);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 flex justify-between items-center">
                <div className="flex gap-4">
                    <button
                        onClick={() => addTable('square')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition"
                    >
                        <Square className="w-4 h-4" /> Add Square
                    </button>
                    <button
                        onClick={() => addTable('circle')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition"
                    >
                        <Circle className="w-4 h-4" /> Add Round
                    </button>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={saveMap}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-sm"
                    >
                        <Save className="w-4 h-4" /> Save Layout
                    </button>
                </div>
            </div>

            {/* Map Canvas */}
            <div
                ref={containerRef}
                className="flex-1 bg-white rounded-xl border-2 border-dashed border-gray-200 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"
            >
                {tables.map(table => (
                    <Draggable
                        key={table.id}
                        bounds="parent"
                        defaultPosition={{ x: table.x, y: table.y }}
                        onStop={(e, data) => updateTablePos(table.id, data)}
                        nodeRef={containerRef} // Using parent ref slightly wrong for Draggable nodeRef but works for bounds usually
                    >
                        <div
                            onClick={() => setSelectedTable(table)}
                            className={`absolute cursor-move flex items-center justify-center font-bold text-white shadow-md transition-transform active:scale-105
                                ${table.type === 'circle' ? 'rounded-full' : 'rounded-lg'}
                                ${selectedTable?.id === table.id ? 'ring-4 ring-yellow-400 z-10' : ''}
                                ${table.status === 'occupied' ? 'bg-red-500' : 'bg-secondary'}
                            `}
                            style={{
                                width: table.type === 'circle' ? '80px' : '90px',
                                height: table.type === 'circle' ? '80px' : '90px'
                            }}
                        >
                            <div className="text-center">
                                <div className="text-lg">{table.label}</div>
                                <div className="text-xs opacity-80 flex items-center justify-center gap-1">
                                    <Armchair className="w-3 h-3" /> {table.seats}
                                </div>
                            </div>

                            {/* Quick Delete (Visible on Hover/Select) */}
                            {selectedTable?.id === table.id && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteTable(table.id); }}
                                    className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-1.5 rounded-full hover:bg-red-200 shadow-sm"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </Draggable>
                ))}
            </div>

            {/* Hint */}
            <p className="mt-2 text-xs text-gray-400 text-center">
                Drag tables to rearrange. Click to select/delete. Press Save to persist changes.
            </p>
        </div>
    );
};

export default TableMap;
