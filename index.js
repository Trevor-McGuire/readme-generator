const inquirer = require('inquirer')
const fs = require('fs')

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the title of the project?',
      name: 'title',
    },
  ])
  .then((response) =>
    fs.readFile('template.md', 'utf8', function(error, data) {
      if (error) {
        console.error(error)
      } else {
        
      }
      String.prototype.interpolate = function(params) {
        const names = Object.keys(params);
        const vals = Object.values(params);
        return new Function(...names, `return \`${this}\`;`)(...vals);
      }
      
      const template = data;
      const result = template.interpolate({
        title: response.title
      });
      console.log(result);
    })
    // fs.appendFile('README.md', process.argv[2], (err) =>
    //   err ? console.error(err) : console.log('Success!')
    // )
  )
