module.exports = function(grunt) {

    var packageFile = grunt.file.readJSON('package.json');

    /*
     * ------------------------------------------------------
     * Gera a string com os autores do projeto
     * ------------------------------------------------------
     */
    var authors   = "";

    for( i in packageFile.authors ){
        if( authors == "" ){
            authors = packageFile.authors[i];
        }else{
            authors = authors+"\n\t  "+packageFile.authors[i];
        }
    }
    /*
     * ------------------------------------------------------
     */

    /*
     * ------------------------------------------------------
     * Banners dos arquivos
     * ------------------------------------------------------
     */
    var hr = '----------------------------------------------------\n';
    var bannerFiles = '/*\n' +
        hr+
        'Virginia Rodrigues Cruz\n' +
        hr+
        'projeto\t: <%= pkg.name %>\n' +
        'versao\t: <%= pkg.version %>\n' +
        'data\t: <%= grunt.template.today("dd/mm/yyyy HH:MM:ss") %>\n' +
        'autores\t: <%= authors %>\n' +
        hr+
        '*/\n';
    /*
     * ------------------------------------------------------
     */

    /*
     * Configurações das Tasks
     */
    grunt.initConfig({
        pkg: packageFile,
        authors: authors,

        /**
         * Watch
         *
         * Acompanha mudanças nos arquivos e executa as tasks definidas.
         *
         * @example https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            scripts: {
                files: [
                    'src/js/**/*.js'
                ],
                tasks: ['concat']
            },
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass', 'cssmin']
            },
        },

        /**
         * Uglify
         *
         * Minifica arquivos javascripts
         *
         * @example https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            options: {
                mangle: false,
                banner:bannerFiles
            },
            main: {
                files: {
                    'src/js/**/*.js':''
                }
            }
        },

        /**
        * Contat
        *
        * Concatena os arquivos javascripts
        *
        * @example https://github.com/gruntjs/grunt-contrib-uglify
        */
        concat: {
            options: {
                separator: ';\n',
                stripBanners:true,
                banner:bannerFiles
            },
            main: {
                src: '',
                dest: ''
            }
        },

        //sass
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    noCache: true,
                },
                files: {
                    'app/assets/css/style.css': 'src/sass/style.scss'
                }
            }
        },

        // cssmin
        cssmin: {
            combine: {
                options: {
                    banner:bannerFiles,
                    keepSpecialComments:0
                },
                files: {
                    'app/assets/css/style.min.css': [
                    'app/assets/css/style.css',
                    ]
                }
            }
        },

        // copy
        copy: {
            script: {
                src: 'app/assets/js/app.js',
                dest: 'app/assets/js/app.js'
            },

            maps: {
                flatten: true,
                expand: true,
                filter: 'isFile',
                cwd: 'source/',
                src : '**/.html',
                dest: 'app/'
            }
        }
    });

    // Carrega o plugin que disponibiliza a tarefa "uglify"
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Tarefa(s) padrão
    grunt.registerTask('dev', ['sass','watch']);
    grunt.registerTask('build'  , ['sass','cssmin']);
};
