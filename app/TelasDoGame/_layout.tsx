import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jogo da Velha',
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="registrationScreen"
        options={{
          title: 'Jogo da Velha',
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="detailsScreen"
        options={{
          title: 'Tela de Detalhes',
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
