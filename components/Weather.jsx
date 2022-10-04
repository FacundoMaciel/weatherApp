import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { haze, rainy, snow, sunny } from "../assets/backgroundImages/Index";

const weather = ({ data, fetchData }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const {
    weather,
    name,
    main: { temp, humidity },
    wind: { speed },
  } = data;
  const [{ main }] = weather;

  useEffect(() => {
    setBackgroundImage(getBackGroundImg(main));
  }, [data]);

  function getBackGroundImg(weather) {
    if (weather === "Snow") return snow;
    if (weather === "Clear") return sunny;
    if (weather === "Rain") return rainy;
    if (weather === "Haze") return haze;
    return haze;
  }

  let textColor = backgroundImage !== sunny ? "white" : "black";

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="lightgray" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover"
      >
        <SearchBar fetchData={fetchData} />

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
              fontSize: 46,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
            }}
          >
            {main}
          </Text>
          <Text style={{ ...styles.headerText, color: textColor }}>
            {Math.round(temp - 272)} º
          </Text>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "darkgray" }}>Humidity</Text>
            <Text style={{ fontSize: 22, color: "darkgray" }}>{humidity} %</Text>
          </View>

          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "darkgray" }}>Wind Speed</Text>
            <Text style={{ fontSize: 22, color: "darkgray" }}>{Math.round(speed * 2)} km/h</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    padding: 10,
  },
  info: {
    width: Dimensions.get("screen").width / 2.5,
    backgroundColor: "rgba(209, 209, 255, 0.69)",
    padding: 23,
    borderRadius: 15,
    shadowOpacity: 30,
    justifyContent: "center",
  },
});

export default weather;
