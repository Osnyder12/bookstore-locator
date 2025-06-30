import React, { forwardRef, RefObject } from "react";
import MapView, { Marker } from "react-native-maps";
import { Bookstore } from "../../types/bookstore";

interface MapPageProps {
  filteredStores: Bookstore[];
  ref: RefObject<MapView>;
}

const MapPage = forwardRef<MapView, MapPageProps>(({ filteredStores }, ref) => {
  return (
    <MapView
      ref={ref}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: filteredStores[0]?.latitude || 42.3601,
        longitude: filteredStores[0]?.longitude || -71.0589,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {filteredStores.map((store: Bookstore) => (
        <Marker
          key={store.id}
          coordinate={{ latitude: store.latitude, longitude: store.longitude }}
          title={store.name}
          description={store.address}
        />
      ))}
    </MapView>
  );
});

export default MapPage;
