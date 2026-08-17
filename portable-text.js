// Minimal Portable Text -> HTML renderer covering the block styles and
// image type enabled in studio/schemaTypes/boardEntry.ts. Avoids pulling in
// @portabletext/to-html so the public site stays dependency-free.
(function () {
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  function renderSpan(span, markDefs) {
    var text = escapeHtml(span.text);
    var marks = span.marks || [];

    marks.forEach(function (mark) {
      if (mark === "strong") {
        text = "<strong>" + text + "</strong>";
      } else if (mark === "em") {
        text = "<em>" + text + "</em>";
      } else if (mark === "code") {
        text = "<code>" + text + "</code>";
      } else {
        var linkDef = (markDefs || []).find(function (def) {
          return def._key === mark && def._type === "link";
        });
        if (linkDef && linkDef.href) {
          text =
            '<a href="' +
            escapeHtml(linkDef.href) +
            '" target="_blank" rel="noopener noreferrer">' +
            text +
            "</a>";
        }
      }
    });

    return text;
  }

  function renderBlock(block) {
    var tag = "p";
    if (block.style === "h2") tag = "h2";
    else if (block.style === "h3") tag = "h3";
    else if (block.style === "blockquote") tag = "blockquote";

    var inner = (block.children || [])
      .map(function (span) {
        return renderSpan(span, block.markDefs);
      })
      .join("");

    return "<" + tag + ">" + inner + "</" + tag + ">";
  }

  function renderImage(block) {
    var src = window.sanityImageUrl(block, 1000);
    if (!src) {
      return "";
    }
    return (
      '<img class="entry-page__image" src="' +
      escapeHtml(src) +
      '" alt="' +
      escapeHtml(block.alt || "") +
      '" loading="lazy">'
    );
  }

  function renderPortableText(blocks) {
    if (!blocks || !blocks.length) {
      return "";
    }

    return blocks
      .map(function (block) {
        if (block._type === "image") {
          return renderImage(block);
        }
        if (block._type === "block") {
          return renderBlock(block);
        }
        return "";
      })
      .join("");
  }

  window.renderPortableText = renderPortableText;
})();
