import { Alert, FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const ToDo = () => {
  const [text, setText] = useState('')
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const [rdata, setRdata] = useState('');
  const [checkdata, setCheckdata] = useState([]);
  const [expert, setExpert] = useState("please select");
  const [apiRes, setApiRes] = useState([]);
  console.log('apiRes', apiRes)
  const listData = [
    { id: 1, name: "Amar" },
    { id: 2, name: "Sachin" },
    { id: 3, name: "Yuvraj" },
    { id: 4, name: "Modi" },
    { id: 5, name: "Shah" },
    { id: 6, name: "Shivraj" },
    { id: 7, name: "Rahul" }
  ];

  const checkBoxOptions = [
    {
      id: 1,
      option: 'sachin tendulker',
      isSelected: false
    },
    {
      id: 2,
      option: 'kapil dev',
      isSelected: false
    },
    {
      id: 3,
      option: 'ms dhoni',
      isSelected: false
    },
  ]

  //console.log("data", data)

  const addItem = (text) => {
    if (text.length !== 0) {
      if (data.length == 0) {
        setData([text])
        setText('')
      }
      // else if (data.some((item) => item === text)) {
      else if (data.includes(text)) {
        Alert.alert('make sure text should be unique!')
      } else {
        setData([...data, text])
        setText('')
      }
    } else {
      Alert.alert('make sure text should be not empty!')
    }
  }

  const removeItem = (index) => {
    const removed = [...data]
    removed.splice(index, 1)
    setData(removed)
  }

  const radioFunction = (data) => {
    setRdata(data)
  }
  const renderItemList = ({ item, index }) => {
    return (
      <View
        style={{
          width: "40%",
          paddingHorizontal: 5,
          borderRadius: 20
        }}
      >
        <Text
          onPress={() => {
            setExpert(item.name), setOpen(false);
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  const checkBoxOptionsHandler = (obj) => {
    const newItem = checkdata.map(item => {
      if (item.id === obj.id) {
        return { ...item, isSelected: item.isSelected ? false : true }
      }
      else {
        return { ...item };
      }
    })
    console.log('newItem', newItem)
    setCheckdata(newItem)
  }

  const renderItem2 = ({ item }) => {
    return (
      <View style={{ padding: 10, flexDirection: 'row' }} >
        {!item.isSelected ? (<TouchableOpacity onPress={() => checkBoxOptionsHandler(item)} style={{ width: 15, height: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
        </TouchableOpacity>) : (
          <TouchableOpacity onPress={() => checkBoxOptionsHandler(item)} style={{ width: 15, height: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
          </TouchableOpacity>)}
        <Text style={{ marginLeft: '3%' }}>{item.option}</Text>
      </View>
    )
  }


  const renderItem = ({ item, index }) => {
    console.log("item", item)
    return (
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} onPress={() => { removeItem(index) }}>X</Text>
      </View>
    )
  }

  useEffect(() => {
    setCheckdata(checkBoxOptions)
  }, [])

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/todos'
    fetch(url)
      .then(res => res.json())
      .then(res => {
        let newData = res.map(item => {
          return { ...item, isData: false }
        })
        setApiRes(newData);
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }} onPress={() => addItem(text)}>ADD</Text>
        </View>
        <View style={{ backgroundColor: 'lightblue', width: '90%', borderRadius: 20, marginLeft: 10, paddingHorizontal: 5 }} >
          <TextInput placeholder='Add To DO'
            value={text}
            onChangeText={(val) => setText(val)}
          /></View>

      </View>
      <View style={{ maxHeight: 200 }} >
        <FlatList data={data}
          renderItem={renderItem}
        />
      </View>
      <View>
        <FlatList data={checkdata}
          renderItem={renderItem2}
        />
      </View>
      <View>

        <TouchableOpacity
          style={{
            marginTop: 20,
            borderWidth: 1,
            width: "40%",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 20
          }}
          onPress={() => setOpen(!open)}
        >
          <Text style={{ color: "red" }}>{expert}</Text>
        </TouchableOpacity>
        {open ? <FlatList data={listData} renderItem={renderItemList} /> : null}
      </View>
      <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>Radio button options</Text>
      <View>
        {rdata == "New" ? (<View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => radioFunction("New")} style={{ width: 15, height: 15, borderRadius: 30 / 2, borderWidth: 1, backgroundColor: 'red' }}></TouchableOpacity>
          <Text style={{ marginLeft: 5 }} >New</Text>
        </View>) :
          (<View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => radioFunction("New")} style={{ width: 15, height: 15, borderRadius: 30 / 2, borderWidth: 1 }}></TouchableOpacity>
            <Text style={{ marginLeft: 5 }} >New</Text>
          </View>)}
        {rdata == "Old" ? (<View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => radioFunction("Old")} style={{ width: 15, height: 15, borderRadius: 30 / 2, borderWidth: 1, backgroundColor: 'red' }}></TouchableOpacity>
          <Text style={{ marginLeft: 5 }} >Old</Text>
        </View>) :
          (<View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => radioFunction("Old")} style={{ width: 15, height: 15, borderRadius: 30 / 2, borderWidth: 1 }}></TouchableOpacity>
            <Text style={{ marginLeft: 5 }} >Old</Text>
          </View>)}
        {rdata == "Super" ? (<View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => radioFunction("Super")} style={{ width: 15, height: 15, borderRadius: 30 / 2, borderWidth: 1, backgroundColor: 'red' }}></TouchableOpacity>
          <Text style={{ marginLeft: 5 }} >Super</Text>
        </View>) :
          (<View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => radioFunction("Super")} style={{ width: 15, height: 15, borderRadius: 30 / 2, borderWidth: 1 }}></TouchableOpacity>
            <Text style={{ marginLeft: 5 }} >Super</Text>
          </View>)}

      </View>
      <Text>You have select: {rdata}</Text>
    </View>

  )
}

export default ToDo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: 'white'
  }
})


