import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { ItemWrapper } from '../components/ItemWrapper';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title == newTaskTitle)

    if(taskWithSameTitle){
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }
    
    const newTask ={
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTaks => [...oldTaks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(tasks => ({...tasks}))

    const foundItem = updatedTask.find(item => item.id === id)

    if(!foundItem){
      return;
    }

    foundItem.done = !foundItem.done
    setTasks(updatedTask)
  }

  function handleRemoveTask(id: number) {
   Alert.alert('Remover item','Tem certeza que você deseja remover esse item?',[
     {
        style : 'cancel',
        text: 'não'
     },
     {
      style : 'destructive',
      text: 'sim',
       onPress: () =>{
        const updatedTask = tasks.filter(task => task.id != id)

        setTasks(updatedTask)
       }
     }
   ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})