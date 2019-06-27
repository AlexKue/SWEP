import React from "react"
import {
    Image
} from "semantic-ui-react"

import __403Image from 'images/403_rectangle.png';
import __404Image from 'images/404_rectangle.png';

/* Note / TODO : Make images width to be max 600px to look good AND to compress */
export const __404 = () => {
    return <Image src={ __404Image } className="errorImage" />
}

export const __403 = () => {
    return <Image src={ __403Image } className="errorImage" />
}