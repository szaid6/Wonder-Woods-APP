import { View, Text, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import Header from '../../components/Header'
import images from '../../constants/images'
// file picker
import * as ImagePicker from 'expo-image-picker';

const ProfileDetails = () => {
    const [form, setForm] = useState({
        image: null,
        name: 'Sayed Zaid',
        phone: '8433885667',
        email: 'szaid444666@gmail.com',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const updateProfile = () => {
        console.log('updating profile');
    }

    const { image, setImage } = useState(null);

    const handleFilePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setForm({ ...form, image: result['assets'][0]['uri'] });
        }

        console.log('image uri', form.image);
    }

    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between relative bg-secondary-light">
                <Header
                    showTitle={true}
                    title="Update Profile"
                    showBackButton={true}
                    showNotificationIcon={true}
                    showSearchBar={false}
                    searchBarEditable={false}
                />
            </View>
            <SafeAreaView
                className="w-full flex-1 bg-white "
            >
                <ScrollView
                    className=""
                >
                    <View className="flex items-center px-5 justify-center w-full min-h-[90vh]">
                        <TouchableWithoutFeedback
                            onPress={handleFilePicker}
                        >
                            <Image
                                source={form.image ? { uri: form.image } : images.blank}
                                className="w-36 h-36 mb-[50px] rounded-md"
                                resizeMode='cover'
                            />
                        </TouchableWithoutFeedback>
                        <View className="w-full">
                            <View className="flex items-center w-full py-4 bg-secondary-lighter">
                                <Text className="text-3xl mb-10 text-tertiary font-psemibold">Update Profile</Text>

                                {/* Name field */}
                                <FormField
                                    label=""
                                    placeholder="Enter your name"
                                    type="text"
                                    value={form.name}
                                    handleChangeText={(value) => setForm({ ...form, name: value })}
                                    otherStyles="mb-5 w-80"
                                    externalIcon="userOutline"
                                />

                                {/* Phone field */}
                                <FormField
                                    label=""
                                    placeholder="Enter your phone number"
                                    type="tel"
                                    value={form.email}
                                    handleChangeText={(value) => setForm({ ...form, email: value })}
                                    otherStyles="mb-5 w-80"
                                    keyboardType="phone-pad"
                                    externalIcon="phone"
                                />

                                {/* Email field */}
                                <FormField
                                    label=""
                                    placeholder="Enter your email"
                                    type="email"
                                    value={form.email}
                                    handleChangeText={(value) => setForm({ ...form, email: value })}
                                    otherStyles="mb-5 w-80"
                                    externalIcon="mail"
                                />

                                {/* Login Button */}
                                <CustomButton
                                    title="UPDATE"
                                    containerStyles="w-3/4 mt-8 mb-5"
                                    textStyles="text-lg text-tertiary-light"
                                    handlePress={updateProfile}
                                    isLoading={isSubmitting}
                                >
                                </CustomButton>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            {/* <View
                className="fixed bottom-0"
            >
                <CustomButton
                    title="UPDATE PROFILE"
                    containerStyles="w-full bg-primary rounded-sm"
                    textStyles="text-lg text-white"
                    handlePress={() => router.push('address')}
                />
            </View> */}
        </>
    )
}

export default ProfileDetails