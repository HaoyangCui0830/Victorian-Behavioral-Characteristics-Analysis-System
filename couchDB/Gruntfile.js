module.exports = function (grunt) {
  grunt
    .initConfig({
      "couch-compile": {
        dbs: {
          files: {
            "/tmp/twitter.json": "couchdb/twitter/time"
          }
        }
      },
      "couch-push": {
        options: {
          user: 'admin',
          pass: 'password'
        },
        twitter: {
        }
      }
    });

  grunt.config.set(`couch-push.twitter.files.http://172\\.26\\.133\\.92:5984/${process.env.dbname}`, "/tmp/twitter.json");
console.log(JSON.stringify(grunt.config.get()));
  grunt.loadNpmTasks("grunt-couch");
};
