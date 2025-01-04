import React,{useState} from 'react';
import { Alert, View, Button, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {
    // let mydata = JSON.parse(route.params.datastring);
    //  let myindex = route.params.index;

    let mydata;
    try {
        mydata = JSON.parse(route.params?.datastring || '[]');
    } catch (error) {
        console.error('Error parsing datastring:', error);
        return <Text>Error loading data.</Text>;
    }

    const myindex = route.params?.index ?? 0;

    const bookData = mydata[route.params?.type === 'Romance' ? 0 : 1]?.data[myindex] || {};
    const[book,setBook] = useState(bookData.name || '');
    const [isbn, setIsbn] = useState(bookData.ISBN || '');
    const [image, setImage] = useState(bookData.image ||'');
    const [copies, setCopies] = useState(bookData.copiesOwned?.toString() ||'1');
    const setData = async(value) => {
        AsyncStorage.setItem("bookdata", value);
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <Text>Book:</Text>
            <TextInput
                value={book}
                style={styles.input}
                onChangeText={(text) => setBook(text)}
            />
            <Text>ISBN:</Text>
            <TextInput
                value={isbn}
                style={styles.input}
                onChangeText={(text) => setIsbn(text)}
            />
            <Text>Image URL:</Text>
            <TextInput
                value={image}
                style={styles.input}
                onChangeText={(text) => setImage(text)}
            />
            <Text>Copies Owned:</Text>
            <TextInput
                value={copies}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setCopies(text)}
            />

        <View style={{flexDirection:"row"}}>
        <View style={{margin:10,flex:1}}>
        <Button title='Save'
          onPress={()=>{
            let indexnum = 1
            if(route.params.type === "Romance") {
              indexnum = 0;
            }
            mydata[indexnum].data[myindex] = {
                name: book,
                ISBN: isbn,
                image: image,
                copiesOwned: copies,
            };
            let stringdata = JSON.stringify(mydata);
            setData(stringdata);
            // datasource[indexnum].data[route.params.index].key=book;
            // navigation.navigate("Home")
          }
        }
        />
        </View>
        <View style={{margin:10,flex:1}}>
        <Button title='Delete'
          onPress={()=>{
            let indexnum = 1
            if(route.params.type === "Romance") {
              indexnum = 0;
            }
            Alert.alert("Are you sure?",'',
              [{text:'Yes', onPress:()=>{
                mydata[indexnum].data.splice(myindex,1);
                let stringdata = JSON.stringify(mydata);
                setData(stringdata);
                // navigation.navigate("Home")
              }},
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 10,
    }
});

export default Edit;
