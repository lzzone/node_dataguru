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

export function renderMarkdown(text) {
    return xss(marked(text));
}