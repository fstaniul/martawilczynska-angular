const fs = require('fs');
const path = require('path');

function checkErr(err) {
  if (err) {
    console.log(err);
    process.exit();
  }
}

const types = ['horizontal', 'vertical'];

result = {};
finished = 0;

function save() {
  finished++;
  if (finished === types.length) {
    fs.writeFile(path.join(__dirname, 'certificates.json'), JSON.stringify(result), { encoding: 'utf-8' }, (err) => {
      checkErr(err);
      console.log('Created certificates.json');
    });
  }
}

types.forEach((type) => {
  result[type] = [];
  fs.readdir(path.join(__dirname, type), (err, files) => {
    checkErr(err);

    files.forEach((filename) => {
      result[type].push({ src: '/assets/img/certificates/' + type + '/' + filename, alt: '' });
    });

    save();
  });
});
