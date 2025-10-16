import { Details } from '@/components/Modal'
import { task, Task } from '@/components/Task'
import { useSearch } from '@/contexts/SearchContext'
import * as taskSchema from '@/database/schemas/taskSchema'
import { wait } from '@/utils/wait'
import { useFocusEffect } from '@react-navigation/native'
import { and, asc, eq, like } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

export function Doing() {

    const [tasks, setTasks] = useState<task[]>([])
    const [selectedTask, setSelectedTask] = useState<task | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const { search } = useSearch()


    function handleOpenDetails(task: task) {

        setSelectedTask(task);
        setShowModal(true);
    }

    function handleChangeStatus(task: task, nextStatus: string) {
        setLoadingId(task.id);
        updatestatus(task.id, nextStatus)

        if (showModal)
            setShowModal(false)
    }

    const database = useSQLiteContext()
    const db = drizzle(database, { schema: taskSchema })


    async function fetchdoing() {
        try {
            const result = await db.query.tasks.findMany({
                where: and(eq(taskSchema.tasks.status, 'doing'), like(taskSchema.tasks.title, `%${search}%`)),
                orderBy: [asc(taskSchema.tasks.priority), asc(taskSchema.tasks.schedule)]
            })
            setTasks(result)

        } catch (error) {
            console.log(error)
        }

    }

    async function updatestatus(id: number, nextStatus: string) {
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
        }, [search])
    );
    return (
        <View style={styles.container}>
            {tasks.length > 0 ?
                (<FlatList

                    data={tasks}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleOpenDetails(item)}>
                            <Task task={item} loadingId={loadingId} onChangeStatus={() => handleChangeStatus(item, "done")} />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ gap: 14, padding: 14 }}
                />) : (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 100
                    }}><Text>Nothing Doing ...</Text></View>
                )}
            {
                selectedTask && (
                    <Details
                        task={selectedTask}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        screen='doing'
                        handleUnCheck={() => { handleChangeStatus(selectedTask, "todo") }}
                        handleUpdate={() => { console.log("upadate sem schedule") }}
                        handleCheck={() => { handleChangeStatus(selectedTask, "done") }}
                    />
                )
            }

        </View>
    )
}

