import parse from 'html-react-parser';
import sanitizeHtml from "sanitize-html";

export default function Parse(html) {
    html = sanitizeHtml(html);
    
    return(<>
        {parse(html)}
    </>);
}

export function ParseWithImage(html) {
    const clean = (dirty) => sanitizeHtml(dirty, {
        allowedTags: ['img']
    });
    
    html = clean(html);
    
    return(<>
        {parse(html)}
    </>);
}