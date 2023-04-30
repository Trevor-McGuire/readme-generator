const inquirer = require('inquirer')
const fs = require('fs')

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the title of the project?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Give a paragraph describing the project.',
      name: 'descPara',
    },
    {
      type: 'input',
      message: 'Give instalation instructions in the form of bullet points. (use a single line and seperate bullets using the "*" key)',
      name: 'iBlt',
    },
    {
      type: 'input',
      message: 'Give programe execution instructions in the form of bullet points. (use a single line and seperate bullets using the "*" key)',
      name: 'exeBlt',
    },
    {
      type: 'input',
      message: 'Write a paragraph describing how the public can contribute to the project.',
      name: 'contribPara',
    },
    {
      type: 'input',
      message: 'Write a paragraph describing how to test the application.',
      name: 'testBlt',
    },
  ])
  .then( function(response) {
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
        title: response.title,
        descPara: response.descPara,
        iBlt: "* " + response.iBlt.replace(/\*/g,"\n* "),
        exeBlt: "* " + response.exeBlt.replace(/\*/g,"\n* "),
        contribPara: response.contribPara,
        testBlt: "* " + response.testBlt.replace(/\*/g,"\n* "),
      });
      fs.writeFile('README.md', result, (err) =>
        err ? console.error(err) : console.log('Success!')
      )
    })
  })

function generateMarkdown(data) {
  return `# ${data.title}
  ## license 
  ${renderLicenseBadge(license)}
  `
}