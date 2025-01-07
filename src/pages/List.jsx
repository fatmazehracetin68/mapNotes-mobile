import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {AddCircle, HambergerMenu} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {NotesContext} from '../contexts/Notes';

export default function List() {
  // contexts
  const {notes} = useContext(NotesContext);

  // hooks
  const navigate = useNavigation();

  return (
    <View style={{position: 'relative'}}>
      <Text
        style={{
          backgroundColor: '#744c71',
          fontSize: 24,
          textAlign: 'center',
          color: 'white',
          fontWeight: 'bold',
          padding: 5,
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        Notlarım
      </Text>

      {notes.map((note, index) => (
        <View
          key={index}
          style={{
            backgroundColor: '#f5cdc0',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 8,
            paddingHorizontal: 12,
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text>{note.title}</Text>
          <TouchableOpacity
            onPress={() =>
              navigate.navigate('Detail', {
                noteTitle: note.title,
                noteDescription: note.description,
                noteDate: note.date,
                noteTime: note.time,
              })
            }>
            <HambergerMenu size="32" color="#ba68c8" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => navigate.navigate('Note')}
        style={{position: 'absolute', top: 550, left: 300}}>
        <AddCircle size="64" color="#34375a" />
      </TouchableOpacity>
    </View>
  );
}
