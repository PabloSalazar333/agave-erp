import { useState } from 'react';
import { Bed, UserCheck, Wind, CheckCircle } from 'lucide-react';

const HotelRooms = () => {
    const [rooms, setRooms] = useState([
        { id: 101, type: 'Standard', status: 'clean', guests: [] },
        { id: 102, type: 'Standard', status: 'occupied', guests: ['Mr. Smith'] },
        { id: 103, type: 'Suite', status: 'dirty', guests: [] },
        { id: 104, type: 'Suite', status: 'clean', guests: [] },
        { id: 201, type: 'Deluxe', status: 'occupied', guests: ['Ms. Doe'] },
        { id: 202, type: 'Deluxe', status: 'clean', guests: [] },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'occupied': return 'bg-red-50 border-red-200 text-red-700';
            case 'dirty': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
            case 'clean': return 'bg-green-50 border-green-200 text-green-700';
            default: return 'bg-gray-50';
        }
    };

    const toggleStatus = (id) => {
        setRooms(rooms.map(room => {
            if (room.id !== id) return room;
            if (room.status === 'occupied') return { ...room, status: 'dirty', guests: [] };
            if (room.status === 'dirty') return { ...room, status: 'clean' };
            if (room.status === 'clean') return { ...room, status: 'occupied', guests: ['New Guest'] }; // Mock checkin
            return room;
        }));
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Room Management</h1>
                    <p className="text-gray-500">Manage housekeeping and check-ins.</p>
                </div>
                <div className="flex gap-2 text-sm">
                    <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Clean</span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Occupied</span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Dirty</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {rooms.map(room => (
                    <div
                        key={room.id}
                        onClick={() => toggleStatus(room.id)}
                        className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${getStatusColor(room.status)}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-2xl font-bold">#{room.id}</span>
                            {room.status === 'clean' && <CheckCircle className="w-5 h-5" />}
                            {room.status === 'dirty' && <Wind className="w-5 h-5" />}
                            {room.status === 'occupied' && <UserCheck className="w-5 h-5" />}
                        </div>

                        <div className="space-y-1">
                            <p className="font-semibold">{room.type}</p>
                            {room.guests.length > 0 ? (
                                <p className="text-sm opacity-80">Guest: {room.guests.join(', ')}</p>
                            ) : (
                                <p className="text-sm opacity-60">Empty</p>
                            )}
                        </div>

                        <div className="absolute bottom-4 right-4 opacity-50">
                            <Bed className="w-12 h-12" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelRooms;
