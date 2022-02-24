import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './Task';
import { getData } from '../functions/getData';
import { storeData } from '../functions/writeDatas';

export const MainPage = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [taskItemsDone, setTaskItemsDone] = useState([]);

  useEffect(() => {
    getData().then(data => {
      setTaskItems(data.split(','));
    });
  }, []);

  const handleAddTask = () => {
    if (task !== null && task !== " " && task !== "") {
      Keyboard.dismiss();
      console.log(taskItems);
      setTaskItems([...taskItems, task])
      console.log(taskItems);
      setTask(null);
      
      storeData(taskItems.toString());
    }
  }

  const removeTask = (index) => {
    let itemsCopy = [...taskItemsDone];
    itemsCopy.splice(index, 1);
    setTaskItemsDone(itemsCopy)
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    setTaskItemsDone([...taskItemsDone, itemsCopy[index]]);
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)

    storeData(itemsCopy.toString());
  }

  /*const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('tasks')
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }
 
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@tasks', value)
    } catch (e) {
      // saving error
    }
  }*/


  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: '30%'
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <View style={styles.items}>
            <Text style={styles.sectionTitle}>Task's done</Text>
            {/* This is where the tasks will go! */}
            {
              taskItemsDone.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => removeTask(index)}>
                    <Task text={item} done={true} />
                  </TouchableOpacity>
                )
              })
            }
          </View>

        </View>

      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    textAlign: 'center'
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  itemsDone: {

    backgroundColor: 'yellow',
  },
  itemDone: {

  }
});
