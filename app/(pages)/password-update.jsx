import { View, Text, SafeAreaView, ScrollView, Image, Alert, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordUpdate = () => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((user) => {
                const userData = JSON.parse(user)
                console.log('userData', userData);
                setUser(userData);
            })
    }, []);

    const [form, setForm] = useState({
        userId: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const updatePassword = () => {

        // check if all the fields are filled
        if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
            // Display toast notification for empty fields
            ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
            return;
        }

        // Check if new password and confirm password match
        if (form.newPassword !== form.confirmPassword) {
            // Display toast notification for password mismatch
            ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
            return;
        }


        setIsSubmitting(true);

        // Prepare data for API request
        const data = {
            userId: user.id,
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
        };

        // Make API request to reset password
        fetch('https://wonderwoods.aps.org.in/api/profile/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if (data.status !== 200) {
                    // Display toast notification for error message
                    ToastAndroid.show(data.message, ToastAndroid.SHORT);
                    return;
                } else {
                    // Display toast notification for success message
                    console.log('Success:', data);
                    ToastAndroid.show(data.message, ToastAndroid.SHORT);
                    router.back();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Display toast notification for unexpected error
                ToastAndroid.show('An unexpected error occurred', ToastAndroid.SHORT);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between relative bg-secondary-light">
                <Header
                    showTitle={true}
                    title="Update Password"
                    showBackButton={true}
                    showNotificationIcon={true}
                    showSearchBar={false}
                    searchBarEditable={false}
                />
            </View>
            <SafeAreaView className="w-full flex-1 bg-white">
                <ScrollView>
                    <View className="flex items-center px-5 justify-center w-full min-h-[90vh]">
                        <Image source={images.logo} className="w-36 h-36 mb-[50px] rounded-md" resizeMode='contain' />
                        <View className="w-full">
                            <View className="flex items-center w-full py-4 bg-secondary-lighter">
                                <Text className="text-3xl mb-10 text-tertiary font-psemibold">Update Password</Text>

                                <FormField
                                    label=""
                                    placeholder="Enter old password"
                                    type="password"
                                    value={form.oldPassword}
                                    handleChangeText={value => setForm({ ...form, oldPassword: value })}
                                    otherStyles="mb-5 w-80"
                                    secureTextEntry={true}
                                    externalIcon="lock"
                                />

                                <FormField
                                    label=""
                                    placeholder="Enter new password"
                                    type="password"
                                    value={form.newPassword}
                                    handleChangeText={value => setForm({ ...form, newPassword: value })}
                                    otherStyles="mb-5 w-80"
                                    secureTextEntry={true}
                                    externalIcon="lock"
                                />

                                <FormField
                                    label=""
                                    placeholder="Confirm new password"
                                    type="password"
                                    value={form.confirmPassword}
                                    handleChangeText={value => setForm({ ...form, confirmPassword: value })}
                                    otherStyles="mb-5 w-80"
                                    secureTextEntry={true}
                                    externalIcon="lock"
                                />

                                {/* Update Button */}
                                <CustomButton
                                    title="UPDATE"
                                    containerStyles="w-3/4 mt-8 mb-5"
                                    textStyles="text-lg text-tertiary-light"
                                    handlePress={updatePassword}
                                    isLoading={isSubmitting}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default PasswordUpdate;
