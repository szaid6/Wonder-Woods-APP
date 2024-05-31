import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import EmptyPage from '../../components/EmptyPage'
import images from '../../constants/images'
import CartItem from '../../components/CartItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native';

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const isFocused = useIsFocused();

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((user) => {
        const userData = JSON.parse(user)
        fetch('http://wonderwoods.aps.org.in/api/wishlist?userId=' + userData.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 200) {
              console.log('Success:', data);
              setWishlist(data.data);
              setIsLoading(false);
            } else {
              console.error('Error:', data);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      })
  }, [isFocused]);

  const openProductDetails = (productId) => {
    // stringified object
    console.log('====================================');
    console.log('Open Product Details', productId);
    console.log('====================================');
    // router.push('product-details', { id: item.product.id })
  }

  return (
    <>
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
          <View
            className="flex-1 px-2 bg-white"
          >
            <FlatList
              data={wishlist}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <EmptyPage
                  image={images.emptyWishlist}
                  title="You got everything"
                  subTitle="Browse Products"
                  handlePress={() => router.push('home')}
                />
              )}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={openProductDetails.bind(this, item.products.id)}
                  activeOpacity={1}
                >
                  { /* log the item */
                    console.log('item', item)
                  }
                  <CartItem
                    item={item}
                    showQty={false}
                    showDeleteCart={false}
                    showDeleteWishlist={true}
                    showAddToWishlist={false}
                    showMoveToCart={true}
                  />
                </TouchableOpacity>
              )}
            >
            </FlatList>

          </View>
        )}
    </>
  )
}

export default Wishlist