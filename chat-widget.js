chattable.initialize({ stylesheet: "/chattable.css" });

(function () {
  var widget = document.getElementById("chat-widget");
  var titlebar = document.getElementById("chat-titlebar");
  var minimizeBtn = document.getElementById("chat-minimize");
  var maximizeBtn = document.getElementById("chat-maximize");

  function setState(state) {
    widget.classList.remove("is-minimized", "is-maximized");
    if (state === "minimized") {
      widget.classList.add("is-minimized");
      maximizeBtn.textContent = "□";
      maximizeBtn.setAttribute("aria-label", "Maximize");
      maximizeBtn.title = "Maximize";
    } else if (state === "maximized") {
      widget.classList.add("is-maximized");
      maximizeBtn.textContent = "❐";
      maximizeBtn.setAttribute("aria-label", "Restore");
      maximizeBtn.title = "Restore";
    } else {
      maximizeBtn.textContent = "□";
      maximizeBtn.setAttribute("aria-label", "Maximize");
      maximizeBtn.title = "Maximize";
    }
  }

  minimizeBtn.addEventListener("click", function () {
    if (widget.classList.contains("is-minimized")) {
      setState("normal");
    } else {
      setState("minimized");
    }
  });

  maximizeBtn.addEventListener("click", function () {
    if (widget.classList.contains("is-maximized")) {
      setState("normal");
    } else {
      setState("maximized");
    }
  });

  titlebar.addEventListener("dblclick", function () {
    if (widget.classList.contains("is-minimized")) {
      setState("normal");
    } else if (widget.classList.contains("is-maximized")) {
      setState("normal");
    } else {
      setState("maximized");
    }
  });
})();
