module.exports = function (grunt) {
  grunt
    .initConfig({
      "couch-compile": {
        dbs: {
          files: {
            "/tmp/twitter.json": "couchdb/twitter/mapreduce"
          }
        }
      },
      "couch-push": {
        options: {
          user: 'admin',
          pass: '123456'
        },
        twitter: {
        }
      }
    });

  grunt.config.set(`couch-push.twitter.files.http://172\\.26\\.132\\.72:5984/${process.env.dbname}`, "/tmp/twitter.json");
console.log(JSON.stringify(grunt.config.get()));
  grunt.loadNpmTasks("grunt-couch");
};
