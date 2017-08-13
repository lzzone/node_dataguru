import React from 'react';
import CodeMirror from 'react-codemirror';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/xml/xml';
// import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';

export default class MarkdownEditor extends React.Component {

    render() {
        return (
            <div style={{border: '1px solid #ccc'}}>
                <CodeMirror value={this.props.value} options={{
                    mode: 'gfm',
                    lineNumbers: false,
                    theme: 'default'
                }} onChange={(value) => this.props.onChange({target:{value}})} />
            </div>
        );
    }
}