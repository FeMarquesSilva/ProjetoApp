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
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                    // Ocultando a barra de abas nesta tela específica
                    tabBarStyle: { display: 'none' }, // Oculta a barra de guias para a tela 'index'
                }}
            />
            <Tabs.Screen
                name="jogoDaVelha"
                options={{
                    title: 'Jogo da Velha',
                    tabBarStyle: { display: 'none' },
                }} />
            <Tabs.Screen
                name="jogoDosPassos"
                options={{
                    title: 'jogoDosPassos',
                    tabBarStyle: { display: 'none' },
                }} />
        </Tabs>
    );
}