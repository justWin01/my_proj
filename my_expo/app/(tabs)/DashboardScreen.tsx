import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      {/* ✅ Full-width Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image
          
          />
          <Text style={styles.username}>John Doe</Text>
        </View>
      </View>

      {/* Main Dashboard Content */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Welcome to the Dashboard!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    height: 50, // ✅ Increased to fit avatar + username comfortably
    backgroundColor: '#f0f0f5',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // or 'flex-start' if you want both left-aligned
  },

  username: {
    fontSize: 18,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
