import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-themes-all';
import { langs } from '@uiw/codemirror-extensions-langs';

// References:
// https://reactjsexample.com/codemirror-component-for-react/
// https://uiwjs.github.io/react-codemirror/
// https://uiwjs.github.io/react-codemirror/#/extensions/basic-setup
// https://uiwjs.github.io/react-codemirror/#/theme/data/xcode/light
// Possible dark theme: abcdef

const SBEditor = (props: any) => {

    const {
        data,
        height = "40em",
        isReadOnly = false,
        onChange
    } = props;

    return (
        <CodeMirror
            value={data}
            height={height}
            readOnly={isReadOnly}
            theme={githubLight}
            extensions={[langs.json()]}
            onChange={onChange}
        />
    );
}

export default SBEditor;  