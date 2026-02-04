import { useNavigate } from 'react-router-dom';
import EntityGraphView from '../components/EntityGraphView';

export const GraphPage = () => {
    const navigate = useNavigate();

    return (
        <EntityGraphView onBack={() => navigate('/')} />
    );
};
