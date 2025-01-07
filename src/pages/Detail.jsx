import {View, Text} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

export default function Detail() {
  const route = useRoute();
  const {noteTitle, noteDescription, noteDate, noteTime} = route.params;
  return (
    <View>
      <Text
        style={{
          backgroundColor: '#f5cdc0',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 8,
          paddingHorizontal: 12,
          alignItems: 'center',
          marginVertical: 10,
          fontSize: 18,
        }}>
        {noteTitle}
      </Text>
      <View
        style={{
          backgroundColor: '#cdcdcd',
          height: '25%',
          padding: 10,
          marginBottom: 20,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 5}}>
          Açıklama
        </Text>
        <Text> {noteDescription}</Text>
      </View>
      <View
        style={{
          backgroundColor: '#cdcdcd',
          height: '15%',
          padding: 10,
          marginBottom: 20,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 5}}>
          Tarih
        </Text>
        <Text>{noteDate}</Text>
      </View>
      <View
        style={{
          backgroundColor: '#cdcdcd',
          height: '15%',
          padding: 10,
          marginBottom: 20,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 5}}>
          Saat
        </Text>
        <Text>{noteTime}</Text>
      </View>
    </View>
  );
}
