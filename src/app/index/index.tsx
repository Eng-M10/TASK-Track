import { Doing } from '@/app/index/(tabs)/doing';
import { FloatingButton } from '@/components/FAB';
import { colors } from '@/constants/colors';
import { SearchProvider, useSearch } from '@/contexts/SearchContext';
import { setupChannel, solicitarPermissao } from '@/services/notifications';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { Done } from './(tabs)/done';
import { Todo } from './(tabs)/todo';
import { styles } from './styles';

const Tab = createMaterialTopTabNavigator();
function TaskTabs() {
  const { search, setSearch } = useSearch();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.titleContainer}><Text style={styles.title}>Tasks</Text></View>
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <MaterialIcons size={32} name="search" color={colors.blue[800]} />
        </TouchableOpacity>
      </View>

      {isVisible && (

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.searchInputContainer}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <TextInput
            placeholder="Search task by name"
            value={search}
            onChangeText={setSearch}
            autoFocus
            style={styles.searchInput}
          />
        </KeyboardAvoidingView>
      )}

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.gray[400] },
          tabBarIndicatorStyle: { backgroundColor: colors.blue[800] },
        }}
      >
        <Tab.Screen name="To-do" component={Todo} />
        <Tab.Screen name="Doing" component={Doing} />
        <Tab.Screen name="Done" component={Done} />
      </Tab.Navigator>
    </>
  );
}

export default function Index() {

  useEffect(() => {
    (async () => {
      await solicitarPermissao();
      await setupChannel();
    })();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <SearchProvider>
        <TaskTabs />
        <FloatingButton onPress={() => { router.navigate("/add") }} />
        <Toast />
      </SearchProvider>
    </SafeAreaView>
  );

}
