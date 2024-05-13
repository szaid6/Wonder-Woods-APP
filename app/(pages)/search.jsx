import { View, Text, FlatList, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import icons from '../../constants/icons';
import EmptyPage from '../../components/EmptyPage';
import images from '../../constants/images';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle changes in the search query
    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
        // You can perform any other actions you need with the search query here

        console.log('Search query in search page:', query);

    };
    return (
        <>
            <View className="w-full pt-11 px-4 flex flex-row justify-between  bg-secondary-light">
                <Header
                    showTitle={false}
                    title=""
                    showBackButton={false}
                    showNotificationIcon={true}
                    showSearchBar={true}
                    searchBarEditable={true}
                    onSearchQueryChange={handleSearchQueryChange}
                />
            </View>
            <SafeAreaView className="w-full px-4 flex-1 ">
                {/* show results in a flatlist */}
                <FlatList
                    data={[
                        { id: 1, title: 'Search Result 1' },
                        { id: 2, title: 'Search Result 2' },
                        { id: 3, title: 'Search Result 3' },
                        { id: 4, title: 'Search Result 4' },
                        { id: 5, title: 'Search Result 5' },
                        { id: 6, title: 'Search Result 6' },
                        { id: 7, title: 'Search Result 7' },
                        { id: 8, title: 'Search Result 8' },
                        { id: 9, title: 'Search Result 9' },
                        { id: 10, title: 'Search Result 10' },
                    ]}
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
                            onPress={() => console.log('Search result clicked')}
                        >
                            <View className="flex flex-row border-b gap-x-3 border-gray-200 py-3">
                                <Image
                                    source={icons.search}
                                    className="w-6 h-6"
                                    resizeMode='contain'
                                    tintColor={'#bd3e11'}
                                />
                                <Text className="text-[16px] font-pmedium text-primary-dark">{item.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />
            </SafeAreaView>

        </>
    )
}

export default Search