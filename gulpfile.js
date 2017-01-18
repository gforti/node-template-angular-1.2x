// ===============================================================
// Provider Demographic Roster
// ---------------------------------------------------------------
// this gulpfile is used to build sass, inspect javascript,
// do other manual tasks.
//
// to run the local node server, use: node server.js
// ===============================================================

/* Commands (task)
 ---------------------------------------------------------------
 gulp (runs default which runs build-all)
 test ( run your unit testing, spec files )
 serve ( Start your server, runs a build-all, sass, and watch before starting )
 build ( build just your app JS files and template cache )
 build-all ( does what build does along with the vendor JS files )
 sass ( all CSS files generated )

 ** - modular parts of the page
 create-widget
 rename-widget
 delete-widget

 ** - all logic and functionality should go in services
 create-service

  ** - Use a provider to organize a collection of services that will be used for the feature controller
 create-provider

  ** - use this when creating an abstract class that have a set of methods and/or properties that will be used in multiple services
 create-factory

 ** - Create a new page needed for the workflow that will include the different widgets needed
 create-feature
 rename-feature
 delete-feature


 create-modal
 rename-modal Note: does not rename modal path and controller name that is used in a feature, you have to manually do that
 delete-modal

*/
var generateJS = require('./app-task/generate-js'),
    compileSass = require('./app-task/build-saas');

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    path = require('path'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    csslint = require('gulp-csslint'),
    bundle = require('gulp-bundle-assets'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    prompt = require("gulp-prompt"),
    insert = require('gulp-insert'),
    removeEmptyLines = require('gulp-remove-empty-lines'),
    // karma = require('karma'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    nodemon = require('gulp-nodemon');


var options = {
    build: {
        dist: './webapp/public/dist/',
        css: './webapp/public/dist/css/',
        js: './webapp/public/dist/js/'
    },
    js: {
        src: 'webapp/public/app'
    },
    css: {
        sass: 'webapp/public/css/sass/',
        css: './webapp/public/dist/',
        mainFile: './webapp/public/css/sass/roster-demo.scss'
    },
    images: {
        path: ['./webapp/public/vendor/images/**/*.{png,gif,jpg,svg}'],
        folder: 'img/'
    },
    templates: {
        widget: {
            template: './gulp-templates/widget-template/',
            folder: './webapp/public/app/widgets/'
        },
        feature: {
            template: './gulp-templates/feature-template/',
            folder: './webapp/public/app/'
        },
        factory: {
            template: './gulp-templates/factory-template/',
            folder: './webapp/public/app/'
        },
        service: {
            template: './gulp-templates/service-template/',
            folder: './webapp/public/app/'
        },
        provider: {
            template: './gulp-templates/provider-template/',
            folder: './webapp/public/app/'
        },
        modal: {
            template: './gulp-templates/modal-template/',
            folder: './webapp/public/app/widgets/modals/'
        }
    }
};




gulp.task('sass', ['compile-css-vendor', 'copy-images'], function () {
    gulp.src(path.join(options.css.sass, '**/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest(options.build.css));
});


gulp.task('compile-css-vendor', function () {
    compileCSS(['./webapp/public/css/vendor/jquery-datepicker/**/*.css', './webapp/public/css/vendor/ui-grid.min.css'], ['pdm-vendor'])
});

gulp.task('copy-images', function () {
    copyFlattenFiles(options.images.path, options.build.css + options.images.folder);
});


gulp.task('csslint', function () {
    // gulp.src(path.join(options.css.css, '**/*.css'))
    gulp.src(path.join(options.build.css, 'roster-demo.css'))
        .pipe(csslint({
            "adjoining-classes": false,
            "box-sizing": false,
            "important": false
        }))
        .pipe(csslint.reporter());
});

gulp.task('lint', function () {
    return gulp.src(path.join(options.js.src, '**/*.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});


gulp.task('hello', generateJS.create);
gulp.task('world', compileSass.compile);


gulp.task('watch', function () {
    //
    livereload.listen();

    // build Sass files
    gulp.watch([path.join(options.css.sass, '**/*.scss'), path.join(options.templates.widget.folder, '**/*.scss'), path.join(options.templates.feature.folder, '**/*.scss')], ['sass']);

    gulp.watch(path.join(options.build.css, 'roster-demo.css')).on('change', livereload.changed);

    // build app js files
    gulp.watch(['./webapp/public/app/**/*js', './webapp/public/app/**/*.cache.html'], ['build']);
});

// builds vendor and app js
gulp.task('build-all', ['sass'], function () {
    prepareTemplates()
    return gulp.src('./config/bundle-all.config.js')
        .pipe(bundle())
        //.pipe(bundle.results('./config/'))
        .pipe(gulp.dest(options.build.js));
});

// builds only app js -- quicker build time during work stream
gulp.task('build', function () {
    prepareTemplates();
    return gulp.src('./config/bundle.config.js')
        .pipe(bundle())
        .pipe(gulp.dest(options.build.js));
});

gulp.task('clean', function () {
    return gulp.src(options.build.dist, {
            read: false
        })
        .pipe(clean());
});

gulp.task('serve', ['build-all', 'watch'], function () {
    nodemon({
        script: 'server.js',
        watch: ['server.js']
            //, ext: 'js html'
            //, env: {'NODE_ENV': 'stage'}
    })
});


gulp.task('mock-serve', ['build-all', 'watch'], function () {
    nodemon({
        script: 'server.js',
        watch: ['server.js']
            //, ext: 'js html'
            ,
        env: {
            'NODE_ENV': 'mock'
        }
    })
});

gulp.task('default',['build-all']);

function compileCSS(path, output) {
    return gulp.src(path)
        .pipe(sourcemaps.init())
        .pipe(concat(output + '.css'))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest(options.build.css));
}

function copyFlattenFiles(path, dest) {
    return gulp.src(path)
        .pipe(flatten())
        .pipe(gulp.dest(dest));
}

function copyFiles(path, dest) {
    return gulp.src(path)
        .pipe(gulp.dest(dest));
}




////////////////////////
// Generator tasks
////////////////////////

gulp.task('create-widget', function () {
    var name;
    return gulp.src('').pipe(prompt.prompt([{
        type: 'input',
        name: 'name',
        message: 'Name your widget (must be in "hello-world" format):'
    }], function (res) {
        if (!res.name) {
            gutil.log("A destination for the widget must be selected.");
        } else {
            createWidget(res.name).on('error', gutil.log);
            addWidgetToStyles(res.name).on('error', gutil.log);
        }
    }));
});

gulp.task('rename-widget', function () {
    var nameFrom, nameTo;
    return gulp.src('').pipe(prompt.prompt([{
        type: 'input',
        name: 'nameFrom',
        message: 'Current name of widget (must be in "hello-world" format):'
    }, {
        type: 'input',
        name: 'nameTo',
        message: 'New name of your widget (must be in "hello-world" format):'
    }], function (res) {
        if (!res.nameFrom || !res.nameTo) {
            gutil.log("Widget could not be renamed.");
        } else {
            renameWidget(res.nameFrom, res.nameTo).on('error', gutil.log);
            renameWidgetInStyles(res.nameFrom, res.nameTo).on('error', gutil.log);
        }
    }));
});

gulp.task('delete-widget', function () {
    var nameFrom, nameTo;
    return gulp.src("").pipe(prompt.prompt({
        type: 'input',
        name: 'name',
        message: 'Name of widget (must be in "hello-world" format):'
    }, function (res) {
        if (!res.name) {
            gutil.log("A destination for the widget must be selected.");
        } else {
            deleteWidget(res.name).on('error', gutil.log);
            deleteWidgetFromStyles(res.name).on('error', gutil.log);
        }
    }));
});



gulp.task('create-feature', function () {
    var name;
    return gulp.src('').pipe(prompt.prompt([{
        type: 'input',
        name: 'name',
        message: 'Name your feature (must be in "hello-world" format):'
    }], function (res) {
        if (!res.name) {
            gutil.log("A destination for the feature must be selected.");
        } else {
            createFeature(res.name).on('error', gutil.log);
            addFeatureToStyles(res.name).on('error', gutil.log);
        }
    }));
});


gulp.task('rename-feature', function () {
    var nameFrom, nameTo;
    return gulp.src('').pipe(prompt.prompt([{
        type: 'input',
        name: 'nameFrom',
        message: 'Current name of feature (must be in "hello-world" format):'
    }, {
        type: 'input',
        name: 'nameTo',
        message: 'New name of your feature (must be in "hello-world" format):'
    }], function (res) {
        if (!res.nameFrom || !res.nameTo) {
            gutil.log("Feature could not be renamed.");
        } else {
            renameFeature(res.nameFrom, res.nameTo).on('error', gutil.log);
            renameFeatureInStyles(res.nameFrom, res.nameTo).on('error', gutil.log);
        }
    }));
});


gulp.task('delete-feature', function () {
    var nameFrom, nameTo;
    return gulp.src('').pipe(prompt.prompt({
        type: 'input',
        name: 'name',
        message: 'Name of feature (must be in "hello-world" format):'
    }, function (res) {
        if (!res.name) {
            gutil.log("A destination for the feature must be selected.");
        } else {
            deleteFeature(res.name).on('error', gutil.log);
            deleteFeatureFromStyles(res.name).on('error', gutil.log);
        }
    }));
});


gulp.task('create-factory', function () {
    var nameFrom, nameTo;
    return gulp.src('').pipe(prompt.prompt([{
        type: 'input',
        name: 'nameFrom',
        message: 'Current name of feature (must be in "hello-world" format):'
    }, {
        type: 'input',
        name: 'nameTo',
        message: 'New name of your factory (must be in "hello-world" format):'
    }], function (res) {
        if (!res.nameFrom || !res.nameTo) {
            gutil.log("Factory could not be created.");
        } else {
            createFactory(res.nameFrom, res.nameTo).on('error', gutil.log);
        }
    }));
});


gulp.task('create-service', function () {
    var nameFrom, nameTo;
    return gulp.src('').pipe(prompt.prompt([{
        type: 'input',
        name: 'nameFrom',
        message: 'Current name of feature (must be in "hello-world" format):'
    }, {
        type: 'input',
        name: 'nameTo',
        message: 'New name of your service (must be in "hello-world" format):'
    }], function (res) {
        if (!res.nameFrom || !res.nameTo) {
            gutil.log("Service could not be created.");
        } else {
            createService(res.nameFrom, res.nameTo).on('error', gutil.log);
        }
    }));
});


gulp.task('create-provider', function () {
    var nameFrom, nameTo;
    return gulp.src('').pipe(prompt.prompt([{
        type: 'input',
        name: 'nameFrom',
        message: 'Current name of feature (must be in "hello-world" format):'
    }, {
        type: 'input',
        name: 'nameTo',
        message: 'New name of your provider (must be in "hello-world" format):'
    }], function (res) {
        if (!res.nameFrom || !res.nameTo) {
            gutil.log("Provider could not be created.");
        } else {
            createSProvider(res.nameFrom, res.nameTo).on('error', gutil.log);
        }
    }));
});




gulp.task('create-modal', function () {
    var name;
    return gulp.src('').pipe(prompt.prompt([{
        type: 'input',
        name: 'name',
        message: 'Name your modal (must be in "hello-world" format):'
    }], function (res) {
        if (!res.name) {
            gutil.log("A destination for the modal must be selected.");
        } else {
            createModal(res.name).on('error', gutil.log);
        }
    }));
});


gulp.task('rename-modal', function () {
    var nameFrom, nameTo;
    return gulp.src('').pipe(prompt.prompt([{
        type: 'input',
        name: 'nameFrom',
        message: 'Current name of modal (must be in "hello-world" format):'
    }, {
        type: 'input',
        name: 'nameTo',
        message: 'New name of your modal (must be in "hello-world" format):'
    }], function (res) {
        if (!res.nameFrom || !res.nameTo) {
            gutil.log("Modal could not be renamed.");
        } else {
            renameModal(res.nameFrom, res.nameTo).on('error', gutil.log);
        }
    }));
});


gulp.task('delete-modal', function () {
    var nameFrom, nameTo;
    return gulp.src('').pipe(prompt.prompt({
        type: 'input',
        name: 'name',
        message: 'Name of modal (must be in "hello-world" format):'
    }, function (res) {
        if (!res.name) {
            gutil.log("A destination for the feature must be selected.");
        } else {
            deleteModal(res.name).on('error', gutil.log);
        }
    }));
});

////////////////////////
// Generator Functions
////////////////////////

/* Expects name in 'widget-template' format */
function createWidget(name) {
    var nameMain = titleCase(name);
    var nameDirective = lowerCaseFirstLetter(nameMain);
    var SassName = '_' + name;
    return gulp.src(options.templates.widget.template + "*")
        .pipe(replace("WidgetTemplate", nameMain))
        .pipe(replace("widgetTemplate", nameDirective))
        .pipe(replace("widget-template", name))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            path.basename = (path.extname === '.scss' ? SassName : name);

            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(options.templates.widget.folder + name)).on('error', gutil.log);
}



/* Expects name in 'widget-template' format
   Outputs 'WidgetTemplate' format */
function titleCase(string) {
    if (!string) {
        return;
    }
    var words = string.split('-');
    var output = "";
    for (var i = 0, l = words.length; i < l; ++i) {
        output += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return output;
}

function lowerCaseFirstLetter(string) {
    if (!string) {
        return;
    }
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function renameWidget(nameFrom, nameTo) {
    var nameFromMain = titleCase(nameFrom);
    var nameFromDirective = lowerCaseFirstLetter(nameFromMain);
    var nameToMain = titleCase(nameTo);
    var nameToDirective = lowerCaseFirstLetter(nameToMain);
    var SassName = '_' + nameTo;
    return gulp.src(options.templates.widget.folder + nameFrom + "/**/*")
        .pipe(clean({
            force: true
        }))
        .pipe(replace(nameFromMain, nameToMain))
        .pipe(replace(nameFromDirective, nameToDirective))
        .pipe(replace(nameFrom, nameTo))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            if (path.basename.indexOf(nameFrom) > -1) {
                path.basename = (path.extname === '.scss' ? SassName : nameTo);
            }
            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(options.templates.widget.folder + nameTo)).on('error', gutil.log);
}

function deleteWidget(name) {
    return gulp.src(options.templates.widget.folder + name)
        .pipe(clean({
            force: true
        })).on('error', gutil.log);
}


// Expects name in 'widget-template' format
function addWidgetToStyles(name) {
    return gulp.src(options.css.mainFile)
        .pipe(insert.append('@import "' + options.templates.widget.folder + name + '/' + name + '";\n'))
        .pipe(gulp.dest(options.css.sass)).on('error', gutil.log);
}

function renameWidgetInStyles(nameFrom, nameTo) {
    return gulp.src(options.css.mainFile)
        .pipe(replace(nameFrom, nameTo))
        .pipe(gulp.dest(options.css.sass)).on('error', gutil.log);
}

function deleteWidgetFromStyles(name) {
    return gulp.src(options.css.mainFile)
        .pipe(replace('@import "' + options.templates.widget.folder + name + '/' + name + '";', ''))
        .pipe(removeEmptyLines())
        .pipe(gulp.dest(options.css.sass)).on('error', gutil.log);
}



/* Expects name in 'widget-template' format */
function createFeature(name) {
    var nameTitleCase = titleCase(name);
    var nameCamelCase = lowerCaseFirstLetter(nameTitleCase);
    var SassName = '_' + name;
    return gulp.src(options.templates.feature.template + "*")
        .pipe(replace("FeatureTemplate", nameTitleCase))
        .pipe(replace("featureTemplate", nameCamelCase))
        .pipe(replace("feature-template", name))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            path.basename = (path.extname === '.scss' ? SassName : name);

            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(options.templates.feature.folder + name)).on('error', gutil.log);
}

function addFeatureToStyles(name) {
    return gulp.src(options.css.mainFile)
        .pipe(insert.append('@import "' + options.templates.feature.folder + name + '/' + name + '";\n'))
        .pipe(gulp.dest(options.css.sass)).on('error', gutil.log);
}


function renameFeature(nameFrom, nameTo) {
    var nameFromMain = titleCase(nameFrom);
    var nameFromDirective = lowerCaseFirstLetter(nameFromMain);
    var nameToMain = titleCase(nameTo);
    var nameToDirective = lowerCaseFirstLetter(nameToMain);
    var SassName = '_' + nameTo;
    return gulp.src(options.templates.feature.folder + nameFrom + "/**/*")
        .pipe(clean({
            force: true
        }))
        .pipe(replace(nameFromMain, nameToMain))
        .pipe(replace(nameFromDirective, nameToDirective))
        .pipe(replace(nameFrom, nameTo))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            if (path.basename.indexOf(nameFrom) > -1) {
                path.basename = (path.extname === '.scss' ? SassName : nameTo);
            }
            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(options.templates.feature.folder + nameTo)).on('error', gutil.log);
}


function renameFeatureInStyles(nameFrom, nameTo) {
    return renameWidgetInStyles(nameFrom, nameTo);
}

function deleteFeature(name) {
    return gulp.src(options.templates.feature.folder + name)
        .pipe(clean({
            force: true
        })).on('error', gutil.log);
}

function deleteFeatureFromStyles(name) {
    return gulp.src(options.css.mainFile)
        .pipe(replace('@import "' + options.templates.feature.folder + name + '/' + name + '";', ''))
        .pipe(removeEmptyLines())
        .pipe(gulp.dest(options.css.sass)).on('error', gutil.log);
}


function createFactory(featureName, factoryName) {
    var factoryNameTitleCase = titleCase(factoryName);
    var featureNameCamelCase = lowerCaseFirstLetter(titleCase(featureName));

    return gulp.src(options.templates.factory.template + "*")
        .pipe(replace("FactoryTemplate", factoryNameTitleCase))
        .pipe(replace("featureTemplate", featureNameCamelCase))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            path.basename = factoryName;

            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(options.templates.factory.folder + featureName)).on('error', gutil.log);
}

function createService(featureName, serviceName) {
    var serviceNameTitleCase = titleCase(serviceName);
    var featureNameCamelCase = lowerCaseFirstLetter(titleCase(featureName));

    return gulp.src(options.templates.service.template + "*")
        .pipe(replace("ServiceTemplate", serviceNameTitleCase))
        .pipe(replace("featureTemplate", featureNameCamelCase))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            path.basename = serviceName;

            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(options.templates.service.folder + featureName)).on('error', gutil.log);
}

function createSProvider(featureName, providerName) {
    var providerNameTitleCase = titleCase(providerName);
    var featureNameCamelCase = lowerCaseFirstLetter(titleCase(featureName));

    return gulp.src(options.templates.provider.template + "*")
        .pipe(replace("ProviderTemplate", providerNameTitleCase))
        .pipe(replace("featureTemplate", featureNameCamelCase))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            path.basename = providerName;

            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(options.templates.provider.folder + featureName)).on('error', gutil.log);
}




/****************MODAL*********************/
/* Expects name in 'widget-template' format */
function createModal(name) {
    var nameTitleCase = titleCase(name);
    var nameCamelCase = lowerCaseFirstLetter(nameTitleCase);
    var SassName = '_' + name;
    return gulp.src(options.templates.modal.template + "*")
        .pipe(replace("ModalTemplate", nameTitleCase))
        .pipe(replace("modalTemplate", nameCamelCase))
        .pipe(replace("modal-template", name))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            path.basename = (path.extname === '.scss' ? SassName : name + '-modal');

            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(options.templates.modal.folder + name + '-modal')).on('error', gutil.log);
}


function renameModal(nameFrom, nameTo) {
    var nameFromMain = titleCase(nameFrom);
    var nameFromDirective = lowerCaseFirstLetter(nameFromMain);
    var nameToMain = titleCase(nameTo);
    var nameToDirective = lowerCaseFirstLetter(nameToMain);
    var SassName = '_' + nameTo;
    return gulp.src(options.templates.modal.folder + nameFrom + "-modal/**/*")
        .pipe(clean({
            force: true
        }))
        .pipe(replace(nameFromMain, nameToMain))
        .pipe(replace(nameFromDirective, nameToDirective))
        .pipe(replace(nameFrom, nameTo))
        .pipe(rename(function (path) {
            var type = path.basename.split(".");
            if (path.basename.indexOf(nameFrom) > -1) {
                path.basename = (path.extname === '.scss' ? SassName : nameTo + '-modal');
            }
            if (type[2]) {
                path.extname = '.' + type[1] + '.' + type[2] + path.extname;
            } else if (type[1]) {
                path.extname = '.' + type[1] + path.extname;
            } else {
                path.extname = path.extname;
            }
        }))
        .pipe(gulp.dest(options.templates.modal.folder + nameTo + '-modal')).on('error', gutil.log);
}

function deleteModal(name) {
    return gulp.src(options.templates.modal.folder + name + '-modal')
        .pipe(clean({
            force: true
        })).on('error', gutil.log);
}


function prepareTemplates() {
    return gulp.src(['./webapp/public/app/**/*.cache.html'])
        .pipe(angularTemplateCache({
            root: 'cache/',
            module: 'pdr'
        }))
        .pipe(gulp.dest(options.build.js));
}


////////////////////////
// Testing Functions
////////////////////////

gulp.task('test', ['build-all'], function (done) {
    runTests(true, done);
});

function runTests(singleRun, done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: singleRun
    }, done).start();
}
