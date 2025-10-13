import { colors } from "@/constants/colors";
import { useDrizzleStudio } from "@/hooks/useDrizzleStudioPlugin";
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from "expo-router";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import migrations from '../../drizzle/migrations';
export const DATABASE_NAME = 'todo.db';

export default function Layout() {


  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb)

  const { success, error } = useMigrations(db, migrations)
  useDrizzleStudio(expoDb)
  if (!success && !error) {
    return (
      <ActivityIndicator size="large" />
    )
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.gray[400] }
          }}
        >
          <Stack.Screen
            name="index/index"
          />
          <Stack.Screen
            name="add/index"
          />
          {/* <Stack.Screen
            name="update/index"
          />
          <Stack.Screen
            name="report/index"
          /> */}
        </Stack>
      </SQLiteProvider>
    </Suspense>
  )

}
