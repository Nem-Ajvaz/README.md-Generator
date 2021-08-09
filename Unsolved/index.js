// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const renderLicense = require("./utils/generateMarkdown.js");
const writeReadMe = util.promisify(fs.writeFile);
input = (input) => {
  if (input) {
    return true;
  }
  return "Please ensure your input is entered.";
};

// TODO: Create an array of questions for user input
const questions = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Please enter your project title.",
      validate: input,
    },
    {
      type: "input",
      name: "description",
      message: "What was the motivation behind this project?",
      validate: input,
    },
    {
      type: "input",
      name: "problem",
      message: "What problem are you trying to solve?",
      validate: input,
    },
    {
      type: "input",
      name: "install",
      message: "What are the steps required to install your project?",
      validate: input,
    },
    {
      type: "input",
      name: "usage",
      message: "Please provide some instructions and examples of use.",
      validate: input,
    },
    {
      type: "input",
      name: "githubUsername",
      message: "What is your GitHub username?",
      validate: input,
    },
    {
      type: "input",
      name: "email",
      message: "Please enter your email address.",
      validate: input,
    },
    {
      type: "input",
      name: "contribution",
      message: "How can people contribute",
      validate: input,
    },
    {
      type: "list",
      name: "license",
      choices: [
        "MIT",
        "GNU_GPLv3",
        "Apache_v2",
        "BSD_2_Clause",
        "MPL_2",
        "None",
      ],
    },
  ]);
};

// TODO: Create a function to write README file

const generateREADME = (response) => {
  console.log(response.license);
  const license = renderLicense(response.license);

  return `
# ${response.title}
${license}
    
## Description
The motivation behind this project was to: ${response.description}
This project will solve the following problem:  ${response.problem}
## License
${response.license} License 
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)
- [Questions](#questions)
## Installation
${response.install}
## Usage
${response.usage}
## Contribution
Against my better judgement I am not taking any contributions right now.
${response.contribution}
## Questions 
For any further questions please reach out to my email :Email: ${response.email} \
or message me on GitHub: (https://github.com/${response.githubUsername})
`;
};

// TODO: Create a function to initialize app
const init = () => {
  questions()
    .then((response) =>
      writeReadMe("/Unsolved/README.md", generateREADME(response))
    )
    .then(() => console.log("Your README.md has been successfully generated."))
    .catch((err) => console.error(err));
};

// Function call to initialize app
init();
