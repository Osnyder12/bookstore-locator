import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import MapPage from "../components/map/MapPage";
import MapSearchBar from "../components/map/MapSearchBar";
import { db } from "../firebaseConfig";
import { mockBookstores } from "../mocks/mockBookstores";
import { Bookstore } from "../types/bookstore";

export default function MapScreen() {
  const [bookstores, setBookstores] = useState<Bookstore[]>([]);
  const [filteredStores, setFilteredStores] = useState<Bookstore[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBookstores = async () => {
      if (__DEV__) {
        setFilteredStores(mockBookstores);
        setBookstores(mockBookstores);
        return;
      }
      try {
        const querySnapshot = await getDocs(collection(db, "bookstores"));
        const data: Bookstore[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Bookstore, "id">),
        }));
        setBookstores(data);
        setFilteredStores(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch bookstores");
      }
    };

    fetchBookstores();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStores(bookstores);
      return;
    }

    const filtered = bookstores.filter((store) =>
      store.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredStores(filtered);
  }, [searchQuery, bookstores]);

  return (
    <View style={{ flex: 1 }}>
      // TODO: List search results at top of page
      <MapPage filteredStores={filteredStores} />
      <MapSearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
    </View>
  );
}
