import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {NotesContext} from '../contexts/Notes';
import {useNavigation} from '@react-navigation/native';

export default function Note() {
  // contexts
  const {setNotes} = useContext(NotesContext);

  // hooks
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [time, setTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');

  const handleTimePicker = time => {
    setTime(time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
    setTimePickerVisibility(false);
  };

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => setShow(true);

  const handleSave = () => {
    if (noteTitle.trim() && noteDescription.trim()) {
      // 'newNote' doğru şekilde burada tanımlanmalı
      const newNote = {
        id: Date.now().toString(),
        title: noteTitle,
        description: noteDescription,
        date: date.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        time: time,
      };

      setNotes(prev => [...prev, {...newNote}]);

      // Girdi alanlarını temizle
      setNoteTitle('');
      setNoteDescription('');
      setTime('');

      // 'newNote' eklenmiş 'notes' listesini 'List' sayfasına gönder
      navigation.navigate('List');
    } else {
      alert('Lütfen başlık ve açıklama alanlarını doldurun!');
    }
  };

  return (
    <View>
      <View style={{backgroundColor: '#f5cdc0', margin: 5, padding: 10}}>
        <Text style={{marginHorizontal: 10, fontSize: 20}}>Notunuz:</Text>
        <TextInput
          placeholder="Not başlığını yazınız"
          value={noteTitle}
          onChangeText={setNoteTitle}
          placeholderTextColor={'white'}
          style={{
            backgroundColor: '#34375a',
            padding: 10,
            margin: 10,
            color: 'white',
          }}
        />
      </View>

      <View style={{backgroundColor: '#f5cdc0', margin: 5, padding: 10}}>
        <Text style={{marginHorizontal: 10, fontSize: 20}}>Açıklama:</Text>
        <TextInput
          placeholder="Not açıklamasını yazınız"
          value={noteDescription}
          onChangeText={setNoteDescription}
          placeholderTextColor={'white'}
          style={{
            backgroundColor: '#34375a',
            padding: 10,
            margin: 10,
            color: 'white',
          }}
        />
      </View>

      <View style={{backgroundColor: '#f5cdc0', margin: 5, padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{marginHorizontal: 10, fontSize: 20}}>Tarih:</Text>
          <Button onPress={showDatepicker} title="Tarih Seçiciyi Göster" />
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <Text
          style={{
            backgroundColor: '#34375a',
            padding: 10,
            margin: 10,
            color: 'white',
          }}>
          {date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </Text>
      </View>

      <View style={{backgroundColor: '#f5cdc0', margin: 5, padding: 10}}>
        <Text style={{marginHorizontal: 10, fontSize: 20}}>Saat :</Text>
        <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
          <TextInput
            placeholder="Saat yazınız (HH:MM)"
            placeholderTextColor={'white'}
            value={time}
            editable={false}
            style={{
              backgroundColor: '#34375a',
              padding: 10,
              margin: 10,
              color: 'white',
            }}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimePicker}
          onCancel={() => setTimePickerVisibility(false)}
        />
      </View>

      <View>
        <TouchableOpacity onPress={handleSave}>
          <Text
            style={{
              backgroundColor: '#34375a',
              width: 120,
              height: 60,
              padding: 20,
              color: 'white',
              borderRadius: 80,
              textAlign: 'center',
              fontSize: 18,
              marginLeft: 250,
              marginTop: 60,
            }}>
            Kaydet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
