import useSocialAuth from "@/hooks/useSocialHook";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function AuthScreen() {
  const { loadingStrategy, handleSocialAuth } = useSocialAuth();

  return (
    <View className="flex-1 px-8r justify-center items-center bg-white">
      <Image
        source={require("../../assets/images/auth-image.png")}
        className="size-96"
        resizeMode="contain"
      />
      <View className="gap-2 mt-4">
        <TouchableOpacity
          onPress={() => handleSocialAuth("oauth_google")}
          disabled={loadingStrategy !== null}
          className="flex-row items-center justify-center bg-white border px-12 py-3 border-gray-300 rounded-full shadow shadow-slate-400"
        >
          {loadingStrategy === "oauth_google" ? (
            <ActivityIndicator size={"small"} color={"#4285f4"} />
          ) : (
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../../assets/images/google.png")}
                className="size-10 mr-3"
                resizeMode="contain"
              />
              <Text className="text-black text-base font-medium">
                Continue With Google
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSocialAuth("oauth_apple")}
          disabled={loadingStrategy !== null}
          className="flex-row items-center justify-center bg-white border px-12 py-4 border-gray-300 rounded-full shadow shadow-slate-400"
        >
          {loadingStrategy === "oauth_apple" ? (
            <ActivityIndicator size={"small"} color={"#4285f4"} />
          ) : (
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../../assets/images/apple.png")}
                className="size-8 mr-3"
                resizeMode="contain"
              />
              <Text className="text-black text-base font-medium">
                Continue With Apple
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text className="text-center text-gray-500 text-xs leading-4 mt-6 px-2">
          By Signing up, you agree to our <Text className="text-blue-500 ">Terms</Text>, 
          <Text className="text-blue-500"> Privacy Policy </Text> 
          and 
          <Text className="text-blue-500"> Cookie Use</Text>.
      </Text>
    </View>
  );
}
