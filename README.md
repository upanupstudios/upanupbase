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



### [Unreleased]

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