import { ClerkProvider, useAuth, useUser } from '@clerk/expo';
import { AuthView, UserButton } from '@clerk/expo/native';
import { tokenCache } from '@clerk/expo/token-cache';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function Screen() {
  const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false });
  const { user } = useUser();

  if (!isLoaded) {
    return <View style={styles.container} />;
  }

  if (!isSignedIn) {
    return (
      <View style={styles.container}>
        <AuthView isDismissible={false} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <UserButton />
      </View>
      <View style={styles.body}>
        <Text style={styles.greeting}>
          Signed in as {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Screen />
      <StatusBar style="auto" />
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
