import { Details } from '@/components/Modal'
import { task, Task } from '@/components/Task'
import { colors } from '@/constants/colors'
import { useSearch } from '@/contexts/SearchContext'
import * as taskSchema from '@/database/schemas/taskSchema'
import { wait } from '@/utils/wait'
import { useFocusEffect } from '@react-navigation/native'
import { and, asc, eq, like } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite'
import React, { useCallback, useState } from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { styles } from './styles'

export function Done() {

    const [tasks, setTasks] = useState<task[]>([])
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<task | null>(null);
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const { search } = useSearch()

    const database = useSQLiteContext()
    const db = drizzle(database, { schema: taskSchema })

    function handleChangeStatus(task: task, nextStatus: string) {
        setLoadingId(task.id)
        updatestatus(task.id, nextStatus)
        if (showModal)
            setShowModal(false)
    }

    function handleDeleteTask(id: number) {
        Alert.alert("Delete", "Confirm Remove", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: async () => {
                    try {
                        deletetask(id)
                        Toast.show({
                            type: 'success',
                            text1: 'Task Deleted',
                            position: 'bottom',
                        });
                    } catch (error) {
                        console.log(error)
                        Alert.alert("Delete", "Error Delete Task.")
                    } finally {
                        setShowModal(false)
                        fetchdone()
                    }
                }
            }
        ])
    }
    function handleOpenDetails(task: task) {
        setSelectedTask(task);
        setShowModal(true);
    }


    async function fetchdone() {
        try {
            const result = await db.query.tasks.findMany({
                where: and(eq(taskSchema.tasks.status, 'done'), like(taskSchema.tasks.title, `%${search}%`)),
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
            await fetchdone()
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingId(null)
        }
    }
    async function deletetask(id: number) {
        try {
            await db.delete(taskSchema.tasks).where(eq(taskSchema.tasks.id, id));
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchdone();
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
                            <Task task={item} loadingId={loadingId} statusstyle={{ textDecorationLine: 'line-through', color: colors.gray[600] }} onChangeStatus={() => handleChangeStatus(item, "todo")} />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ gap: 14, padding: 14 }}
                />) :
                (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 100
                    }}><Text>Nothing Done</Text></View>
                )}
            {
                selectedTask && (
                    <Details
                        task={selectedTask}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        screen='done'
                        handleUnCheck={() => { handleChangeStatus(selectedTask, "doing") }}
                        handleDelete={() => { handleDeleteTask(selectedTask.id) }}
                        handleReview={() => { console.log("Reviewing") }}

                    />
                )}


        </View>
    )
}

