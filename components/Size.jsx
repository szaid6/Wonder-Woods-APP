import { View, Text } from 'react-native'
import React from 'react'

const Size = ({ index, data, selected }) => {

    console.log('size component data', data);

    return (
        <View
            className={`border rounded-md border-primary-light mr-3 ${selected ? 'selected' : ''} ${index === 0 ? 'ml-3' : ''}`}
        >
            <View
                className="flex flex-row items-center justify-between p-2 border-b border-primary-light"
            >
                <Text
                    className={`text-primary text-sm  font-psemibold`}
                >Size Name</Text>
            </View>

            {/* Product Pricing */}
            <View
                className="flex p-2"
            >
                <Text
                    className="text-[30px] text-tertiary-light font-psemibold"
                >
                    <Text
                        className="text-[12px] text-tertiary-light font-psemibold"
                    >₹</Text>
                    {Number(20000).toLocaleString('en-IN')}
                </Text>
                <View
                    className="flex flex-row justify-between items-center -mt-4"
                >
                    <Text
                        className="text-[13px] text-primary font-psemibold"
                    >
                        -{24000 > 0 ? Math.round(((24000 - 20000) / 24000) * 100) : 0}
                        <Text>%</Text>
                    </Text>
                    <Text
                        className="text-[14px] line-through text-primary-light font-psemibold"
                    >
                        <Text
                            className="text-[10px] text-primary font-psemibold"
                        >₹</Text>
                        {Number(24000).toLocaleString('en-IN')}
                    </Text>
                </View>

                {/* instock tag */}
                <View
                    className="flex flex-row items-center justify-center bg-primary-light rounded-md mx-2 pt-1"
                >
                    <Text
                        className="text-[12px] text-white font-psemibold"
                    >IN STOCK</Text>
                </View>

                <Text
                    className="text-[15px] text-center mt-2 text-green-600"
                >
                    FREE Delivery
                </Text>
            </View>


        </View>
    )
}

export default Size