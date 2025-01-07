import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';

export default function Markers() {
  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCoordinate, setCurrentCoordinate] = useState(null);
  const [note, setNote] = useState('');

  const handlePress = event => {
    const coordinate = event.nativeEvent.coordinate;
    setCurrentCoordinate(coordinate);
    setModalVisible(true);
  };
  const addMarker = () => {
    setMarkers([...markers, {coordinate: currentCoordinate, title: note}]);
    setModalVisible(false);
    setNote('');
  };

  const deleteMarker = index => {
    Alert.alert('Notu Sil', 'Bu notu silmek istediğinizden emin misiniz?', [
      {text: 'İptal', style: 'cancel'},
      {
        text: 'Sil',
        onPress: () => {
          const updatedMarkers = markers.filter((_, i) => i !== index);
          setMarkers(updatedMarkers);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 39.92077,
          longitude: 32.85411,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handlePress}>
        {/* Haritaya marker (işaretleyici) ekleyebilirsiniz */}

        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            onCalloutPress={() => deleteMarker(index)}
          />
        ))}
      </MapView>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View
            style={{
              width: 200,
              height: 150,
              backgroundColor: '#DFB1D0',
              borderRadius: 10,
            }}>
            <TextInput
              style={styles.input}
              placeholder="Not girin"
              value={note}
              onChangeText={setNote}
            />
            <Button title="Not Ekle" onPress={addMarker} />
            <Button
              title="İptal"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
