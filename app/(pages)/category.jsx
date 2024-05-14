import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import Icon from '../../components/Icon'

const Category = () => {



  // Get the item from the navigation
  const params = useLocalSearchParams();

  // conver the stringified object to JSON
  console.log("Category data : ", JSON.parse(params.id))
  const categoryId = JSON.parse(params.id)

  return (
    <>
      <View className="w-full pt-11 px-4 flex flex-row justify-between  bg-secondary-light">
        <Header
          showTitle={true}
          title={"Category " + categoryId}
          showBackButton={true}
          showNotificationIcon={true}
          showSearchBar={false}
          searchBarEditable={false}
        />
      </View>
      <SafeAreaView
        className="w-full flex-1 pb-5 bg-white"
      >
        {/* Categories */}
        <FlatList
          data={[
            { id: 1, name: 'Sub Category 1', slug: 'sub-category-1' },
            { id: 2, name: 'Sub Category 2', slug: 'sub-category-2' },
            { id: 3, name: 'Sub Category 3', slug: 'sub-category-3' },
            { id: 4, name: 'Sub Category 4', slug: 'sub-category-4' },
            { id: 5, name: 'Sub Category 5', slug: 'sub-category-5' },
            { id: 6, name: 'Sub Category 6', slug: 'sub-category-6' },
            { id: 7, name: 'Sub Category 7', slug: 'sub-category-7' },
            { id: 8, name: 'Sub Category 8', slug: 'sub-category-8' },
            { id: 9, name: 'Sub Category 9', slug: 'sub-category-9' },
            { id: 10, name: 'Sub Category 10', slug: 'sub-category-10' },
          ]}
          keyExtractor={(item) => item.$id}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: 'subcategory',
                params: {
                  id: item.id
                }
              })}
              activeOpacity={1}
            >
              <Icon
                item={item}
                index={index}
                selectableFrame={ index === 0 ? true : false }
              />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </>
  )
}

export default Category