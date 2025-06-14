import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header bar too, optional
      }}
    />
  );
}
