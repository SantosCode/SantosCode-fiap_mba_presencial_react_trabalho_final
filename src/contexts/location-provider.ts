import { createContext, useContext } from 'react';

export interface LocationContextType {
  geolocationPositions?: GeolocationPosition;
  setGeolocationPositions: (geolocation?: GeolocationPosition) => void;
  hasPermission: boolean;
}

export const LocationContext = createContext<LocationContextType>({
  setGeolocationPositions: async () => {},
  hasPermission: false
})

export const useLocationProvider = (): LocationContextType => 
  useContext(LocationContext)