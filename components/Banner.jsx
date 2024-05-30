import { View, Text, FlatList, Image, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import images from '../constants/images';


const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1.1,
    },
}

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
}

const BannerItem = ({ activeIndex, item, index }) => {
    return (
        <Animatable.View
            className={`mr-5 flex justify-center rounded-lg ${index === 0 ? 'ml-5' : ''}`}
            animation={index === activeIndex ? zoomIn : zoomOut}
            duration={1000}
        >
            <ImageBackground
                source={{ uri: `http://wonderwoods.aps.org.in/${item.image}` }}
                className="w-64 h-44 bg-black-dark "
                resizeMode='cover'
            />
        </Animatable.View>
    )

}

const Banner = ({ items }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % items.length;
                flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
                return nextIndex;
            });
        }, 2000);

        return () => clearInterval(intervalId);
    }, [items.length]);

    return (
        <FlatList
            ref={flatListRef}
            data={items}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <BannerItem
                    activeIndex={currentIndex}
                    item={item}
                    index={index}
                />
            )}
        />
    );
};

export default Banner