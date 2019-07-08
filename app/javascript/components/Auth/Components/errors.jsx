import React from "react"
import {
    Image
} from "semantic-ui-react"

import __403Image from 'images/403_rectangle.png';
import __404Image from 'images/404_rectangle.png';

export const __403 = () => {
    return <Image src={ __403Image } className="errorImage" />
}
export const __404 = () => {
    return <Image src={ __404Image } className="errorImage" />
}