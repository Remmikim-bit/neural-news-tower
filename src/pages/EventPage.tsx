import { useParams, useNavigate } from 'react-router-dom';
import EventDetail from '../components/EventDetail';

export const EventPage = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();

    if (!eventId) {
        return <div>Event not found</div>;
    }

    return (
        <EventDetail
            eventId={eventId}
            onBack={() => navigate('/')}
        />
    );
};
