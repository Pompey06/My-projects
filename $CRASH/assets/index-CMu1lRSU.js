(function () {
   const t = document.createElement("link").relList;
   if (t && t.supports && t.supports("modulepreload")) return;
   for (const e of document.querySelectorAll('link[rel="modulepreload"]')) o(e);
   new MutationObserver((e) => {
      for (const r of e)
         if (r.type === "childList")
            for (const c of r.addedNodes) c.tagName === "LINK" && c.rel === "modulepreload" && o(c);
   }).observe(document, { childList: !0, subtree: !0 });
   function i(e) {
      const r = {};
      return (
         e.integrity && (r.integrity = e.integrity),
         e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
         e.crossOrigin === "use-credentials"
            ? (r.credentials = "include")
            : e.crossOrigin === "anonymous"
            ? (r.credentials = "omit")
            : (r.credentials = "same-origin"),
         r
      );
   }
   function o(e) {
      if (e.ep) return;
      e.ep = !0;
      const r = i(e);
      fetch(e.href, r);
   }
})();
const s = () => {
   document.querySelectorAll(".ca-bar").forEach((t) => {
      if (!t) return;
      const i = t.getAttribute("data-ca") || "";
      t.addEventListener("click", () => {
         try {
            navigator.clipboard.writeText(i);
         } catch {
            const e = document.createElement("textarea");
            (e.value = i),
               document.body.appendChild(e),
               e.select(),
               document.execCommand("copy"),
               document.body.removeChild(e);
         }
         alert("CA copied to clipboard");
      });
   });
};
s();
const d = () => {
   const n = new IntersectionObserver(
      (t, i) => {
         t.forEach((o) => {
            o.isIntersecting && (o.target.classList.add("in-viewport"), i.unobserve(o.target));
         });
      },
      { threshold: 0 }
   );
   document.querySelectorAll(".animate-in-viewport").forEach((t) => {
      n.observe(t);
   });
};
window.addEventListener("load", () => {
   s(), d();
   const n = document.querySelector(".squirrel");
   n &&
      window.addEventListener("mousemove", (t) => {
         const i = n.offsetWidth,
            o = t.clientX - i / 2;
         n.style.left = `${o}px`;
      });
});
