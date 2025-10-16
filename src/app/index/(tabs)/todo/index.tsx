import { Details } from '@/components/Modal'
import { task, Task } from '@/components/Task'
import { colors } from '@/constants/colors'
import * as taskSchema from '@/database/schemas/taskSchema'
import { wait } from '@/utils/wait'
import { useFocusEffect } from '@react-navigation/native'
import { asc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback, useState } from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Toast } from 'toastify-react-native'
import { styles } from './styles'


export function Todo() {

  const [tasks, setTasks] = useState<task[]>([])
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<task | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const nextStatus = "doing"

  const database = useSQLiteContext()
  const db = drizzle(database, { schema: taskSchema })

  function handleOpenDetails(task: task) {
    setSelectedTask(task);
    setShowModal(true);
  }


  async function handleChangeStatus(id: number) {
    const start = Date.now()
    setLoadingId(id);
    try {
      updatestatus(id)
      const elapsed = Date.now() - start
      if (elapsed < 700) await wait(700 - elapsed)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingId(null);
      if (showModal)
        setShowModal(false)
      fetchtodo();
    }

  }


  async function fetchtodo() {
    try {
      const result = await db.query.tasks.findMany({
        where: eq(taskSchema.tasks.status, 'todo'),
        orderBy: [asc(taskSchema.tasks.priority), asc(taskSchema.tasks.schedule)]
      })

      setTasks(result)

    } catch (error) {
      console.log(error)
    }

  }

  async function updatestatus(id: number) {
    const start = Date.now()
    try {

      await db.update(taskSchema.tasks).set({
        status: nextStatus
      }).where(eq(taskSchema.tasks.id, id))
      const elapsed = Date.now() - start
      if (elapsed < 700) await wait(700 - elapsed)
      await fetchtodo()
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingId(null)
    }

  }

  async function deletetask(id: number) {
    try {
      await db.delete(taskSchema.tasks).where(eq(taskSchema.tasks.id, id));
      Alert.alert("DELETE", "Task Deleted")
      Toast.show({
        type: 'success',
        text1: 'Task Deleted',
        position: 'bottom',
        visibilityTime: 4000,
        autoHide: true,
        backgroundColor: colors.gray[600],
        iconColor: "#0CFF0A",
        iconSize: 24,

      })
    } catch (error) {
      console.log(error)
      Alert.alert("DELETE", "Error deleting task, try again!")
    } finally {
      fetchtodo()
      setShowModal(false)
    }

  }

  useFocusEffect(
    useCallback(() => {
      fetchtodo();
    }, [])
  );
  return (
    <View style={styles.container}>
      {tasks.length > 0 ?
        (<FlatList

          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpenDetails(item)}>
              <Task task={item} statusstyle={{ color: colors.cyan }} loadingId={loadingId} onChangeStatus={() => handleChangeStatus(item.id)} />
            </TouchableOpacity>

            // <Task task={item} statusstyle={{ color: colors.cyan }} onChangeStatus={() => handleChangeStatus(item)} />
          )}
          contentContainerStyle={{ gap: 18, padding: 14 }}
        />) :

        (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100
          }}><Text >No Tasks Added</Text></View>
        )}

      {
        selectedTask && (
          <Details
            task={selectedTask}
            showModal={showModal}
            setShowModal={setShowModal}
            screen='todo'
            handleUpdate={() => { console.log("update") }}
            handleDelete={() => { deletetask(selectedTask.id) }}
            handleCheck={() => { handleChangeStatus(selectedTask.id) }}

          />
        )}
    </View>


  )
}

