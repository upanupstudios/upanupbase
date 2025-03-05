# upanupbase

Upanup's base theme for all projects.

## Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Example:

```
### [#.#.#] - YYYY-MM-DD

#### Added
- for new features.

#### Changed
- for changes in existing functionality.

#### Deprecated
- for soon-to-be removed features.

#### Removed
- for now removed features.

#### Fixed
- for any bug fixes.

#### Security
- in case of vulnerabilities.
```

### [5.2.10] - 2025-02-11

#### Fixed
- Alignment styling fixes for link wrapped wysiwyg media

### [5.2.9] - 2025-03-05

#### Changed
- Gap, margin, padding utility classes reverted to increments of 4 (to reduce file size)

#### Removed
- Removed `!important` from gap, margin, padding utility classes

#### Fixed
- Gap, margin, padding utility classes rewritten so breakpoint classes override properly

### [5.2.8] - 2025-02-25

#### Changed
- Removed accordion max-width as per base Figma design changes.

### [5.2.7] - 2025-02-10

#### Fixed
- Adjusted template `field--field-when--full.html.twig` to fix bug where nothing displays when event in progress.

### [5.2.6] - 2025-02-03

#### Fixed
- Added `aria-label` directly within `field--paragraph--field-title--accordion-item.html.twig` to address issue where special characters rendered differently between the `aria-label` attribute (as added via FDK) and the text of the button.

### [5.2.5] - 2025-02-03

#### Changed
- Spacing variables (gap, margin, padding) now include classes ranging from 0 to 80 to allow finer control. These classes also include `!important` now.

### [5.2.4] - 2025-01-31

#### Added
- Additional utility classes for flex grids to control flex-basis, flex-shrink, and flex-grow
#### Fixed
- Corrected file icon urls within component/file/file.scss
- Removed images from being affected by 75ch $line-width
#### Changed
- Moved figure styling to upanupstarter so it can be inherited by ckeditor.scss

### [5.2.3] - 2025-01-30

#### Fixed
- Added `field-group-html-element--group-page-management.html.twig` and attached _notice_ library so the `.notice` class (applied in this template and sometimes in display) now renders the CSS correctly.

### [5.2.2] - 2025-01-28

#### Fixed
- Added a MutationObserver to `images-slider.js` and `alert-slider.js` to remove incorrectly added `aria-hidden=true` on `nextButtonDiv` and `prevButtonDiv`.

### [5.2.1] - 2025-01-10

#### Fixed
- JavaScript within _nav_ now uses `MutationObserver` (or similar) to avoid reliance on markup being rendered before script is initialized

### [5.2.0] - 2024-06-27

#### Changed
- `row-fade.js` now vanilla JS and uses IntersectionObserver rather than `inView` function

#### Removed
- Removed `inView` function from `globals.js`
- Removed jQuery dependency on `row_fade` library

#### Fixed
- Scrollable on load and resize
- Row fade on load and scroll
- Margin on aligned media in WYSIWYG's

### [5.1.0] - 2024-06-14

#### Changed
- Changed existing `mobile-menu-trigger.js` and `mobile-search-trigger.js` functionality to include toggling of `aria-hidden` and `aria-label` attributes on appropriate elements. Note: the `aria-hidden` attribute was used to prevent potentially breaking changes as the `hidden` attribute actually affects the display of the element – and also causes some jankiness when adjusting window size. `aria-hidden` is appropriate as long as it's used in conjunction with `display: none;` (which was already in use)

### [5.0.3] - 2024-05-31

#### Fixed
- Rendered `content` without explicitly printed fields in `paragraph--image-and-text.html.twig` and `paragraph--table-of-contents.html.twig` to ensure caching works as needed

### [5.0.2] - 2024-04-02

#### Changed
- Changed version number in `upanupbase.info.yml` from `1.0` to `5.0.2`

### [5.0.1] - 2024-03-22

#### Changed
- Changed mobile markup, scripts for dynamic quicklinks filters to benefit from updates in 5.0.0

#### Fixed
- Fixed styling for checkbox, radio elements with title's shown before the input

### [5.0.0] - 2024-03-22

#### Changed
- Adjusted desktop homepage dynamic quicklinks markup/functionality to use tabbed (https://design-system.service.gov.uk/components/tabs/) a11y practices

### [4.0.2] - 2024-03-22

#### Fixed
- Fixed issue where `.tabs-component__panel` `id` was `undefined`

### [4.0.1] - 2024-03-22

### Fixed
- Removed tables from tabindex until becomes interactive due to scrollable overflow

### [4.0.0] - 2024-03-21

#### Changed
- Put all JS from `base` library into separate libraries
- Added jQuery as a dependency to each library that uses it

### [3.2.8] - 2024-03-20

#### Changed
- Changed `aria-expanded` to `aria-pressed` and added `data-toggle-state` on `.accordion-group__toggle` as the "pressed" value can be `true`, `false`, or `mixed` when all accordions are open, all are closed, or some are open and some are closed, respectively

### [3.2.7] - 2024-03-18

#### Changed
- Changed `toggleSlidesAttribute` function to include `aria-hidden` attribute toggling on swiper slides on alerts and photo sliders
- Changed `upanupbase_theme_suggestions_block_alter` function to include check for block in the first place (to prevent WSOD in some cases)

### [3.2.6] - 2024-03-13

#### Added
- Added `calendar-view-pager.html.twig`

### [3.2.5] - 2024-03-13

#### Added
- Calendar pager styling updates

### [3.2.4] - 2024-03-12

#### Fixed
- Made hidden calendar list items _actually_ hidden

### [3.2.3] - 2024-03-11

#### Added
- Added check for empty `content` in nav block (`block--system-menu-block.html.twig`)

### [3.2.2] - 2024-03-11

#### Fixed
- Fixed tabs ajax not working due to incorrect use of `setTimeout`

### [3.2.1] - 2024-03-11

#### Fixed
- Changed `Drupal.behaviors.static_tabs_required` to `Drupal.behaviors.toc_nav`

### [3.2.0] - 2024-03-08

#### Added
- Scripts, template, libraries for new "table of contents" component

### [3.1.0] - 2024-03-08

#### Added
- Added `calendar` library, `views-view-calendar.html.twig` for use with the _Calendar_ module
- Added `tabs` and `tabs.static` libraries to include tabbed functionality on calendar, other views

### [3.0.2] - 2024-02-16

#### Fixed
- Margin adjustments to improve spacing of webform elements
- Added fix for float issue occuring due to inline fields

### [3.0.1] - 2024-02-14

#### Fixed
- Fixed height of grid items in view to have consistent height (e.g. landing page quicklinks)
- Fixed/improved <figure> and <article> media images where WYSIWYG applies .align-{direction} class (adjusted float, margins and desktop/mobile appearance)

### [3.0.0] - 2024-01-19

#### Changed
- Print styling removed from individual files and into new `*--print.scss` files
- Libraries updated with new `*--print.css` files

### [2.5.1] - 2023-12-01

#### Fixed
- Changed instances of `slideChangeTransitionEnd` to `transitionEnd`, which fixed the current index not updating. This may have broken in `2.3.0` as that's when we switched from slide to fade.

### [2.5.0] - 2023-11-29

#### Added
- Wrapped `.accordion__trigger` buttons in `<h3>`, included script to replace those with `<h2>` if the content row has no title (which renders as `<h2>`)

### [2.4.6] - 2023-11-24

#### Fixed
- Fixed float issue occurring from fields with inline labels

### [2.4.5] - 2023-11-23

#### Fixed
- Removed extra div in images slider that was causing markup, scripts issues

### [2.4.4] - 2023-11-20

#### Fixed
- Removed `.ai-sb` and replaced with `.ai-b` as `space-between` is not a valid value, and `baseline` _is_ and was missing

### [2.4.3] - 2023-11-03

#### Fixed
- Direct children of an accordion trigger now use `block` display rather than `inline-block`, which fixes an issue with underline on hover, active

### [2.4.2] - 2023-10-31

#### Fixed
- Fixed two references to `up3theme` (with `upanupbase`)

### [2.4.1] - 2023-10-31

#### Fixed
- Fixed prepros setting that didn't have _Bundle Imports and Requires_ checked for some JS files

### [2.4.0] - 2023-10-31

#### Changed
- Core version requirement now includes D10. Happy Halloween!

### [2.3.0] - 2023-10-30

#### Changed
- Upgraded SwiperJS from version 10 to 11
- Changed instances of "slide" animation to "fade" on SwiperJS functions

### [2.2.1] - 2023-10-27

#### Fixed
- Fixed missing prefixes from last compilation

### [2.2.0] - 2023-10-27

#### Fixed
- Fixed swiper js & image-slider css being included when swiper not present

#### Changed
- Included compatibility for single image to adopt content banner styling

### [2.1.2] - 2023-10-23

#### Fixed
- Fixed `row_fade` JavaScript file path

### [2.1.1] - 2023-10-18

#### Fixed
- Applied `max-width: $line-width` on accordions generally, rather than on child elements only
- `accordion` library now attaches globally to catch `details` and `.webform-element-more`

### [2.1.0] - 2023-08-09

#### Added
- Added `notice` library, template

#### Fixed
- `card` library was only including on horizontal card and node cards. Added a function in `upanupbase.theme` to include on all paragraphs with 'card' in their name.

### [2.0.0] - 2023-07-05

#### Changed
- Updated `prepros.config` to ignore .scss files
- Renamed scss folder to scss-css
- Compiled all .scss files using Live Sass Compiler VS Code extension

#### Removed
- Removed css folder

### [1.0.0] - 2023-06-20

#### Added
- Initial commit
