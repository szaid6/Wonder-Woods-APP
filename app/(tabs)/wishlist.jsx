import { View, Text, FlatList, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import EmptyPage from '../../components/EmptyPage';
import images from '../../constants/images';
import CartItem from '../../components/CartItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Wishlist = () => {
  const [user, setUser] = useState({});
  const [wishlist, setWishlist] = useState([]);
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
      fetchWishlist(userData.id);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
    }
  };

  const fetchWishlist = async (userId) => {
    try {
      const response = await fetch(`https://wonderwoods.aps.org.in/api/wishlist?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        setWishlist(data.data);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openProductDetails = (productId) => {
    console.log('Open Product Details', productId);
    // router.push('product-details', { id: item.product.id });
  };

  const toggleCart = async (id) => {
    try {
      const response = await fetch(`https://wonderwoods.aps.org.in/api/cart/add`, {
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
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        fetchWishlist(user.id);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const toggleWishlist = async (id) => {
    try {
      const response = await fetch(`https://wonderwoods.aps.org.in/api/wishlist/add`, {
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
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        fetchWishlist(user.id);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error removing wishlist item:', error);
    }
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
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openProductDetails(item.products?.id)}
            activeOpacity={1}
          >
            {item.products && (
              <CartItem
                item={item}
                showQty={false}
                showDeleteCart={false}
                handleDeleteCart={() => toggleCart(item.products.id)}
                showDeleteWishlist={true}
                handleDeleteWishlist={() => toggleWishlist(item.products.id)}
                showAddToWishlist={false}
                handleAddToWishlist={() => toggleWishlist(item.products.id)}
                showMoveToCart={true}
                handleMoveToCart={() => toggleCart(item.products.id)}
              />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Wishlist;
