import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Bookstore } from "../../types/bookstore";

interface MapSearchResultsProp {
  filteredStores: any;
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
});

const MapSearchResults: React.FC<MapSearchResultsProp> = ({ filteredStores }) => {
  return (
    filteredStores && (
      <View style={styles.resultsContainer}>
        {filteredStores.map((store: Bookstore) => {
          return <Text>{store.name}</Text>;
        })}
      </View>
    )
  );
};

export default MapSearchResults;
