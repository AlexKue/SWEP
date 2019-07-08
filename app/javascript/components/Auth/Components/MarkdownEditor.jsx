import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/prism";
import ReactMarkdown from "react-markdown";
import { Tab, Segment } from "semantic-ui-react"; 
import { Controlled as CodeMirror } from "react-codemirror2";
require('codemirror/mode/markdown/markdown');
require('codemirror/addon/display/placeholder');
/* MIT License, copyright rexxars: https://github.com/rexxars/react-markdown/blob/master/LICENSE */
/* Built as in https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada */
class CodeBlock extends PureComponent {
    static propTypes = {
      value: PropTypes.string.isRequired,
      language: PropTypes.string
    };
  
    static defaultProps = {
      language: null
    };
  
    render() {
        const [language, value] = [this.props.language.toLowerCase(), this.props.value];
        return (
            <SyntaxHighlighter language={language.toLowerCase()} style={coy}>
                {value}
            </SyntaxHighlighter>
        );
    }
  }

  /*
    Requires:
        source      - source for Markdown and Render
        onChange    - (value) => { body } - called when value changes with current editor value
  */
  const MarkdownEditor = (props) => {
    return (
        <Tab
            menu={{ secondary: true, pointing: true }}
            panes={[
                {
                    menuItem: "Editor",
                    render: () => {
                        return (
                            <CodeMirror
                                options={{
                                    mode: "markdown",
                                    placeholder: "Beschreibung..." ,
                                    lineWrapping: true,
                                    lineNumbers: true}}
                                value={ props.source }
                                onBeforeChange={ (editor, data, value) => {
                                    if (props.allowEditFromLine) {
                                        if (data.from.line >= props.allowEditFromLine) props.onChange(value);
                                    } else {
                                        props.onChange(value);
                                    }
                                }} />
                        );
                    }
                },
                {
                    menuItem: 'Preview',
                    render: () => {
                        if ( props.source != "" ) {
                            return (
                                <MarkdownRenderer
                                    text={ props.source } />
                            );
                        } else {
                            return <p>Es wurde noch keine Beschreibung eingegeben.</p>
                        }
                    }
                }
            ]
            } />
    )
}

export const MarkdownRenderer = (props) => {
    return (
        <ReactMarkdown
            source={ props.text }
            renderers={{ code: CodeBlock }} />
    )
}

export default MarkdownEditor;