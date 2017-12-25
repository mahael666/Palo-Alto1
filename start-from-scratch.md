# Start from scratch

It is assumed that you've already install Node of version 8.9.1 (using nvm).

#### 1. Initialize your project directory:

```sh
$ npm init
```
Just press "Enter" to all questions.

__If you want to install any package:__

```sh
$ npm install --save-dev <package-name>
```

#### 2. Install gulp in your project devDependencies:

```sh
$ npm install --save-dev gulp
```

#### 3. Create a gulpfile.js at the root of your project:

```js
var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});
```

#### 4. Don't forget to create a .gitignore:

```
node_modules/
.idea/
dist/
```
