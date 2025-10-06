import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export type task = {
    id: number,
    title: string,
    description: string | null,
    status: string,
    schedule: string | Date,
    priority: number
}


export type PropTask = {
    task: task
    onChangeStatus(): void
}


export const Task = ({ task, onChangeStatus }: Omit<PropTask, "id">) => {


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.checkbutton} onPress={onChangeStatus}>
                {task.status === 'todo' ? (
                    <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                ) : task.status === 'doing' ? (
                    <MaterialIcons name="autorenew" size={24} color="orange" />
                ) : (
                    <MaterialIcons name="check-box" size={24} color="green" />
                )}
            </TouchableOpacity>
            <View style={styles.detailsbox}>
                <View>
                    <Text style={styles.tasktitle}>{task.title}</Text>
                    <Text>{task.description}</Text>
                </View>
                <View>
                    <Text>{task.schedule.toString()}</Text>
                </View>
            </View>
        </View>
    );
}
