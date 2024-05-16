import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useMemo, useState } from 'react'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import Icon from '../../components/Icon'
import images from '../../constants/images'
import ProductVertical from '../../components/ProductVertical'

const Category = () => {

  // Get the item from the navigation
  const params = useLocalSearchParams();

  // conver the stringified object to JSON
  console.log("Category data : ", JSON.parse(params.id))
  const categoryId = JSON.parse(params.id)

  const subcatergories = [
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
  ]

  const products = [
    {
      id: 1,
      categoryId: 1,
      subcategoryId: 1,
      image: images.logo,
      title: 'Product 1',
      tag: 'New Arrival',
      price: '10000',
      mrp: '12000',
      colors: [
        {
          id: 1,
          color: '#000000',
        },
        {
          id: 2,
          color: '#0000FF',
        },
        {
          id: 3,
          color: '#FF0000',
        },
      ]
    },
    {
      id: 2,
      categoryId: 1,
      subcategoryId: 1,
      image: images.logo,
      title: 'Product 2',
      tag: 'New',
      price: '20000',
      mrp: '22000',
      colors: [
        {
          id: 1,
          color: '#000000',
        },
        {
          id: 2,
          color: '#0000FF',
        },
        {
          id: 3,
          color: '#FF0000',
        },
      ]
    },
    {
      id: 3,
      categoryId: 2,
      subcategoryId: 3,
      image: images.logo,
      title: 'Product 3',
      tag: 'Discounted',
      price: '30000',
      mrp: '32000',
      colors: [
        {
          id: 1,
          color: '#000000',
        },
        {
          id: 2,
          color: '#0000FF',
        },
        {
          id: 3,
          color: '#FF0000',
        },
      ]
    },
    {
      id: 4,
      categoryId: 2,
      subcategoryId: 4,
      image: images.logo,
      title: 'Product 4',
      tag: 'Latest',
      price: '40000',
      mrp: '42000',
      colors: [
        {
          id: 1,
          color: '#000000',
        },
        {
          id: 2,
          color: '#0000FF',
        },
        {
          id: 3,
          color: '#FF0000',
        },
      ]
    },
    {
      id: 5,
      categoryId: 3,
      subcategoryId: 5,
      image: images.logo,
      title: 'Product 5',
      tag: 'Branded',
      price: '50000',
      mrp: '52000',
      colors: [
        {
          id: 1,
          color: '#000000',
        },
        {
          id: 2,
          color: '#0000FF',
        },
        {
          id: 3,
          color: '#FF0000',
        },
      ]
    }
  ]

  const [selectedSubCategory, setSelectedSubCategory] = useState(subcatergories[0]);

  const subCategoryProducts = products.filter(product => product.subcategoryId === selectedSubCategory.id);

  const handleSubCategoryChange = (subcategory) => {
    console.log("Sub category changed")
    // change the sub category title
    console.log("Sub category : ", subcategory);
    setSelectedSubCategory(subcategory);
  }

  // Memoize the filtered products count
  const selectedSubCategoryProductsCount = useMemo(() => {
    return selectedSubCategory ? products.filter(product => product.subcategoryId === selectedSubCategory.id).length : 0;
  }, [selectedSubCategory]);

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
        className="w-full pb-5 flex-1 bg-white"
      >
        <View>
          {/* Categories */}
          <FlatList
            data={subcatergories}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={handleSubCategoryChange.bind(this, item)}
                activeOpacity={1}
              >
                <Icon
                  item={item}
                  index={index}
                  selectableFrame={selectedSubCategory && selectedSubCategory.id === item.id}
                />
              </TouchableOpacity>
            )}
          />

          {/* Products */}

          <View>

            {/* Products Header */}
            <View
              className="w-full flex bg-secondary-light justify-between items-center px-4 py-3 mt-3"
            >
              <Text
                className="text-lg font-psemibold text-primary-dark"
              >
                {selectedSubCategory ? selectedSubCategory.name : 'All Products'}
              </Text>
              <View>
                <Text
                  className="text-sm font-psemibold text-primary-dark"
                >
                  {selectedSubCategoryProductsCount}
                  <Text>
                    {' '}Products
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Products */}
          <View className="flex flex-row flex-wrap justify-between px-4">
            {subCategoryProducts.map(product => (
              <ProductVertical
                item={product}
              />
            ))}

          </View>

        </View>

      </SafeAreaView>
    </>
  )
}

export default Category