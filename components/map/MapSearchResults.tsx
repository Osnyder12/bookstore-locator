import React from "react";
import { Text, View } from "react-native";
import { Bookstore } from "../../types/bookstore";

interface MapSearchResultsProp {
  filteredStores: any;
}

const MapSearchResults: React.FC<MapSearchResultsProp> = ({ filteredStores }) => {
  return (
    filteredStores && (
      <View>
        {filteredStores.map((store: Bookstore) => {
          <Text>{store.name}</Text>;
        })}
      </View>
    )
  );
};

export default MapSearchResults;
