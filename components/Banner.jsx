import { View, Text, FlatList, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import images from '../constants/images';


const zoomIn = {
    0: {
        // opacity: 0.9,
        scale: 0.9,
    },
    1: {
        // opacity: 1.1,
        scale: 1.1,
    },
}

const zoomOut = {
    0: {
        // opacity: 1,
        scale: 1,
    },
    1: {
        // opacity: 0.9,
        scale: 0.9,
    },
}

const BannerItem = ({ activeItem, item, index }) => {
    return (
        <Animatable.View
            className={`mr-5 flex justify-center ${index === 0 ? 'ml-5' : ''}`}
            animation={activeItem === index ? zoomIn : zoomOut}
            duration={500}
        >
            <ImageBackground
                source={images.logo}
                className="w-64 h-44  bg-black-dark rounded-lg"
                resizeMode='contain'
            />
        </Animatable.View>
    )

}

const Banner = ({ items }) => {

    const [activeItem, setActiveItem] = useState(items[0])

    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== activeItem) {
            setActiveItem(viewableItems[0].index);
        }
    }

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.$id}
            horizontal
            // contentOffset={{ x: 150 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
                // log the item
                <BannerItem
                    activeItem={activeItem}
                    item={item}
                    index={index}
                />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 40,
                minimumViewTime: 100,
            }}
        />
    )
}

export default Banner