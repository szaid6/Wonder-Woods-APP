import { View, Text, FlatList, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import icons from '../../constants/icons';
import EmptyPage from '../../components/EmptyPage';
import images from '../../constants/images';
import { router } from 'expo-router';

import { API_BASE_URL } from '@env';


const Search = () => {
    const [searchResults, setSearchResults] = useState([]);

    // Function to handle changes in the search query
    const handleSearchQueryChange = async (query) => {
        try {
            console.log('Search query1:', query);
            // Perform search operation here
            const response = await fetch(`${API_BASE_URL}/search?query=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.status === 200) {
                console.log('Search results:', data.data);
                setSearchResults(data.data);
            } else {
                console.error('Error:', data);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }

    };
    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between  bg-secondary-light">
                <Header
                    showTitle={false}
                    title=""
                    showBackButton={true}
                    showNotificationIcon={true}
                    showSearchBar={true}
                    searchBarEditable={true}
                    onSearchQueryChange={handleSearchQueryChange}
                />
            </View>
            <SafeAreaView className="w-full px-4 flex-1 ">
                {/* show results in a flatlist */}
                <FlatList
                    data={searchResults}
                    ListEmptyComponent={
                        <EmptyPage
                            image={images.search}
                            title="Looking for something?"
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onPress={() => router.push({
                                pathname: 'product-detail',
                                params: {
                                    id: item.id
                                }
                            })}
                        >
                            <View className="flex flex-row border-b gap-x-3 border-gray-200 py-3">
                                <Image
                                    source={icons.search}
                                    className="w-6 h-6"
                                    resizeMode='contain'
                                    tintColor={'#bd3e11'}
                                />
                                <Text className="text-[16px] font-pmedium text-primary-dark">{item.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />
            </SafeAreaView>

        </>
    )
}

export default Search