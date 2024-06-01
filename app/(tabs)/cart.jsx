import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import EmptyPage from '../../components/EmptyPage';
import CartItem from '../../components/CartItem';
import images from '../../constants/images';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

  const fetchUserData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const userData = JSON.parse(user);
      setUser(userData);
      fetchCart(userData.id);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
    }
  };

  const fetchCart = async (userId) => {
    try {
      const response = await fetch(`http://wonderwoods.aps.org.in/api/cart?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setCart(data.data);
        calculateTotal(data.data);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
    setCartTotal(total);
  };

  const updateQuantity = async (productId, qty) => {
    const updatedCart = cart.map(item => {
      if (item.productId === productId) {
        return { ...item, qty };
      }
      return item;
    });
    setCart(updatedCart);
    calculateTotal(updatedCart);

    if (qty === 0) {
      toggleCart(productId);
    }

    // Optionally, update the backend or local storage
    await updateCartInBackend(user.id, productId, qty);
  };

  const updateCartInBackend = async (userId, productId, qty) => {
    console.log('Update Cart in Backend', userId, productId, qty);
    try {
      const response = await fetch(`http://wonderwoods.aps.org.in/api/cart/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          qty: qty
        }),
      });
      const data = await response.json();
      if (data.status !== 200) {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const toggleCart = async (id) => {
    try {
      const response = await fetch(`http://wonderwoods.aps.org.in/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          productId: id,
        }),
      });
      const data = await response.json();
      if (data.status === 200 || data.status === 400) {
        toggleWishlist(id);
        // ToastAndroid.show(data.message, ToastAndroid.SHORT);
        fetchCart(user.id);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const toggleWishlist = async (id) => {
    try {
      const response = await fetch(`http://wonderwoods.aps.org.in/api/wishlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          productId: id,
        }),
      });
      const data = await response.json();
      if (data.status === 200 || data.status === 400) {
        // ToastAndroid.show(data.message, ToastAndroid.SHORT);
        fetchCart(user.id);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error removing wishlist item:', error);
    }
  };

  const openProductDetails = (productId) => {
    console.log('Open Product Details', productId);
    // router.push('product-details', { id: item.product.id })
  };

  const checkout = (cart) => {
    console.log('Checkout', cart);
    router.push({
      pathname: 'checkout',
      params: {
        cart: cart
      }
    });
  };

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-[20px] font-psemibold text-primary-dark">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-2 bg-white">
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyPage
            image={images.emptyCart}
            title="Your Cart is Empty"
            subTitle="Browse Products"
            handlePress={() => router.push('home')}
          />
        }
        ListHeaderComponent={
          <View className="flex mx-2 my-5 rounded-md px-4 py-3 bg-secondary-lighter">
            <View className="flex flex-row justify-between items-center ">
              <Text className="text-[16px] font-pmedium text-primary-dark">Subtotal</Text>
              <Text className="text-[12px] font-psemibold text-primary">₹
                <Text className="text-[18px] font-psemibold text-primary-dark">
                  {cartTotal.toLocaleString('en-IN')}
                </Text>
              </Text>
            </View>
            <CustomButton
              title={`Proceed to Buy (${cart.length} items)`}
              handlePress={checkout.bind(this, cart)}
              containerStyles="mt-3 rounded-md bg-secondary-light"
              textStyles="text-tertiary-light font-psemibold text-[16px]"
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={openProductDetails.bind(this, item.products.id)}
            activeOpacity={1}
          >
            <CartItem
              item={item}
              showQty={true}
              handlePlusCount={() => updateQuantity(item.productId, item.qty + 1)}
              handleMinusCount={() => updateQuantity(item.productId, item.qty - 1)}
              showDeleteCart={true}
              handleDeleteCart={() => toggleCart(item.products.id)}
              showDeleteWishlist={false}
              showAddToWishlist={true}
              handleAddToWishlist={() => toggleWishlist(item.products.id)}
              showMoveToCart={false}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Cart;
