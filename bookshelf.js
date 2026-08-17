(function () {
  var list = document.getElementById("bookshelf-list");
  var empty = document.getElementById("bookshelf-empty");

  var query =
    '*[_type == "boardEntry" && board->slug.current == "bookshelf"] ' +
    "| order(publishedAt desc) " +
    '{ title, "slug": slug.current, author, publishedAt, excerpt, url }';

  window
    .sanityQuery(query)
    .then(function (entries) {
      if (!entries || !entries.length) {
        empty.hidden = false;
        return;
      }

      entries.forEach(function (entry) {
        var item = document.createElement("a");
        item.className = "bookshelf-entry";
        item.href = "entry.html?board=bookshelf&slug=" + encodeURIComponent(entry.slug);

        var title = document.createElement("h2");
        title.className = "bookshelf-entry__title";
        title.textContent = entry.title;

        var date = entry.publishedAt
          ? new Date(entry.publishedAt).toLocaleDateString()
          : "";

        var meta = document.createElement("p");
        meta.className = "bookshelf-entry__meta";
        meta.textContent = [entry.author, date].filter(Boolean).join(" · ");

        var description = document.createElement("p");
        description.className = "bookshelf-entry__description";
        description.textContent = entry.excerpt || "";

        item.appendChild(title);
        if (meta.textContent) {
          item.appendChild(meta);
        }
        if (description.textContent) {
          item.appendChild(description);
        }

        list.appendChild(item);
      });
    })
    .catch(function (err) {
      console.error(err);
      empty.hidden = false;
      empty.textContent = "Could not load the bookshelf.";
    });
})();
