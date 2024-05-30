import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
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

  const [catergory, setCategory] = useState([])
  const [subcatergories, setSubcategories] = useState([])
  const [selectedSubCategory, setSelectedSubCategory] = useState(subcatergories[0]);
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Get the subcategories and products
  useEffect(() => {
    fetch('http://wonderwoods.aps.org.in/api/category/' + categoryId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setCategory(data.data.category);
        setSubcategories(data.data.category['subcategories']);
        setProducts(data.data.category['subcategories'][0]['products']);

        handleSubCategoryChange(data.data.category['subcategories'][0]);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])

  const handleSubCategoryChange = (subcategory) => {
    console.log("Sub category changed")
    // change the sub category title
    console.log("Sub category : ", subcategory);
    setSelectedSubCategory(subcategory);
    setProducts(subcategory.products);
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
          title={catergory.name}
          showBackButton={true}
          showNotificationIcon={true}
          showSearchBar={false}
          searchBarEditable={false}
        />
      </View>
      {isLoading && (
        <View
          className="flex flex-1 items-center justify-center bg-white"
        >
          <Text
            className="text-[20px] font-psemibold text-primary-dark"
          >
            Loading...
          </Text>
        </View>
      )}

      {
        !isLoading && (
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
                {products.map(product => (
                  <ProductVertical
                    item={product}
                  />
                ))}

              </View>

            </View>

          </SafeAreaView>
        )}

    </>
  )
}

export default Category