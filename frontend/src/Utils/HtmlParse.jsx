import parse from 'html-react-parser';
import sanitizeHtml from "sanitize-html";

export default function Parse(html) {
    html = sanitizeHtml(html);

    return (<>
        {parse(html)}
    </>);
}

export function ParseWithImage(html) {
    const clean = (dirty) => sanitizeHtml(dirty, {
        allowedTags: ["address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
            "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
            "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
            "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
            "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
            "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
            "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "img"],
        disallowedTagsMode: 'discard',
        allowedAttributes: {
            a: ['href', 'name', 'target'],
            // We don't currently allow img itself by default, but
            // these attributes would make sense if we did.
            img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading']
        },
        // Lots of these won't come up by default because we don't allow them
        selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
        // URL schemes we permit
        allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
        allowedSchemesByTag: {},
        allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
        allowProtocolRelative: true,
        enforceHtmlBoundary: false
    });

    html = clean(html);
    html = parse(html);

    return (
        <>
            {html}
        </>
    );
}

export function resumeText(text, quantity = 200) {

    text = text.replace(/\n|\r/g, "");
    
    if(text.length > quantity) {
        return(` ${text.substring(0, quantity)} ... `);
    }

    return(text.substring(0, quantity));
}