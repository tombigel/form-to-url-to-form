function i(a, t = {}) {
  const { replace: r = !1 } = t, s = new FormData(a), e = r ? "replaceState" : "pushState";
  if (history[e]) {
    const o = new URL(window.location.href), n = new URLSearchParams();
    s.forEach((c, l) => {
      n.append(l, c.toString());
    }), o.search = n.toString(), history[e]({ path: o.href }, "", o.href);
  } else
    console.error("Your browser does not support the history.pushState API which is needed for changing the URL withot a page reload");
}
function h(a) {
  const t = new URLSearchParams(window.location.search), r = [...a.elements];
  if ([...t.entries()].length === 0) {
    a.reset();
    return;
  }
  for (const s of r) {
    const e = s;
    if (e.name) {
      if (t.has(e.name))
        if (e.type === "checkbox" || e.type === "radio") {
          const o = t.getAll(e.name);
          e.checked = o.includes(e.value);
        } else if (e.type === "select-multiple") {
          const o = t.getAll(e.name);
          [...e.querySelectorAll("option")].forEach(
            (n) => n.selected = o.includes(n.value)
          );
        } else
          e.value = t.get(e.name) || "";
      else if ((e.type === "checkbox" || e.type === "radio") && e.checked)
        if (e.type === "radio") {
          const o = a.elements.namedItem(e.name);
          o && "length" in o && t.has(e.name) || (e.checked = !1);
        } else
          e.checked = !1;
    }
  }
}
function f(a = {}) {
  const { searchOnly: t = !1 } = a;
  return navigator.clipboard.writeText(t ? location.search : location.href);
}
export {
  i as formToUrl,
  f as urlToClipboard,
  h as urlToForm
};
