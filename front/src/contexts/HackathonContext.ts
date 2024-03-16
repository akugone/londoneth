import { createContext } from 'react';

interface HackathonContextType {
    hackathonId: string;
    setHackathonId: (id: string) => void;
}

export const HackathonContext = createContext<HackathonContextType>({
    hackathonId: '',
    setHackathonId: () => {},
});
