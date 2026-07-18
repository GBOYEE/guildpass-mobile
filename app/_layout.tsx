import { Stack } from "expo-router";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient } from "../src/lib/queryClient";
import { asyncStoragePersister } from "../src/lib/queryPersister";
import { isPersistableQuery, QUERY_GC_TIME_MS } from "../src/lib/offlineCache";
import { initConnectivityService } from "../src/features/network/connectivityService";
import { ErrorBoundary } from "../src/components/ErrorBoundary";
import { ThemeProvider, useTheme } from "../src/features/theme";

initConnectivityService();

function ThemedStack() {
  const { isDark } = useTheme();
  const backgroundColor = isDark ? "#0f172a" : "#f8fafc";

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="guilds" />
      <Stack.Screen name="guilds/[guildId]" />
      <Stack.Screen name="access-check" />
      <Stack.Screen name="access-scanner" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="deep-link-error" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: asyncStoragePersister,
          maxAge: QUERY_GC_TIME_MS,
          dehydrateOptions: {
            shouldDehydrateQuery: (query) =>
              query.state.status === "success" && isPersistableQuery(query.queryKey),
          },
        }}
      >
        <ThemeProvider>
          <ThemedStack />
        </ThemeProvider>
      </PersistQueryClientProvider>
    </ErrorBoundary>
  );
}
