/* empty css                                  */
import { c as createComponent, r as renderTemplate, a as renderScript, b as renderComponent, d as createAstro, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_Bu460bVi.mjs';
import 'kleur/colors';
import { g as getOptimizelySdk, $ as $$Components, a as $$Experiences, b as $$Pages } from '../chunks/_Pages_BeLAy0Mc.mjs';
import qs from 'query-string';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Preview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Preview;
  const previewPayload = qs.parse(Astro2.url.search);
  const optiResponse = await getOptimizelySdk(previewPayload.ctx).contentById({
    key: previewPayload.key,
    loc: previewPayload.loc,
    ver: previewPayload.ver
  });
  const types = optiResponse._Content.items[0]?._metadata?.types;
  previewPayload.types = types;
  const isComponentType = types?.includes("_Component");
  const isExperienceType = types?.includes("_Experience");
  const isPageType = types?.includes("_Page") && isExperienceType === false;
  return renderTemplate(_a || (_a = __template(["", '<script src="/communicationinjector.js"><\/script>', ""])), renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${!types && renderTemplate`${maybeRenderHead()}<h1 class="text-5xl text-center">Welcome to the demo site!</h1>`}${isComponentType && renderTemplate`${renderComponent($$result2, "Components", $$Components, { "data": previewPayload })}`}${isExperienceType && renderTemplate`${renderComponent($$result2, "Experiences", $$Experiences, { "data": previewPayload })}`}${isPageType && renderTemplate`${renderComponent($$result2, "Pages", $$Pages, { "data": previewPayload })}`}` }), renderScript($$result, "/Users/dknipe/Documents/projects/opti-astro/src/pages/preview.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/dknipe/Documents/projects/opti-astro/src/pages/preview.astro", void 0);

const $$file = "/Users/dknipe/Documents/projects/opti-astro/src/pages/preview.astro";
const $$url = "/preview";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Preview,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
