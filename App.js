import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
//import Geolocation from 'react-native-geolocation-service'; 

const initialState = {
    latitude: null,
    latitudeDelta: 0.0922,
    longitude: null,
    longitudeDelta: 0.0421,
}

export default function App() {
  const [currentPosition, setCurrentPosition] = useState(initialState)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude} =position.coords;
      setCurrentPosition({
        ...currentPosition,
        latitude,
        longitude,
      })
    },
      error => alert(error.message),
      {timeout: 20000, maximumAge: 1000}
    )
  }, [])
    
  function onRegionChange(region) {
    console.log(region)
    setCurrentPosition(region)
  }
  

  return currentPosition.latitude ? (
    <View style={styles.container}>
      <MapView style={styles.map} 
        initialRegion={currentPosition} 
        onRegionChange={onRegionChange} 
        showsUserLocation={true}
      />
    </View>
  ) : <ActivityIndicator style={{flex: 1}} animating size="large" />
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});