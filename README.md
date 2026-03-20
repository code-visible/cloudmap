# cloudmap

## Introduction

Code Visible is designed to help you master the core source code architecture of a medium to large scale codebase within three minutes, providing key metrics and internal insights about the codebase.

## Current Status

The premium open source version is still in active development. The simplified online version, which includes hundreds of parsed repositories, can be found here:

[https://code.challenai.com](https://code.challenai.com/).

The online version disables functions and abstracts (classes, interfaces, etc.) to save space for more possible repositories. You can download the binary executable to parse the project yourself.

The project is still in its early stages, and the latest version is v0.1.2-beta.

## Parser Feature Requirements

- Fault Tolerant – Failure-first design, trying its best to parse the project even when it's broken or not correctly configured.
- Optimized for Speed – 80% of libraries should be parsed in 1 second.
- Easy to Use – Double-click to run; it's a binary.
- Environment Free – No dependencies or software should be installed, regardless of whether it's Python, pip, or Node.js.

## Language Parser

Currently supported or in-development languages and parsers.

| Parser    | Language   | Repository                                                    | Supported Features |
| --------- | ---------- | ------------------------------------------------------------- | ------------------ |
| monty     | Python     | [monty parser](https://github.com/code-visible/monty)         | 70%                |
| chameleon | Javascript | [chameleon parser](https://github.com/code-visible/chameleon) | 60%                |
| gopher    | Golang     | [gopher parser](https://github.com/code-visible/gopher)       | 90%                |
| ferris    | Rust       | [ferris parser](https://github.com/code-visible/ferris)       | 30%                |
| beans     | Java       | [beans parser](https://github.com/code-visible/beans)         | 0                  |

## Language Protocol

[code visible protocol definition](https://github.com/code-visible/protocol)

## LICENSE

cloudmap is licensed under the GPL-3.0 License.
