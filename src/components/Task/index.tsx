import { colors } from '@/constants/colors';
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
    statusstyle?: object | null
    onChangeStatus(): void
}


export const Task = ({ task, onChangeStatus, statusstyle }: Omit<PropTask, "id">) => {


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.checkbutton} onPress={onChangeStatus}>
                {task.status === 'todo' ? (
                    <MaterialIcons name="check-box-outline-blank" size={60} color={colors.cyan} />
                ) : task.status === 'doing' ? (
                    <MaterialIcons name="autorenew" size={60} color={colors.orange[500]} />
                ) : (
                    <MaterialIcons name="check-box" size={60} color="green" />
                )}
            </TouchableOpacity>
            <View style={styles.detailsbox}>

                <View>
                    <Text style={[styles.tasktitle, statusstyle]} numberOfLines={3} >{task.title}</Text>
                    <Text numberOfLines={3}>{task.description}</Text>
                </View>
                <View>
                    <Text ><Text style={{ fontWeight: "bold", }} >Scheduled : </Text>{task.schedule.toLocaleString()}</Text>
                </View>

            </View>
        </View>
    );
}
