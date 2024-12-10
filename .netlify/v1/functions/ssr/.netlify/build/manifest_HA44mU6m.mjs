import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_Bu460bVi.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/dknipe/Documents/projects/opti-astro/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.Dj9Qv6l7.js"}],"styles":[{"type":"inline","content":"[data-astro-image]{width:100%;height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"}],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.Dj9Qv6l7.js"}],"styles":[{"type":"external","src":"/_astro/_page_.R4q-ZwWd.css"},{"type":"inline","content":"[data-astro-image]{width:100%;height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"}],"routeData":{"route":"/preview","isIndex":false,"type":"page","pattern":"^\\/preview\\/?$","segments":[[{"content":"preview","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preview.astro","pathname":"/preview","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.Dj9Qv6l7.js"}],"styles":[{"type":"external","src":"/_astro/_page_.R4q-ZwWd.css"},{"type":"inline","content":".work-sans[data-astro-cid-f6ijb6nm]{font-family:Work Sans,sans-serif}#menu-toggle[data-astro-cid-f6ijb6nm]:checked+#menu[data-astro-cid-f6ijb6nm]{display:block}.hover\\:grow[data-astro-cid-f6ijb6nm]{transition:all .3s;transform:scale(1)}.hover\\:grow[data-astro-cid-f6ijb6nm]:hover{transform:scale(1.02)}.carousel-open[data-astro-cid-f6ijb6nm]:checked+.carousel-item[data-astro-cid-f6ijb6nm]{position:static;opacity:100}.carousel-item[data-astro-cid-f6ijb6nm]{transition:opacity .6s ease-out}#carousel-1[data-astro-cid-f6ijb6nm]:checked~.control-1[data-astro-cid-f6ijb6nm],#carousel-2[data-astro-cid-f6ijb6nm]:checked~.control-2[data-astro-cid-f6ijb6nm],#carousel-3[data-astro-cid-f6ijb6nm]:checked~.control-3[data-astro-cid-f6ijb6nm]{display:block}.carousel-indicators[data-astro-cid-f6ijb6nm]{list-style:none;margin:0;padding:0;position:absolute;bottom:2%;left:0;right:0;text-align:center;z-index:10}#carousel-1[data-astro-cid-f6ijb6nm]:checked~.control-1[data-astro-cid-f6ijb6nm]~.carousel-indicators[data-astro-cid-f6ijb6nm] li[data-astro-cid-f6ijb6nm]:nth-child(1) .carousel-bullet[data-astro-cid-f6ijb6nm],#carousel-2[data-astro-cid-f6ijb6nm]:checked~.control-2[data-astro-cid-f6ijb6nm]~.carousel-indicators[data-astro-cid-f6ijb6nm] li[data-astro-cid-f6ijb6nm]:nth-child(2) .carousel-bullet[data-astro-cid-f6ijb6nm],#carousel-3[data-astro-cid-f6ijb6nm]:checked~.control-3[data-astro-cid-f6ijb6nm]~.carousel-indicators[data-astro-cid-f6ijb6nm] li[data-astro-cid-f6ijb6nm]:nth-child(3) .carousel-bullet[data-astro-cid-f6ijb6nm]{color:#000}\n"}],"routeData":{"route":"/store","isIndex":true,"type":"page","pattern":"^\\/store\\/?$","segments":[[{"content":"store","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/store/index.astro","pathname":"/store","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.Dj9Qv6l7.js"}],"styles":[{"type":"external","src":"/_astro/_page_.R4q-ZwWd.css"},{"type":"inline","content":"[data-astro-image]{width:100%;height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"}],"routeData":{"route":"/[...page]","isIndex":false,"type":"page","pattern":"^(?:\\/(.*?))?\\/?$","segments":[[{"content":"...page","dynamic":true,"spread":true}]],"params":["...page"],"component":"src/pages/[...page].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/dknipe/Documents/projects/opti-astro/src/pages/[...page].astro",{"propagation":"none","containsHead":true}],["/Users/dknipe/Documents/projects/opti-astro/src/pages/preview.astro",{"propagation":"none","containsHead":true}],["/Users/dknipe/Documents/projects/opti-astro/src/pages/store/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/preview@_@astro":"pages/preview.astro.mjs","\u0000@astro-page:src/pages/store/index@_@astro":"pages/store.astro.mjs","\u0000@astro-page:src/pages/[...page]@_@astro":"pages/_---page_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_HA44mU6m.mjs","/Users/dknipe/Documents/projects/opti-astro/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BPa4E1ms.mjs","/Users/dknipe/Documents/projects/opti-astro/src/pages/preview.astro?astro&type=script&index=0&lang.ts":"_astro/preview.astro_astro_type_script_index_0_lang.DJngzW_H.js","astro:scripts/page.js":"_astro/page.Dj9Qv6l7.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/dknipe/Documents/projects/opti-astro/src/pages/preview.astro?astro&type=script&index=0&lang.ts","function n(e){window.location=e.detail.previewUrl}window.addEventListener(\"optimizely:cms:contentSaved\",e=>n(e));"]],"assets":["/_astro/_page_.R4q-ZwWd.css","/communicationinjector.js","/favicon.svg","/mosey-coffee.png","/_astro/page.Dj9Qv6l7.js","/products/41aSDbF17gL._AC_SL1010_.jpg","/products/61Fcqoc0uWL._AC_SL1500_.jpg","/products/714m9leLFSL._AC_SL1500_.jpg","/products/71Jb3bpa3WL._SL1500_.jpg","/products/71TPLFt49hL._AC_SL1500_.jpg","/products/71vSbjd6pEL._AC_SL1500_.jpg","/products/81AzD90IAtL._AC_SL1500_.jpg","/products/81F8C69mvxL._AC_SL1500_.jpg","/products/81jK0gr231S._AC_SL1500_.jpg","/products/81xJ9hjqnNL._AC_SL1500_.jpg","/products/91vrtHljExS._AC_SL1500_.jpg","/_astro/page.Dj9Qv6l7.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"8peBcwxaQCZeMNlOIkKflFZEWsJw5YMeqdj2iE1SdpM=","envGetSecretEnabled":true});

export { manifest };
