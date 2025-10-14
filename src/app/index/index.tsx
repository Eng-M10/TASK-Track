import { FloatingButton } from '@/components/FAB';
import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Doing } from './(tabs)/doing';
import { Done } from './(tabs)/done';
import { Todo } from './(tabs)/todo';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator();


export default function Index() {

  async function displaynotification() {
    await notifee.requestPermission();
    const chanelId = await notifee.createChannel({
      id: 'ntf-remember',
      name: 'Task',
      vibration: true,
      importance: AndroidImportance.HIGH
    });

    await notifee.displayNotification({
      title: 'Lembrete de Tarefa',
      body: 'Você tem uma tarefa pendente. Não se esqueça de concluí-la!',
      android: {
        channelId: chanelId,
        smallIcon: 'ic_launcher',
        color: colors.gray[400]
      }
    });
  }

  useEffect(() => {
    displaynotification();
  }, []);




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}><Text style={styles.title}>Tasks</Text></View>
        <TouchableOpacity>
          <MaterialIcons size={32} name="search" color={colors.blue[800]} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: colors.gray[400] },
            tabBarIndicatorStyle: { backgroundColor: colors.blue[800] },
          }}
        >
          <Tab.Screen
            name="To-do" component={Todo} />
          <Tab.Screen
            name="Doing" component={Doing} />
          <Tab.Screen
            name="Done" component={Done} />
        </Tab.Navigator>
      </View>

      <FloatingButton onPress={() => { router.navigate("/add") }} />
    </SafeAreaView>
  );

}
