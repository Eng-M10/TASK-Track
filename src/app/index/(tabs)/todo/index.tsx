import { task, Task } from '@/components/Task'
import * as taskSchema from '@/database/schemas/taskSchema'
import { useFocusEffect } from '@react-navigation/native'
import { asc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { styles } from './styles'


export function Todo() {

  const [status, setStatus] = useState("")
  const [tasks, setTasks] = useState<task[]>([])

  function handleChangeStatus(task: task) {

    if (task.status === "todo") {
      setStatus("doing")
    } else if (task.status === "doing") {
      setStatus("done")
    } else {
      setStatus("todo")
    }

    updatestatus(task.id)

  }

  const database = useSQLiteContext()
  const db = drizzle(database, { schema: taskSchema })


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
    try {

      const response = await db.update(taskSchema.tasks).set({
        status
      }).where(eq(taskSchema.tasks.id, id))
      Alert.alert(`TASK`, 'Pass to doing list')
      await fetchtodo()

    } catch (error) {

      console.log(error)
    }

  }

  useFocusEffect(
    useCallback(() => {
      fetchtodo();
    }, [])
  );
  return (
    <View style={styles.container}>

      <FlatList

        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Task task={item} onChangeStatus={() => handleChangeStatus(item)} />
        )}
        contentContainerStyle={{ gap: 14, padding: 14 }}
      />
    </View>
  )
}

