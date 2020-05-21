import React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'expo-vector-icons/FontAwesome';

export default function App() {
  let [todo, setTodo] = React.useState([]);
  const [value, setValue] = React.useState('');
  let [activeTodo, setActiveTodo] = React.useState([]);
  const [activeStyle, setActiveStyle] = React.useState(0);
  const pushTodo = () => {
    filter(0)
    setTodo([...todo, { someThing: value, done: false }])
    setActiveTodo([...activeTodo, { someThing: value, done: false }])
    checkTodo(activeTodo)
    setValue("")
  };
  const checkTodo = (item) => {
    if (item.done == true) {
      return (
        <TouchableOpacity onPress={() => changeDoing(item)} style={styles.container4} activeOpacity={.8}>
          <FontAwesome name="check-square-o" size={24} color="rgb(255,98,51)" />
          <Text style={styles.doneTodo}>{item.someThing}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => changeDoing(item)} style={styles.container4} activeOpacity={.8}>
          <FontAwesome name="square-o" size={24} color="white" />
          <Text style={styles.result}>{item.someThing}</Text>
        </TouchableOpacity>
      )
    }
  }
  const changeDoing = (e) => {
    let newArray = [...todo];
    newArray[todo.indexOf(e)].done = !newArray[todo.indexOf(e)].done
    if (activeStyle == 1) {
      const newTodo = todo.filter(item => item.done === false)
      setTodo(newTodo)
    } else if (activeStyle == 2) {
      const newTodo = todo.filter(item => item.done === true)
      setTodo(newTodo)
    } else {
      const newTodo = todo.filter(item => { return item })
      setTodo(newTodo)
    }
  }
  const filter = (num) => {
    setActiveStyle(num)
    todo = []
    todo.push(...activeTodo)
    // setTodo(todo);
    if (num == 1) {
      const newTodo = todo.filter(item => item.done === false)
      setTodo(newTodo)
    } else if (num == 2) {
      const newTodo = todo.filter(item => item.done === true)
      setTodo(newTodo)
    } else {
      const newTodo = todo.filter(item => { return item })
      setTodo(newTodo)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todo}
        renderItem={({ item, index }) => (
          <View style={{ marginTop: 10 }}>
            {checkTodo(item)}
          </View>
        )}
        keyExtractor={(work, index) => index}
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.box}>BABY SHARK</Text>
            <Text style={styles.box1}>
              TODO <Text style={styles.box2}>- dodooododooo</Text>
            </Text>
            <View style={styles.container2}>
              <TextInput style={styles.input} placeholder={'Add a To - Do'} value={value} onChangeText={setValue} />
              <TouchableOpacity onPress={pushTodo}>
                <FontAwesome name="plus-circle" size={50} color="orange" />
              </TouchableOpacity>
            </View>
            <View style={styles.container3}>
              <TouchableOpacity style={styles.button} onPress={() => filter(0)}>
                <Text style={styles.button2}>ALL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => filter(1)}>
                <Text style={styles.button2}>ACTIVE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => filter(2)}>
                <Text style={styles.button2}>DONE</Text>
              </TouchableOpacity>
            </View>


          </View>
        }
        ListEmptyComponent={
          <Text style={styles.result2}>Sorry No Item To List</Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(15,4,31)',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  container2: {
    flex: 1,
    backgroundColor: 'rgb(15,4,31)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 20

  },
  container3: {    
    flexDirection: 'row',
    marginTop: 20

  },
  container4: {
    flex: 1,
    backgroundColor: 'rgb(15,4,31)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',


  },
  box: {
    color: 'orange',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '700'
  },
  box1: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400'

  },
  box2: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '400'

  },
  input: {
    backgroundColor: 'white',
    width: 300,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 25,
    paddingLeft: 8


  },
  button: {
    flexGrow: 1,
  },
  button2: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    height: 40,
  },
  result: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 15
  },
  result2: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 50,
    alignSelf: 'center'
  },
  doneTodo: {
    color: "rgb(255,98,51)",
    textDecorationLine: "line-through",
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 15
  },



});
