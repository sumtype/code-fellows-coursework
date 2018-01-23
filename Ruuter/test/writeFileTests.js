var expect = require('chai').expect, fs = require('fs'), mkdirp = require('mkdirp'), writeFile = require(__dirname + '/../lib/writeFile.js');
describe('writeFile(path, ext, data, options)', function() {
  before(function(done) {
    this.options1 = {namingConvention: 'date', overwrite: true};
    this.options2 = {namingConvention: 'date', overwrite: false};
    this.options3 = {namingConvention: 'time', overwrite: true};
    this.options4 = {namingConvention: 'dateTime', overwrite: true};
    this.content = 'data_' + Date.now();
    mkdirp.sync(__dirname + '/fileNamerTestFiles/dir/');
    fs.writeFileSync((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '.txt'), 'intial value');
    fs.writeFileSync((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '_NO_WRITE.txt'), 'intial value');
    fs.chmodSync((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '_NO_WRITE.txt'),0400);
    done();
  });
  after(function(done) {
    fs.unlinkSync((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '.txt'));
    fs.unlinkSync((__dirname + '/fileNamerTestFiles/newDir1/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '.txt'));
    fs.chmodSync((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '_NO_WRITE.txt'),0200);
    fs.unlinkSync((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '_NO_WRITE.txt'));
    fs.rmdirSync(__dirname + '/fileNamerTestFiles/newDir1');
    var files = fs.readdirSync(__dirname + '/fileNamerTestFiles/dir');
    for (i = 0; i < files.length; i++) {
      fs.unlinkSync((__dirname + '/fileNamerTestFiles/dir/' + files[i]));
    }
    fs.rmdirSync(__dirname + '/fileNamerTestFiles/dir');
    fs.rmdirSync(__dirname + '/fileNamerTestFiles');
    done();
  });
  //Date, Time, and dateTime Tests
  it('Should create a new text file named the current date (month-day-year).', function(done) {
    var fileContent = this.content;
    writeFile(__dirname + '/fileNamerTestFiles/dir/', '.txt', this.content, this.options1, function() {
      fs.readFile((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '.txt'), (err, data) => {
        if (err) throw err;
        expect(data.toString('utf8')).to.equal(fileContent);
        done();
      });
    });
  });
  it('Should create a new text file named the current time (hour-minute-second-millisecond).', function(done) {
    var fileContent = this.content;
    writeFile(__dirname + '/fileNamerTestFiles/dir/', '.txt', this.content, this.options3, function() {
      var files = fs.readdirSync(__dirname + '/fileNamerTestFiles/dir');
      for (i = 0; i < files.length; i++) {
        if (files[i].substr(0, files[i].lastIndexOf('.')).split('-').length === 4) {
          fs.readFile((__dirname + '/fileNamerTestFiles/dir/' + files[i]), (err, data) => {
            if (err) throw err;
            expect(data.toString('utf8')).to.equal(fileContent);
            done();
          });
        }
      }
    });
  });
  it('Should create a new text file named the current date and time (month-day-year_hour-minute-second-millisecond).', function(done) {
    var fileContent = this.content;
    writeFile(__dirname + '/fileNamerTestFiles/dir/', '.txt', this.content, this.options4, function() {
      var files = fs.readdirSync(__dirname + '/fileNamerTestFiles/dir');
      for (i = 0; i < files.length; i++) {
        if (files[i].substr(0, files[i].lastIndexOf('.')).split('-').length === 6) {
          fs.readFile((__dirname + '/fileNamerTestFiles/dir/' + files[i]), (err, data) => {
            if (err) throw err;
            expect(data.toString('utf8')).to.equal(fileContent);
            done();
          });
        }
      }
    });
  });
  //General Tests
  it('Should not overwrite a file with the same name as it when options.overwrite is equal to false.', function(done) {
    var fileContent = this.content;
    writeFile(__dirname + '/fileNamerTestFiles/dir/', '.txt', 'different content', this.options2, function() {
      fs.readFile((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '.txt'), (err, data) => {
        if (err) throw err;
        expect(data.toString('utf8')).to.equal(fileContent);
        done();
      });
    });
  });
  it('Should not overwrite a file with the same name as it when options.overwrite is equal to true, but the file denies write permission.', function(done) {
    var fileContent = this.content;
    writeFile(__dirname + '/fileNamerTestFiles/dir/', '.txt', 'different content', this.options1, function() {
      fs.readFile((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '_NO_WRITE.txt'), (err, data) => {
        if (err) throw err;
        expect(data.toString('utf8')).to.equal('intial value');
        done();
      });
    });
  });
  it('Should overwrite a file with the same name as it when options.overwrite is equal to true.', function(done) {
    var newFileContent = 'data_' + Date.now();
    writeFile(__dirname + '/fileNamerTestFiles/dir/', '.txt', newFileContent, this.options1, function() {
      fs.readFile((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '.txt'), (err, data) => {
        if (err) throw err;
        expect(data.toString('utf8')).to.equal(newFileContent);
        done();
      });
    });
  });
  it('Should create a new text file named the current date at a new path, including any new parent directories.', function(done) {
    var fileContent = this.content;
    writeFile(__dirname + '/fileNamerTestFiles/newDir1/', '.txt', this.content, this.options1, function() {
      fs.readFile((__dirname + '/fileNamerTestFiles/newDir1/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '.txt'), (err, data) => {
        if (err) throw err;
        expect(data.toString('utf8')).to.equal(fileContent);
        done();
      });
    });
  });
  it('Should create a new text file with the proper "." extension if the extension specified does not contain a ".".', function(done) {
    var fileContent = this.content;
    writeFile(__dirname + '/fileNamerTestFiles/dir/', 'txt', 'more new content', this.options1, function() {
      fs.readFile((__dirname + '/fileNamerTestFiles/dir/' + ((new Date).getMonth() + 1) + '-' + (new Date).getDate() + '-' + (new Date).getFullYear() + '.txt'), (err, data) => {
        if (err) throw err;
        expect(data.toString('utf8')).to.equal('more new content');
        done();
      });
    });
  });
  it('Should return an error string when a parameter besides callback is not defined.', function() {
    expect(writeFile(__dirname + '/fileNamerTestFiles/dir/', 'txt', 'more new content')).to.equal('Error:  All function parameters (path, extension, data, and options) except callback must be declared.');
    expect(writeFile(__dirname + '/fileNamerTestFiles/dir/', 'txt')).to.equal('Error:  All function parameters (path, extension, data, and options) except callback must be declared.');
    expect(writeFile(__dirname + '/fileNamerTestFiles/dir/')).to.equal('Error:  All function parameters (path, extension, data, and options) except callback must be declared.');
    expect(writeFile()).to.equal('Error:  All function parameters (path, extension, data, and options) except callback must be declared.');
  });
  it('Should return an error string when a parameter is not an appropriate type.', function() {
    expect(writeFile(0, 'txt', 'more new content', this.options1, function(){})).to.equal('Error: The path parameter must be a string.');
    expect(writeFile(__dirname + '/fileNamerTestFiles/dir/', 0, 'more new content', this.options1, function(){})).to.equal('Error: The ext parameter must be a string.');
    expect(writeFile(__dirname + '/fileNamerTestFiles/dir/', 'txt', 0, this.options1, function(){})).to.equal('Error: The data parameter must be a string or a buffer.');
    expect(writeFile(__dirname + '/fileNamerTestFiles/dir/', 'txt', 'more new content', 0, function(){})).to.equal('Error: The options parameter must be an object.');
    expect(writeFile(__dirname + '/fileNamerTestFiles/dir/', 'txt', 'more new content', this.options1, 0)).to.equal('Error: The callback parameter must be a function.');
  });
});
