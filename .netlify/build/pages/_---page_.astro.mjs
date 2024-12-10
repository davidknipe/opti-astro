/* empty css                                  */
import { c as createComponent, r as renderTemplate, b as renderComponent, d as createAstro, F as Fragment } from '../chunks/astro/server_Bu460bVi.mjs';
import 'kleur/colors';
import { g as getOptimizelySdk, $ as $$Components, a as $$Experiences, b as $$Pages } from '../chunks/_Pages_BeLAy0Mc.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const ctx = "view";
  const urlPath = `${Astro2.url.pathname.replace(/\/$/, "")}/`;
  const contentByPathResponse = await getOptimizelySdk(ctx).contentByPath({ url: urlPath });
  if (contentByPathResponse._Content.items.length === 0) {
    return Astro2.redirect("/404");
  }
  const item = contentByPathResponse._Content.items[0];
  const contentByIdResponse = await getOptimizelySdk(ctx).contentById({
    key: item._metadata.key,
    ver: item._metadata.version,
    loc: item._metadata.locale
  });
  const contentPayload = {
    ctx,
    key: item._metadata.key,
    ver: item._metadata.version,
    loc: item._metadata.locale,
    preview_token: "",
    types: contentByIdResponse._Content.items[0]._metadata.types
  };
  const isComponentType = contentPayload.types.includes("_Component");
  const isExperienceType = contentPayload.types.includes("_Experience");
  const isPageType = contentPayload.types.includes("_Page") && isExperienceType === false;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${isComponentType && renderTemplate`${renderComponent($$result2, "Components", $$Components, { "data": contentPayload })}`}${isExperienceType && renderTemplate`${renderComponent($$result2, "Experiences", $$Experiences, { "data": contentPayload })}`}${isPageType && renderTemplate`${renderComponent($$result2, "Pages", $$Pages, { "data": contentPayload })}`}` })}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/pages/[...page].astro", void 0);

const $$file = "/Users/dknipe/Documents/projects/opti-astro/src/pages/[...page].astro";
const $$url = "/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
