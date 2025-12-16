// app/components/EventCard.jsx
import Link from 'next/link';

export default function EventCard({ event }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white text-black">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-blue-700">{event.name}</h3>
          <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
          {event.category}
        </span>
      </div>
      
      <p className="text-gray-600 mt-2 text-sm line-clamp-2">
        {event.description}
      </p>

      <div className="mt-4">
        <Link 
          href={`/events/${event.id}`} 
          className="text-sm text-white bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 inline-block"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}