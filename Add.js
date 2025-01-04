import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data';

const Add = ({navigation}) => {
    const [book, setBook] = useState('');
    const [isbn, setIsbn] = useState('');
    const [image, setImage] = useState('');
    const [copies, setCopies] = useState('1');
    const [genre, setGenre] = useState('Romance');

    const setData = async(value) => {
        AsyncStorage.setItem("bookdata", value);
        navigation.navigate("Home");
    }

  return (
    <View>
      <StatusBar/>
      <Text>Book:</Text>
      <TextInput maxLength={1} style={{borderWidth:1}} onChangeText={(text)=>setBook(text)}/>
      <Text>ISBN:</Text>
      <TextInput
            style={{ borderWidth: 1, marginBottom: 10 }}
            onChangeText={(text) => setIsbn(text)}
      />
      <Text>Image URL:</Text>
      <TextInput
          style={{ borderWidth: 1, marginBottom: 10 }}
          onChangeText={(text) => setImage(text)}
      />
        <Text>Copies Owned:</Text>
        <TextInput
            style={{ borderWidth: 1, marginBottom: 10 }}
            keyboardType="numeric"
            onChangeText={(text) => setCopies(text)}
            value={copies}
        />
        <Text>Genre:</Text>
        <RNPickerSelect
        onValueChange={(value)=>setGenre(value)}
        items={[
          {label:"Romance", value:"Romance"},
          {label:"Fairy Tale", value:"Fairy Tale"}
        ]}
      />
      <Button title='Submit'
      onPress={()=>{
          let item = {key:book};
          let indexnum = 1;
          if(type=="Romance") {
            indexnum = 0;
          }
          mydata[indexnum].data.push(item);
          let stringdata= JSON.stringify(mydata);
          setData(stringdata);
          // datasource[indexnum].data.push(item);
          // avigation.navigate("Home")
        }
      }
      />
    </View>
  );
};

export default Add;
