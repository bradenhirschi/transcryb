'use client'

import { createContext, useContext, useState } from 'react';

const AppContext = createContext<any>(null);

export function AppWrapper({ children }: {children: any}) {
  // Define your shared state here (e.g., audio file state)

  const [audioFile, setAudioFile] = useState(null);

  let sharedState = {
    audioFile,
    setAudioFile
  };

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
