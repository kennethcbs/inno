import {Text, View, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from "react";

//Husk at ændre navn
export default function ImageScreen({route}) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(route.params.image);
    }, [])

    return (
        <View>
            <Image source={{ uri: image ?  image : null }} width={Dimensions.get('window').width} height={Dimensions.get('window').height}>
                
            </Image>
        </View>
    );
}