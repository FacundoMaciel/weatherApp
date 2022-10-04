import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';

const API_KEY = 'cd413c1db43eb849ea732d831f651b0a';


export default function App() {

  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchData(cityName) {
    setLoaded(false)
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json()
        setData(data)
      } else {
        setData(null)
      }
      setLoaded(true)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchData('Egipto')
    // console.log(data);
  }, [])

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='blue' size={36} />
      </View>
    )
  }
  else if (data === null) {
    return (
      <View>
        <SearchBar fetchData={fetchData} />
        <Text style={styles.primaryText}> City Not Found </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Weather data={data} fetchData={fetchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28,

  }
});
