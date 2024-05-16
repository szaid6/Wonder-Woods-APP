import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import EmptyPage from '../../components/EmptyPage'
import images from '../../constants/images'
import CartItem from '../../components/CartItem'

const Wishlist = () => {
  const wishlist = [{
    id: 1,
    productId: 1,
    price: 10000,
    product: {
      id: 1,
      image: images.logo,
      title: 'Product 1 name will be here so that it can be displayed properly in the UI',
      tag: 'New Arrival',
      price: '9000',
      mrp: '12000'
    }
  },
  {
    id: 2,
    productId: 2,
    price: 20000,
    product: {
      id: 2,
      image: images.logo,
      title: 'Product 2',
      tag: 'New',
      price: '22000',
      mrp: '23000'
    }
  },
  ]

  const openProductDetails = (productId) => {
    // stringified object
    console.log('====================================');
    console.log('Open Product Details', productId);
    console.log('====================================');
    // router.push('product-details', { id: item.product.id })
  }

  return (
    <>
      {wishlist.length == 0 && (
        <EmptyPage
          image={images.emptyWishlist}
          title="You got everything"
          subTitle="Browse Products"
          handlePress={() => router.push('home')}
        />
      )}


      <FlatList
        data={wishlist}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={openProductDetails.bind(this, item.product.id)}
            activeOpacity={1}
          >
            { /* log the item */
              console.log('item', item)
            }
            <CartItem
              item={item}
              showQty={false}
              showDelete={true}
              showAddToWishlist={false}
              showMoveToCart={true}
            />
          </TouchableOpacity>
        )}
      >
      </FlatList>
    </>
  )
}

export default Wishlist