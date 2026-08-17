(function () {
  var list = document.getElementById("bookshelf-list");
  var empty = document.getElementById("bookshelf-empty");

  fetch("bookshelf.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load bookshelf.json");
      }
      return response.json();
    })
    .then(function (data) {
      var entries = data.entries || [];

      if (!entries.length) {
        empty.hidden = false;
        return;
      }

      entries.forEach(function (entry) {
        var item = document.createElement("a");
        item.className = "bookshelf-entry";
        item.href = "entry.html?slug=" + encodeURIComponent(entry.slug);

        var title = document.createElement("h2");
        title.className = "bookshelf-entry__title";
        title.textContent = entry.title;

        var meta = document.createElement("p");
        meta.className = "bookshelf-entry__meta";
        meta.textContent = [entry.author, entry.date].filter(Boolean).join(" · ");

        var description = document.createElement("p");
        description.className = "bookshelf-entry__description";
        description.textContent = entry.description || "";

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
    .catch(function () {
      empty.hidden = false;
      empty.textContent = "Could not load the bookshelf.";
    });
})();
