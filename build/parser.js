import { slugify, escapeHtml } from "./helpers.js";

function markdownToHtml(markdown) {
    let html = markdown.trim();

    // Code bocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
        `<pre><code${lang ? ` class="language-${lang}"` : ''}>${escapeHtml(code.trim())}</code></pre>`
    );

    // Inline code
    html = html.replace(/`([^`\n]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);

    // Line breaks
    html = html.replace(/\r\n/g, '\n');

    // Headings
    html = html.replace(/^# (.*)$/gim, (_, text) =>
        `<h1 id="${slugify(text)}">${text}</h1>`
    );
    html = html.replace(/^## (.*)$/gim, (_, text) =>
        `<h2 id="${slugify(text)}">${text}</h2>`
    );
    html = html.replace(/^### (.*)$/gim, (_, text) =>
        `<h3 id="${slugify(text)}">${text}</h3>`
    );
    html = html.replace(/^#### (.*)$/gim, (_, text) =>
        `<h4 id="${slugify(text)}">${text}</h4>`
    );
    html = html.replace(/^##### (.*)$/gim, (_, text) =>
        `<h5 id="${slugify(text)}">${text}</h5>`
    );
    html = html.replace(/^###### (.*)$/gim, (_, text) =>
        `<h6 id="${slugify(text)}">${text}</h6>`
    );

    // Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, `<img style="max-width:100%;height:auto" src="$2" alt="$1">`);

    // Horizontal rule
    html = html.replace(/^(?:-{3,}|\*{3,}|_{3,})$/gim, '<hr>');

    // Blockquotes
    html = html.replace(/^(> ?.*(?:\n> ?.*)*)/gim, (block) => {
        const inner = block.replace(/^> ?/gm, '').trim();
        return `<blockquote>${inner}</blockquote>`;
    });

    // Unordered lists
    html = html.replace(/^(?:[-*] .*(?:\n[-*] .*)*)/gim, (block) => {
        const items = block.split('\n').map(l =>
            `<li>${l.replace(/^[-*] /, '')}</li>`
        ).join('');
        return `<ul>${items}</ul>`;
    });
    // TODO: Nested lists

    // Ordered lists
    html = html.replace(/^(?:\d+\. .*(?:\n\d+\. .*)*)/gim, (block) => {
        const items = block.split('\n').map(l =>
            `<li>${l.replace(/^\d+\. /, '')}</li>`
        ).join('');
        return `<ol>${items}</ol>`;
    });

    // Formatting and links
    html = html.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`);
    html = html.replace(/\*(.*?)\*/g, `<em>$1</em>`);
    html = html.replace(/~~(.*?)~~/g, `<del>$1</del>`);
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2">$1</a>`);

    // Paragraphs
    const blockLevel = /^<(h[1-6]|pre|blockquote|ul|ol|hr|table|div|section|article|figure|figcaption|aside|nav|header|footer|main|details)\b/i;
    html = html.split(/\n{2,}/g).map(p => {
        if (p.trim() && !blockLevel.test(p.trim())) {
            return `<p>${p.trim().replace(/\n/g, '<br>')}</p>`;
        }
        return p;
    }).join('\n');

    return html
}

// Tables etc are complex but could be added at some point
// Nested lists aren't supported yet either

// Eventually make something that transforms internal urls correctly, currently you need to write the url based on the prod structure which doesn't work in dev.

export { markdownToHtml };