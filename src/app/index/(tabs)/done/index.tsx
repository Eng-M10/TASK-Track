import { task, Task } from '@/components/Task'
import { colors } from '@/constants/colors'
import * as taskSchema from '@/database/schemas/taskSchema'
import { useFocusEffect } from '@react-navigation/native'
import { asc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { styles } from './styles'


export function Done() {

    const [status, setStatus] = useState("")
    const [tasks, setTasks] = useState<task[]>([])

    function handleChangeStatus(task: task) {


        if (task.status === "todo") {
            setStatus("doing")
        } else if (task.status === "doing") {
            setStatus("done")
        } else if (task.status === "done") {
            setStatus("todo")
        }

        updatestatus(task.id)

    }

    const database = useSQLiteContext()
    const db = drizzle(database, { schema: taskSchema })


    async function fetchdone() {
        try {
            const result = await db.query.tasks.findMany({
                where: eq(taskSchema.tasks.status, 'done'),
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
                status: status
            }).where(eq(taskSchema.tasks.id, id))

            Alert.alert(`TASK`, 'Return Task to TODO-DO list')
            await fetchdone()
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchdone();
        }, [])
    );

    return (
        <View style={styles.container}>

            <FlatList

                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Task task={item} statusstyle={{ textDecorationLine: 'line-through', color: colors.gray[600] }} onChangeStatus={() => handleChangeStatus(item)} />
                )}
                contentContainerStyle={{ gap: 14, padding: 14 }}
            />
        </View>
    )
}

