import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MessageCircle, Plus } from 'lucide-react';

const localizer = momentLocalizer(moment);

const ServiceCalendar = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Car Service - BMW X5',
            start: new Date(new Date().setHours(10, 0, 0, 0)),
            end: new Date(new Date().setHours(12, 0, 0, 0)),
            client: 'Mario Gomez',
            phone: '5215555555555',
            status: 'confirmed'
        },
        {
            id: 2,
            title: 'Oil Change - Toyota',
            start: new Date(new Date().setHours(14, 0, 0, 0)),
            end: new Date(new Date().setHours(15, 0, 0, 0)),
            client: 'Ana Pena',
            phone: '5215555555555',
            status: 'pending'
        }
    ]);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const sendWhatsApp = () => {
        if (!selectedEvent) return;
        const msg = `Hola ${selectedEvent.client}, reminder for your appointment: ${selectedEvent.title} at ${moment(selectedEvent.start).format('LT')}.`;
        const url = `https://wa.me/${selectedEvent.phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="font-semibold text-gray-700">Service Appointments</h2>
                <div className="flex gap-3">
                    {selectedEvent && (
                        <button
                            onClick={sendWhatsApp}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            <MessageCircle className="w-4 h-4" /> WhatsApp Reminder
                        </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                        <Plus className="w-4 h-4" /> New Appointment
                    </button>
                </div>
            </div>

            <div className="flex-1 p-4">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    onSelectEvent={handleSelectEvent}
                    views={['month', 'week', 'day', 'agenda']}
                    defaultView="week"
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor: event.status === 'confirmed' ? 'var(--color-primary)' : '#eab308',
                            borderRadius: '4px'
                        }
                    })}
                />
            </div>
        </div>
    );
};

export default ServiceCalendar;
