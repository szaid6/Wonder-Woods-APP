import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'

const Search = () => {
  const snapPoints = ['25%', '50%', '75%']
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <ScrollView>
        <View className="w-full h-12 px-4 flex flex-row items-center bg-secondary-lighter">
          <Text className="text-xs text-primary font-pregular">No Address Selected</Text>
          <Text className="text-xs text-primary-dark font-psemibold"> - Change?</Text>
        </View>
      </ScrollView>

      <BottomSheet snapPoints={snapPoints}
        className="fixed bottom-0 left-0 right-0 w-full h-96 bg-white"
      />
    </GestureHandlerRootView>

  )
}

export default Search