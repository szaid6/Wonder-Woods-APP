import { View, Text, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import images from '../../constants/images';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const ProfileDetails = () => {
    const [form, setForm] = useState({
        image: null,
        name: null,
        phone: null,
        email: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((user) => {
                const userData = JSON.parse(user);
                console.log('userData', userData);
                setUser(userData);

                setForm({
                    ...form,
                    image: 'http://wonderwoods.aps.org.in/' + userData.profileImage,
                    name: userData.name,
                    phone: userData.phone,
                    email: userData.email
                });
            });
    }, []);

    const updateProfile = async () => {
        console.log('updating profile');
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            if (form.image) {
                const fileInfo = await FileSystem.getInfoAsync(form.image);
                const fileUriParts = form.image.split('/');
                const fileName = fileUriParts[fileUriParts.length - 1];

                formData.append('image', {
                    uri: form.image,
                    name: fileName,
                    type: 'image/jpeg'
                });
            }

            formData.append('userId', user.id);
            formData.append('name', form.name);
            formData.append('phone', form.phone);
            formData.append('email', form.email);

            console.log('formData', formData);

            const response = await fetch('http://wonderwoods.aps.org.in/api/profile/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Profile updated successfully');
                console.log('Profile updated successfully', data.data.user);
                // Save updated user data to AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
            } else {
                console.log('Failed to update profile', data);
                Alert.alert('Error', data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.log('Error updating profile', error);
            Alert.alert('Error', 'An error occurred while updating profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFilePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            setForm({ ...form, image: result.assets[0].uri });
        }
    };

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
            <SafeAreaView className="w-full flex-1 bg-white ">
                <ScrollView className="">
                    <View className="flex items-center px-5 justify-center w-full min-h-[90vh]">
                        <TouchableWithoutFeedback onPress={handleFilePicker}>
                            <Image
                                source={form.image ? { uri: form.image } : images.blank}
                                className="w-36 h-36 mb-[50px] rounded-md"
                                resizeMode='cover'
                            />
                        </TouchableWithoutFeedback>
                        <View className="w-full">
                            <View className="flex items-center w-full py-4 bg-secondary-lighter">
                                <Text className="text-3xl mb-10 text-tertiary font-psemibold">Update Profile</Text>

                                <FormField
                                    label=""
                                    placeholder="Enter your name"
                                    type="text"
                                    value={form.name}
                                    handleChangeText={(value) => setForm({ ...form, name: value })}
                                    otherStyles="mb-5 w-80"
                                    externalIcon="userOutline"
                                />

                                <FormField
                                    label=""
                                    placeholder="Enter your phone number"
                                    type="tel"
                                    value={form.phone}
                                    handleChangeText={(value) => setForm({ ...form, phone: value })}
                                    otherStyles="mb-5 w-80"
                                    keyboardType="phone-pad"
                                    externalIcon="phone"
                                />

                                <FormField
                                    label=""
                                    placeholder="Enter your email"
                                    type="email"
                                    value={form.email}
                                    handleChangeText={(value) => setForm({ ...form, email: value })}
                                    otherStyles="mb-5 w-80"
                                    externalIcon="mail"
                                />

                                <CustomButton
                                    title="UPDATE"
                                    containerStyles="w-3/4 mt-8 mb-5"
                                    textStyles="text-lg text-tertiary-light"
                                    handlePress={updateProfile}
                                    isLoading={isSubmitting}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export default ProfileDetails;
