import React, { ReactNode, useState } from 'react';
import { HackathonContext } from './HackathonContext';

type HackathonProviderProps = {
    children: ReactNode;
    id: string;
};

export const HackathonProvider = ({ id, children }: HackathonProviderProps) => {
    const [hackathonId, setHackathonId] = useState(id);

    return (
        <HackathonContext.Provider value={{ hackathonId, setHackathonId }}>
            {children}
        </HackathonContext.Provider>
    );
};
