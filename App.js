import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Image, TextInput } from 'react-native';
import { Dialog } from 'react-native-ui-lib'


const initialState = {
    latitude: null,
    latitudeDelta: 0.0922,
    longitude: null,
    longitudeDelta: 0.0421,
}

export default function App() {
  const [currentPosition, setCurrentPosition] = useState(initialState)
  let [markers, setMarkers] = useState([
    {
      id: 0,
      region: { latitude: 58.1373603879051, longitude: 56.31226414142721 },
      title: 'EKA HOSPITAL',
      desc: 'Telp.(021)8888800',
      urlImg: 'https://serpongku.com/wp-content/uploads/2018/08/Eka-Hospital-BSD-City.jpg'
  }
])
  const [marker, setMarker] = useState({})
  //const [detailName, setDetailName] = useState(marker['title'])

  function openModalMarker() {
    return  <Dialog
      height={1} center
  ></Dialog>
  }
  
  function addMarkerOnMap(e) {
    const newId = markers[markers.length - 1].id + 1
    const title = 'Test Marker'
    const desc = 'Test description'
    setMarkers([
      ...markers,
      {
        id: newId,
        region: {latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude},
        title: title,
        desc: desc,
        urlImg: 'https://serpongku.com/wp-content/uploads/2018/08/Eka-Hospital-BSD-City.jpg'
      }
    ])
  }

  const renderMarker = () => {
    console.log('Зашел в рендер')
    console.log(markers)
    return markers.map(_marker => (
      <Marker
        key={_marker['id']}
        coordinate={_marker['region']}
        title={_marker['title']}
        description={_marker['desc']}
        onPress={() => {
          setMarker(_marker);
          openModalMarker()
        }}
      />
    ));
  }

  const renderDetailMarker = () => (
    <Dialog
        height={1} padding-card marginB-s4
      ></Dialog>
  )

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
    setCurrentPosition(region)
  }
  

  return currentPosition.latitude ? (
    <View style={styles.container}>
      <MapView style={styles.map} 
        initialRegion={currentPosition} 
        onRegionChange={onRegionChange} 
        showsUserLocation={true}
        onPress={addMarkerOnMap}
      >
        {renderMarker()}
      </MapView>
      { marker.hasOwnProperty('id') && renderDetailMarker() }
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