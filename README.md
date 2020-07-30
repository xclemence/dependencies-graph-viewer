# Dependencies Graph View 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE)
[![Build][github-actions-badge]][github-actions]
[![Quality Gate Status][sonar-project-badge]][sonar-project]


[![dependencies Status][node-dependencies-badge]][node-dependencies]
[![devDependencies Status][node-dev-dependencies-badge]][node-dev-dependencies]

This software provides a view to explore assemblies dependencies store by [Dependencies Graph Services]().

# Features available
- View Software assemblies
- View Assembly dependencies

<img src="doc/images/viewer.png"/>

# How to use
## Build sources (Angular CLI)
- `ng serve` for development. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- `ng build` to build the project.
- more options available on angular CLI web site.


> *This project is configured to work with the [Remote Development][remote-development-plugin-url] plugin.*

## Docker image

A Docker image with this software is available from the [packages][github-package] page.

# Linked project
|        Project                         |                Build State                              | 
| -------------------------------------- | :-----------------------------------------------------: | 
| [**Gprahql services**][graphql-url]       |      [![Build][graphql-badge]][graphql-url]   | 


# Main externals packages
- [Angular](https://angular.io/)
- [Angular Mateiral](https://material.angular.io/)
- [D3](https://d3js.org/)
- [NgRx](https://ngrx.io/)
- [Apollo](https://www.apollographql.com/docs/angular/)



[github-actions]:                   https://github.com/xclemence/Dependencies-graph-viewer/actions
[github-actions-badge]:             https://github.com/xclemence/dependencies-graph-viewer/workflows/CI/badge.svg?branch=master

[sonar-project]:                    https://sonarcloud.io/dashboard?id=xclemence_dependencies-graph-viewer
[sonar-project-badge]:              https://sonarcloud.io/api/project_badges/measure?project=xclemence_dependencies-graph-viewer&metric=alert_status

[node-dependencies]:                https://david-dm.org/xclemence/dependencies-graph-viewer
[node-dependencies-badge]:          https://david-dm.org/xclemence/dependencies-graph-viewer/status.svg

[node-dev-dependencies]:            https://david-dm.org/xclemence/dependencies-graph-viewer?type=dev
[node-dev-dependencies-badge]:      https://david-dm.org/xclemence/dependencies-graph-viewer/dev-status.svg

[graphql-badge]:                   https://github.com/xclemence/dependencies-graph-graphql/workflows/Node.js%20CI/badge.svg?branch=master
[graphql-url]:                     https://github.com/xclemence/dependencies-graph-graphql

[remote-development-plugin-url]:    https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack 

[github-package]:                   https://github.com/xclemence/dependencies-graph-services/packages
