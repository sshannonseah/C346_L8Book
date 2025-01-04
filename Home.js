import React ,{useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
	textStyle: {
    	fontSize: 15,
    	margin: 10,
   		textAlign: 'left',
 	 },
   opacityStyle: {
      borderWidth: 1,
   },
   headerText: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight:'bold',
    fontFamily:'impact'
  },
    image: {
        width: 130,
        height: 160,
        resizeMode: 'contain',
        marginLeft: 10,
    },
});

const Home = ({navigation}) => {

    const[mydata, setMydata] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem("bookdata");
        if(datastr!=null){
            jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        }
        else {
            setMydata(datasource);
        }
    };
    getData();

  const renderItem = ({item, index, section}) => {
    return (
    <TouchableOpacity style={styles.opacityStyle}
    onPress={()=>
      {
        navigation.navigate("Edit",{index:index, type:section.Title, name:item.name})
      }
    }
    >
    <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text style={styles.textStyle}>{item.name}</Text>
    <Text style={styles.textStyle}>ISBN: {item.ISBN}</Text>
    <Text style={styles.textStyle}>Copies Owned: {item.copiesOwned}</Text>
    </View>
    <Image source={{ uri:item.image }} style={styles.image} />
    </TouchableOpacity>
    );
  };

   return (
    <View>
      <StatusBar/>
	  <Button title='Add Book'
              onPress={()=>{
                  let datastr=JSON.stringify(mydata);
                  navigation.navigate("Add",{datastring:datastr});
              }
              }/>
      <SectionList sections={mydata} renderItem={renderItem}
      renderSectionHeader={({section:{title,bgcolor}})=>(
      <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
        {title}
      </Text>
      )}/>
    </View>
  );
};

export default Home;
