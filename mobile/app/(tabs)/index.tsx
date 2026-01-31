import SafeScreen from "@/components/SafeScreen";
import { View, Text, ScrollView } from "react-native";


export default function ShopScreen() {
    return(
        <SafeScreen>
            <ScrollView 
                className="flex-1"
                contentContainerStyle={{paddingBottom:100}}
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}
                <View>
                    
                </View>

            </ScrollView>
        </SafeScreen>
    )
}