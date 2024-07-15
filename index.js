// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What command should be run to install dependencies?',
        default: 'npm i',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What command should be run to run tests?',
        default: 'npm test',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'What does the user need to know about using the repo?',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'What does the user need to know about contributing to the repo?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
    console.log('Successfully created README.md!');
}

// Function to generate markdown for README
function generateReadMe(response) {
    return `
  # ${response.title}
  
  ![License](https://img.shields.io/badge/license-${response.license.replace(' ', '%20')}-blue.svg)
  
  ## Description
  ${response.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  To install necessary dependencies, run the following command:
  \`\`\`
  npm i
  \`\`\`

  ## Usage
  ${response.usage}

  ## License
  This project is licensed under the ${response.license} license.

  ## Contributing
  ${response.contributing}

  ## Tests
  To run tests, execute the following command:
  \`\`\`
  npm test
  \`\`\`

  ## Questions
  For any questions, please contact me at [${response.email}](mailto:${response.email}) or visit my GitHub profile [${response.github}](https://github.com/${response.github}).
  `;
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((response) => {
        const markdown = generateReadMe(response);
        if (!fs.existsSync('gen')) {
            fs.mkdirSync('gen');
        }
        writeToFile('gen/README.md', markdown);
    });
}
// Function call to initialize app
init();
