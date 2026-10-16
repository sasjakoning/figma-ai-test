// https://www.javascriptroom.com/blog/how-to-convert-a-string-into-kebab-case-using-javascript/#basic-string-replacement
const toKebabCase = (string) => {
    return string
        .toLowerCase()           // Convert to lowercase
        .trim()                  // Remove leading/trailing spaces
        .replace(/\s+/g, '-')   // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '') // Remove non-word characters except hyphens
        .replace(/\-\-+/g, '-'); // Replace multiple hyphens with single
}

// Pick the right template and fill in the slots ({{title}}), {{content}}, {{date}} etc)
function renderPostTemplate(template, data, meta) {
    return template
        .replaceAll("{{ title }}", meta.title)
        .replace("{{ content }}", data)
        .replace("{{ type }}", meta.parent)
        .replace("{{ sidenote }}", (meta.sidenote || "I have nothing to say"))
}

// Turns spaces into dashes to id's in headings work correctly.
const slugify = (string) => {
    return string.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

// escape HTML for codeblocks
const escapeHtml = (string) => {
    return string
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// escape certain characters for XML RSS feeds
const escapeXml = (string) => {
    return string
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}


export { toKebabCase, renderPostTemplate, slugify, escapeHtml, escapeXml }