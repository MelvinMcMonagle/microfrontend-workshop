# Building Micro Frontend with Single Spa


**1. Setup your project**

```
mkdir <project_name> && cd <project_name>

npm init

npm install babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-syntax-dynamic-import @babel/plugin-proposal-object-rest-spread --save-dev

npm install webpack webpack-dev-server clean-webpack-plugin webpack-cli html-loader --save-dev


```
Install your favorite framework dependencies:
``` 
VueJs: npm install single-spa single-spa-vue vue systemjs-webpack-interop --save
       npm install vue-loader vue-template-compiler --save-dev

React: npm install single-spa single-spa-react react react-dom react-router-dom react-transition-group --save

AngularJs: npm install single-spa angular angular-ui-router single-spa-angularjs --save

...
``` 
Create a .babelrc file in your root folder:
```
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }],
    ["@babel/preset-react"]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```
Create a webpack.config.js file in your root folder:
```
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    // Set the single-spa config as the project entry point
    'single-spa.config': './single-spa.config.js',
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // Webpack style loader added so we can use materialize
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      }, {
        // This plugin will allow us to use AngularJS HTML templates
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    // A webpack plugin to remove/clean the output folder before building
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true
  }
};
```
Include script in your package.json:
``` 
"scripts": {
  "start": "webpack-dev-server --open",
  "build": "webpack --config webpack.config.js -p"
}
```
Create an index.html


``` 
<html>
  <head></head>
  <body>
    <div id="app1"></div>
    <div id="app2"></div>
    <div id="app3"></div>
    <script src="/dist/single-spa.config.js"></script>
  </body>
</html>
```

Registering your applications in an single-spa.config.js file

``` 
import { registerApplication, start } from 'single-spa'
registerApplication(
  // Name of our single-spa application
  'home',
  // loadingFunction
  () => {},
  // activityFunction
  (location) => location.pathname === "" || 
    location.pathname === "/" || 
    location.pathname.startsWith('/home')
);
start();

```

# Build your application

**Define application livecycles**

**THE VUE WAY:**

Create a root-file main.vue
```

<template>
  <div>
      <h1>Hello from Vue</h1>
  </div>
</template>

```
Create your vue.app.js

``` 
import Vue from 'vue';
import App from './main.vue';
import singleSpaVue from 'single-spa-vue';
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: h => h(App),
    router,
  },
});
export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```
Extend webpack.config.js
```
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module: {
  rules: [
  {
    test:/\.vue$/,
    loader: 'vue-loader'
  }
  ]
}
plugins: [new VueLoaderPlugin()]
```

**THE REACT WAY**

Create a file called root.component.js
``` 
import React from "react"

const App = () => <h1>Hello from React</h1>

export default App
```
Create a file main.app.js

``` 
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Home from './root.component.js';

function domElementGetter() {
  return document.getElementById("react")
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Home,
  domElementGetter,
})

export const bootstrap = [
  reactLifecycles.bootstrap,
];

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];
```

**THE ANGULAR WAY**

Setup Angular Basic Setup

``` 
mkdir src/angularJS
cd src/angularJS
touch angularJS.app.js root.component.js root.template.html routes.js app.module.js gifs.component.js gifs.template.html
```
Set up  Angular Lifecycles in angularJS.app.js
``` 
import singleSpaAngularJS from 'single-spa-angularjs';
import angular from 'angular';
import './app.module.js';
import './routes.js';
const domElementGetter = () => document.getElementById('angularJS');
const angularLifecycles = singleSpaAngularJS({
  angular,
  domElementGetter,
  mainAngularModule: 'angularJS-app',
  uiRouter: true,
  preserveGlobal: false,
})
export const bootstrap = [
  angularLifecycles.bootstrap,
];
export const mount = [
  angularLifecycles.mount,
];
export const unmount = [
  angularLifecycles.unmount,
];
```
Set up Angular AngularJS App

app.module.js
``` 
import angular from 'angular';
import 'angular-ui-router';
angular
.module('angularJS-app', ['ui.router']);
``` 
root.component.js

```
import angular from 'angular';
import template from './root.template.html';
angular
.module('angularJS-app')
.component('root', {
  template,
})
```

root.template.html
``` 
<div ng-style='vm.styles'>
  <div class="container">
    <div class="row">
      <h4 class="light">
        Angular 1 example
      </h4>
      <p class="caption">
        This is a sample application written with Angular 1.5 and angular-ui-router.
      </p>
    </div>
    <div>
    <!-- These Routes will be set up in the routes.js file -->
      <a class="waves-effect waves-light btn-large" href="/angularJS/gifs" style="margin-right: 10px">
        Show me cat gifs
      </a>
      <a class="waves-effect waves-light btn-large" href="/angularJS" style="margin-right: 10px">
        Take me home
      </a>
    </div>
    <div class="row">
      <ui-view />
    </div>
  </div>
</div>
```
routes.js 
``` 
import angular from 'angular';
angular
.module('angularJS-app')
.config(($stateProvider, $locationProvider) => {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
  $stateProvider
    .state('root', {
      url: '/angularJS',
      template: '<root />',
    })
});
```


!!! Dont forget to register your app in single-spa-configs of your main folder!!!

# Run your app

```
npm start
```


Renders both apps : http://localhost:8080/

Renders only one app : http://localhost:8080/appname
