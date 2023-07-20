import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Home from './Home'
import { RootStackParamList } from './StackNavigation'

const Pagination = ({ navigation }: RootStackParamList | any) => {
  const [data, setData] = useState<number[] | string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(10)
  console.log("pagination data", data)

  const page: number = 1;

  useEffect(() => {
    paginationApi()
  }, [])

  // type nnewData = {
  //   name: string;
  //   city: string;
  // }

  // const newData: nnewData[] = [
  //   {
  //     name: 'Amar',
  //     city: 'indore'
  //   },
  //   {
  //     name: 'Sachin',
  //     city: 'mumbai'
  //   },
  //   {
  //     name: 'yuvraj',
  //     city: 'bhopal'
  //   },
  // ]



  const paginationApi = () => {
    setLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
      .then(res => res.json())
      .then(res => {
        setData(res)
        setLoading(false)
        setLimit(limit + 10)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  const onEndReached = () => {
    if (data.length > 0) {
      paginationApi()
    }
  }

  interface Prop {
    item: object | any
    index: number
  }

  const renderItem = ({ item, index }: Prop) => {
    return (
      <View>
        <Text style={{ fontSize: 15 }
        }> {item.id} </Text>
        < Text style={{ fontSize: 30 }
        }> {item.title} </Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, padding: 10 }} >
      <Button title='Back' onPress={() => navigation.navigate('Home')} />
      < Text > Pagination </Text>
      < ActivityIndicator style={{ position: 'absolute', top: '50%', zIndex: 1, alignSelf: 'center' }}
        animating={loading} size='large' color='red' />
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View >
  )

}

export default Pagination

