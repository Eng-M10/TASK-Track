import { Select } from '@/components/Select';
import { colors } from '@/constants/colors';
import * as taskSchema from '@/database/schemas/taskSchema';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

type Props = {
  event: any;
  selectedDate: Date | undefined;
}

type Task = {
  title: string
  description: string
  schedule: Date
  priority: number
}


export default function Add() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(null)
  const [textcaracter, setTextCaracter] = useState(0)
  const [showPicker, setShowPicker] = useState(false);
  const maxLengt = 120

  const database = useSQLiteContext()

  const db = drizzle(database, { schema: taskSchema })




  const handleSave = () => {

    if (title.trim().length <= 0) {
      return alert("Title is required")
    } else if (description.trim().length <= 0) {
      return alert("Description is required")
    } else if (!selected) {
      return alert("Priority is required")
    }

    try {
      //console.log("Saving task...", { title, description, priority: selected, date })
      add({ title, description, priority: selected, schedule: date });

    } catch (error) {
      console.log(error)
      return Alert.alert("Error", "There was an error saving the task")
    }



  }

  const onChangDate = ({ event, selectedDate }: Props) => {

    if (selectedDate) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    }
    setShowPicker(Platform.OS === 'ios');

  };

  const showDatepicker = () => {
    setShowPicker(true);
  };





  async function add({ title, description, priority, schedule }: Task) {
    try {
      const response = await db.insert(taskSchema.tasks).values({ title, description, schedule, priority })
      console.log(response)
      Alert.alert("Cadastrado com o ID: " + response.lastInsertRowId)
      setTitle("")
      setDescription("")
      setDate(new Date())
      setSelected(null)
      // await fetchProducts()
    } catch (error) {
      console.log(error)
    }
  }







  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { router.back() }}>
          <MaterialIcons name='close' size={28} color={"#000"} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>New Task</Text>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Task Title :</Text>
        <TextInput style={styles.input}
          onChangeText={setTitle}
          placeholder='Title'
        />

        <Text style={styles.label}>Descriptions :</Text>

        <TextInput
          style={styles.textarea}
          onChangeText={(value) => [setTextCaracter(value.length), setDescription(value)]}
          numberOfLines={4}
          maxLength={maxLengt}
          placeholder={'Describe the new task here...'}
          textAlignVertical="top"
          underlineColorAndroid={'transparent'}
        />
        <Text style={[styles.label, {
          textAlign: "right",
          opacity: .3,
          marginTop: -45,
          marginRight: 8
        }]}
        >
          {textcaracter}/{maxLengt}
        </Text>

        <Text style={styles.label}>Due Date:</Text>
        <TouchableOpacity onPress={showDatepicker} >
          <View style={styles.dateTextContainer} >
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            <MaterialIcons name="edit-calendar" size={24} color={colors.blue[800]} />
          </View>

          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => onChangDate({ event, selectedDate })}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.label}>Priority :</Text>

        <Select
          onValueChange={
            setSelected}
          items={[
            { label: 'Low', value: 3 },
            { label: 'Medium', value: 2 },
            { label: 'High', value: 1 }
          ]
          }
        />
        <TouchableOpacity style={styles.button} onPress={() => { handleSave() }}>
          <Text>Add Task</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  )
}