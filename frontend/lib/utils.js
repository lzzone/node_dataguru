import marked from 'marked';
import Highlight from 'highlight.js';
import xss from 'xss';

marked.setOptions({
    highlight: function (code) {
        return Highlight.highlightAuto(code).value;
    }
});

export function redirectURL(url) {
    location = url;
}

const xssOptions = {
    whiteList: Object.assign({}, xss.whiteList),
};
xssOptions.whiteList.code = ['class'];
xssOptions.whiteList.span = ['class'];
const myxss = new xss.FilterXSS(xssOptions);

export function renderMarkdown(text) {
    return myxss.process(marked(text));
}