import React, { useContext } from "react";
import CodeMirror from "react-codemirror";
import {
    Form,
    Input,
    Segment
} from "semantic-ui-react";

import AuthedContext from '../../AuthedContext.jsx';

const CRUDCategoryView = (props) => {
    const context = useContext(AuthedContext);

    return <CRUDCategoryViewComponent context={context} {...props} />
}

class CRUDCategoryViewComponent extends React.Component {

    constructor(props) {
        super(props);


    }

    render() {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <label>Titel</label>
                        <Input placeholder="Titel" />
                    </Form.Field>
                    <Form.Field>
                        <label>Beschreibung</label>
                        <CodeMirror />
                    </Form.Field>
                </Form>
            </Segment>
        )
    }
}

export default CRUDCategoryView;