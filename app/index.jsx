import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';



export default function App() {

    const { isLoading, isAuthenticated } = useGlobalContext();
    if (!isLoading && isAuthenticated) return <Redirect href="/home" />

    return (
        <SafeAreaView className="h-full" >
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full items-center justify-center h-full px-4">
                    <Image
                        source={images.onboarding1}
                        className="w-[350px] h-[350px]"
                        resizeMode='contain'
                    />
                    <Text className="text-primary-light text-xl font-pbold text-center mt-4">
                        Discover a world where comfort meets style with {''}
                        <Text className="text-primary-dark text-xl font-bold text-center">
                            Wonder Woods 
                        </Text>
                    </Text>

                    {/* Onboarding text */}
                    <Text className="text-center my-4 text-gray-500 font-pregular">
                        Customize your space with pieces that tell your story. Design your dream home, one room at a time.
                    </Text>

                    {/* Continue to app btn */}
                    <CustomButton
                        title="Continue to app"
                        containerStyles="w-full bg-primary"
                        textStyles="text-lg text-white"
                        handlePress={() => { router.replace('/sign-in') }}
                    >
                    </CustomButton>
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
} 
