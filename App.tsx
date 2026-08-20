import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [greeting, setGreeting] = useState('Hello World');

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{greeting}</Text>
      <Pressable style={styles.button} onPress={() => setGreeting('Awesome')}>
        <Text style={styles.buttonLabel}>Make it awesome</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
