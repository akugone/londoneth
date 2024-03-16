import { useContext } from 'react';
import { HackathonContext } from '../contexts/HackathonContext';

export const useDonation = () => {
    const context = useContext(HackathonContext);
    if (context === undefined) {
        throw new Error('useHackathon must be used within a HackathonProvider');
    }
    return context;
};
