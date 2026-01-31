import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {BlurView} from "expo-blur"
import { StyleSheet } from "react-native";


export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const insets = useSafeAreaInsets();
  if (!isLoaded) return null; // for better user experience
  if (!isSignedIn) return <Redirect href={"/(auth)"} />;
    
  return (
    <Tabs
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: "#1DB954",
        tabBarInactiveTintColor: "#B3B3B3",
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom + 10,
          left: 20,
          right: 20,
          elevation: 5,
          marginHorizontal:50,
          backgroundColor: "#000000",
          borderRadius: 24,
          height: 60,
          paddingBottom: 5,
          overflow:"hidden"
        },
        tabBarBackground: () => (
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill}/>
        ),
        tabBarLabelStyle: {
          fontSize:12,
          fontWeight:600
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
