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