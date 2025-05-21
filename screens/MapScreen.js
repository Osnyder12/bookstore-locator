import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebaseConfig';
import { mockBookstores } from '../mocks/mockBookstores';

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
  },
});


export default function MapScreen() {
  const [bookstores, setBookstores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  console.log
  useEffect(() => {
    const fetchBookstores = async () => {
        if (__DEV__) {
          setFilteredStores(mockBookstores);
          setBookstores(mockBookstores);
          return;
        }
      try {
        const querySnapshot = await getDocs(collection(db, 'bookstores'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookstores(data);
        setFilteredStores(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch bookstores');
      }
    };

    fetchBookstores();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStores(bookstores);
      return;
    }

    const filtered = bookstores.filter(store =>
      store.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredStores(filtered);
  }, [searchQuery, bookstores]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: filteredStores[0]?.latitude || 42.3601,
          longitude: filteredStores[0]?.longitude || -71.0589,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {filteredStores.map(store => (
          <Marker
            key={store.id}
            coordinate={{ latitude: store.latitude, longitude: store.longitude }}
            title={store.name}
            description={store.address}
          />
        ))}
      </MapView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.searchContainer}
      >
        <TextInput
          placeholder="Search by city..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

