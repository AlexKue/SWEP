import React, { useContext } from "react"
import {
    
} from "semantic-ui-react"

import API from '../../../API/API.jsx';
import AuthedContext from '../../AuthedContext.jsx';

const UncertainQueryView = (props) => {
    let context = useContext(AuthedContext);
    console.log(context);

    return <UncertainQueryViewComponent context={ context } {...props} />;
}

class UncertainQueryViewComponent extends React.Component {

    render() {
        return <h1>Hello from UncertainQueryView!</h1>
    }
}

export default UncertainQueryView;