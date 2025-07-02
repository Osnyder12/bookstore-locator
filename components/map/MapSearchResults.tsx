import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bookstore } from "../../types/bookstore";

interface MapSearchResultsProp {
  filteredStores: Bookstore[];
  onStorePress: (latitude: number, longitude: number) => void;
}

const styles = StyleSheet.create({
  resultsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 10,
    maxHeight: 200,
  },

  storeListing: {},
});

const MapSearchResults: React.FC<MapSearchResultsProp> = ({ filteredStores, onStorePress }) => {
  return (
    filteredStores && (
      <View style={styles.resultsContainer}>
        {filteredStores.map((store: Bookstore) => {
          return (
            <TouchableOpacity
              key={store.id}
              onPress={() => {
                onStorePress(store.latitude, store.longitude);
              }}
            >
              <View>
                <Text style={styles.storeListing}>{store.name}</Text>
                <Text>{store.address}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    )
  );
};

export default MapSearchResults;
