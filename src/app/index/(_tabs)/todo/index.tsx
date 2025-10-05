import { task, Task } from '@/components/Task'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { styles } from './styles'

export function Todo() {
  const [status, setStatus] = useState("todo")

  const tasks = [
    { id: "2", title: "Task A", description: "Lorem Ipsum", priority: 1, schedule: "12/06/2003", status: "todo" },
    { id: "3", title: "Task B", description: "Lorem Ipsum", priority: 2, schedule: "12/06/2004", status: "doing" },
    { id: "4", title: "Task C", description: "Lorem Ipsum", priority: 3, schedule: "12/06/2005", status: "done" },

  ]

  function handleChangeStatus(task: task) {
    if (status === "todo") {
      setStatus("doing")
    } else if (status === "doing") {
      setStatus("done")
    } else {
      setStatus("todo")
    }
    task.status = status
  }



  useEffect(() => {

    tasks.map(item => {
      console.log(item.status)
    })


  }, [tasks])

  return (
    <View style={styles.container}>

      <FlatList

        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (<Task task={item} onChangeStatus={() => handleChangeStatus(item)} />)}
        contentContainerStyle={{ gap: 16, padding: 14 }}
      />
    </View>
  )
}

