import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchBar = ({ fetchData }) => {
  const [cityName, setCityName] = useState("");

  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Enter City name"
        value={cityName}
        onChangeText={(text) => setCityName(text)}
      />
      <FontAwesome5
        name="search"
        size={24}
        color="black"
        onPress={() => fetchData(cityName)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
    borderColor: "lightgray",
  },
});

export default SearchBar;
