# Upanup Base Theme

Drupal base theme (`type: theme`, `base theme: stable9`) supporting Drupal 8.8 / 9 / 10. Maintained by Upanup and used as the foundation for client subthemes.

## Layout

- `upanupbase.theme` — preprocess hooks, theme suggestions, and theme-level helpers.
- `upanupbase.info.yml` / `upanupbase.libraries.yml` — theme metadata, regions, library declarations.
- `templates/` — Twig templates organized by component/region.
- `scss-css/` — SCSS sources and compiled CSS (compiled via Prepros, see `prepros.config`).
- `js/` — theme JavaScript, attached via `upanupbase.libraries.yml`.
- `images/` — theme image assets.

## Conventions

- Coding standards: Drupal CS (`phpcs --standard=Drupal,DrupalPractice`). Trailing newline at EOF, trailing comma in multi-line arrays, inline comments end in a period, function docblocks include `@param`/`@return`.
- Prefer `use` statements at the top of `upanupbase.theme` over inline FQCN (the file already does this for `Url`, `FormStateInterface`, `ViewsForm`).
- `hook_preprocess_html()` runs on every HTML response — keep work there cheap and skip admin routes when adding entity walks.
- When attaching head markup or render arrays from preprocess, propagate cache tags/contexts from any entity you read.

## FAQ schema (added in 5.3.0)

`upanupbase_add_faq_schema()` (entrypoint, called from `hook_preprocess_html()`), `upanupbase_extract_faq_items_from_entity()` (recursive walker), and `_upanupbase_accordion_questions()` (private helper) emit JSON-LD `FAQPage` schema in `<head>` for accordion paragraphs whose `field_faqs` boolean is true. Each accordion item contributes a `Question`/`Answer` pair from `field_title` and `field_body`.

Hardening applied during the post-`c82b320` refactor:

- Skips admin routes via `router.admin_context`.
- `->access('view')` gates every referenced entity so unpublished items don't leak.
- Cache tags/contexts from the node and every paragraph visited are accumulated in a `CacheableMetadata` and applied to `$variables` so the page render cache invalidates correctly.
- `field_body` is run through `check_markup()` then `Html::decodeEntities(strip_tags(...))` so entities and filter placeholders resolve cleanly.
- `json_encode()` uses `JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT` to prevent any `</script>` in content from terminating the script tag.
- Recursion is capped at depth 5 with a `visited` set keyed by `entity_type:id` to break cycles.

## Release process

`README.md` holds the changelog (Keep-a-Changelog format). Bump `version:` in `upanupbase.info.yml` and add a dated section to `README.md` for each release.
