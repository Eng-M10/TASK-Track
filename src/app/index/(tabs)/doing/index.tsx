import { task, Task } from '@/components/Task'
import * as taskSchema from '@/database/schemas/taskSchema'
import { wait } from '@/utils/wait'
import { useFocusEffect } from '@react-navigation/native'
import { asc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { styles } from './styles'

export function Doing() {

    const [tasks, setTasks] = useState<task[]>([])
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const nextStatus = "done"

    function handleChangeStatus(task: task) {
        setLoadingId(task.id);
        updatestatus(task.id)

    }

    const database = useSQLiteContext()
    const db = drizzle(database, { schema: taskSchema })


    async function fetchdoing() {
        try {
            const result = await db.query.tasks.findMany({
                where: eq(taskSchema.tasks.status, 'doing'),
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
            await fetchdoing()
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingId(null)
        }

    }
    useFocusEffect(
        useCallback(() => {
            fetchdoing();
        }, [])
    );
    return (
        <View style={styles.container}>
            {tasks.length > 0 ?
                (<FlatList

                    data={tasks}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Task task={item} loadingId={loadingId} onChangeStatus={() => handleChangeStatus(item)} />
                    )}
                    contentContainerStyle={{ gap: 14, padding: 14 }}
                />) : (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 100
                    }}><Text>Nothing Doing ...</Text></View>
                )
            }

        </View>
    )
}

