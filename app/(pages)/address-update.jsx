import { View, Text, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressUpdate = () => {

  // Get the item from the navigation
  const params = useLocalSearchParams();

  // conver the stringified object to JSON
  console.log("Address data : ", JSON.parse(params.data))
  const data = JSON.parse(params.data)

  const [form, setForm] = useState({
    name: data.name,
    phone: data.phone,
    address1: data.address1,
    address2: data.address2,
    city: data.city,
    state: data.state,
    district: data.district,
    pincode: data.pincode,
    landmark: data.landmark,
    type: data.type
  })

  // save address to server
  const updateAddress = () => {

    fetch('https://wonderwoods.aps.org.in/api/address/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: data.id,
        name: form.name,
        phone: form.phone,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        state: form.state,
        district: form.district,
        pincode: form.pincode,
        landmark: form.landmark,
        type: form.type
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          console.log('Success:', data);
          router.back();
        } else {
          console.log('Error:', data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <View className="w-full pt-11 px-4 flex flex-row justify-between relative bg-secondary-light">
        <Header
          showTitle={true}
          title="Update Address"
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
          className="px-5"
        >
          <View
            className="flex gap-y-2 pb-5"
          >
            <View>
              <FormField
                label="Full Name"
                placeholder="John Doe"
                type="text"
                value={form.name}
                handleChangeText={(value) => setForm({ ...form, name: value })}
                otherStyles="px-1"
              />
            </View>
            <View>
              <FormField
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                value={form.phone}
                handleChangeText={(value) => setForm({ ...form, phone: value })}
                otherStyles="px-1"
                keyboardType="phone-pad"
              />
            </View>

            <View>
              <FormField
                label="Address Line 1"
                placeholder="Enter your address"
                type="text"
                value={form.address1}
                handleChangeText={(value) => setForm({ ...form, address1: value })}
                otherStyles="px-1"
              />
            </View>

            <View>
              <FormField
                label="Address Line 2"
                placeholder="Enter your address"
                type="text"
                value={form.address2}
                handleChangeText={(value) => setForm({ ...form, address2: value })}
                otherStyles="px-1"
              />
            </View>

            <View className="flex flex-row justify-around">
              <FormField
                label="City"
                placeholder="City"
                type="text"
                value={form.city}
                handleChangeText={(value) => setForm({ ...form, city: value })}
                otherStyles="w-[45%]"
              />

              <FormField
                label="State"
                placeholder="State"
                type="text"
                value={form.state}
                handleChangeText={(value) => setForm({ ...form, state: value })}
                otherStyles="w-[45%]"
              />
            </View>

            <View className="flex flex-row justify-around">
              <FormField
                label="District"
                placeholder="District"
                type="text"
                value={form.district}
                handleChangeText={(value) => setForm({ ...form, district: value })}
                otherStyles="w-[45%]"
              />

              <FormField
                label="Pincode"
                placeholder="Pincode"
                type="text"
                value={form.pincode}
                handleChangeText={(value) => setForm({ ...form, pincode: value })}
                otherStyles="w-[45%]"
              />
            </View>

            <View>
              <FormField
                label="Landmark"
                placeholder="Landmark"
                type="text"
                value={form.landmark}
                handleChangeText={(value) => setForm({ ...form, landmark: value })}
                otherStyles="px-1"
              />
            </View>

            <View>
              <FormField
                label="Address Type"
                placeholder="Home/Office"
                type="text"
                value={form.type}
                handleChangeText={(value) => setForm({ ...form, type: value })}
                otherStyles="px-1"
              />
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
      <View
        className="fixed bottom-0"
      >
        <CustomButton
          title="UPDATE ADDRESS"
          containerStyles="w-full bg-primary rounded-sm"
          textStyles="text-lg text-white"
          handlePress={updateAddress}
        />
      </View>
    </>
  )
}

export default AddressUpdate