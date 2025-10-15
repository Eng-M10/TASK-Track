import { Doing } from '@/app/index/(tabs)/doing';
import { FloatingButton } from '@/components/FAB';
import { colors } from '@/constants/colors';
import { setupChannel, solicitarPermissao } from '@/services/notifications';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Done } from './(tabs)/done';
import { Todo } from './(tabs)/todo';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator();

export default function Index() {


  useEffect(() => {
    (async () => {
      await solicitarPermissao();
      await setupChannel();
    })();
  }, []);


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View style={styles.titleContainer}><Text style={styles.title}>Tasks</Text></View>
        <TouchableOpacity >
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
