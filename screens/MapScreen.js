import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebaseConfig';

export default function MapScreen() {
  const [bookstores, setBookstores] = useState([]);

  useEffect(() => {
    const fetchBookstores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookstores'));
        const data = querySnapshot.docs.map(doc => doc.data());
        setBookstores(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch bookstores');
      }
    };

    fetchBookstores();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}>
        {bookstores.map((store, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: store.latitude, longitude: store.longitude }}
            title={store.name}
            description={store.address}
          />
        ))}
      </MapView>
    </View>
  );
}
