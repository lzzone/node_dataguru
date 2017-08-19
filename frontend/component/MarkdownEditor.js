import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';
import '../lib/style.css';

export default class MarkdownEditor extends React.Component {

    render() {
        return (
            <CodeMirror value={this.props.value} options={{
                mode: 'gfm',
                lineNumbers: false,
                theme: 'default'
            }} onChange={(value) => this.props.onChange({target:{value}})} />
        );
    }
}