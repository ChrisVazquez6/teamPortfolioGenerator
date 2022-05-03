const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var fse = require('fs-extra');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");
const { finished } = require("stream");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


let employeeArray = []

const finishedfunction = () =>{
  let team = render(employeeArray)
  fse.outputFile('output/team.html', team)
    .then(() => {
      console.log('You created a Team!');
    })
    .catch(err => {
      console.error(err)
    })
}

const contQ= () => {
  inquirer.prompt([{
    message:'would you like to add more people to your team?',
    choices:['yes','no'],
    type:'list',
    name:'addTeamMembers',
  }])
  .then(addTeamMembers => {
    if (addTeamMembers.addTeamMembers === 'yes'){
      engineerOrIntern()
    }else{
      finishedfunction()
    }
  })
}

const engineerOrIntern = () => {
  inquirer.prompt([{
    message: 'add a engineer or a intern to the team',
    type: 'list',
    choices:['engineer', 'intern'],
    name: 'teamMember'
  }])
    .then(answer => {
      console.log(answer)
      if(answer.engineerOrIntern="engineer"){
        inquirer.prompt([
          {
            message: 'what is the name of the Engineer',
            type: 'input',
            name: 'name',
          },
          {
            message: 'what is the Engineer ID?',
            type: 'input',
            name: 'ID',
          },
          {
            message: 'what is the Engineer email?',
            type: 'input',
            name: 'email',
          },
          {
            message: 'what is the Engineer Github?',
            type: 'input',
            name: 'GitHub',
          },
        ])
        .then(engineer => {
          console.log(engineer)
          let newEngineer = new Engineer(engineer.name, engineer.ID, engineer.email, engineer.GitHub)
          employeeArray.push(newEngineer)
          console.log(employeeArray)
          contQ()
        })

      } else if(answer.engineerOrIntern="intern"){
        inquirer.prompt([{
          message: 'what is the name of the Intern',
          type: 'input',
          name: 'name',
        },
          {
            message: 'what is the Interns ID?',
            type: 'input',
            name: 'ID',
          },
          {
            message: 'what is the Interns email?',
            type: 'input',
            name: 'email',
          },
          {
            message: 'what is the Interns School?',
            type: 'input',
            name: 'School',
          }])
          .then(intern => {
            let nIntern = new Intern(intern.name, intern.ID, intern.email, intern.School)
            employeeArray.push(nIntern)
            console.log(employeeArray)
            contQ()
          })
      }
    })
}

inquirer.prompt([
 
  {
    message: 'what is the name of your manager?',
    type: 'input',
    name: 'name',
  },
  {
    message: 'what is the managers ID?',
    type: 'input',
    name: 'ID',
  },
  {
    message: 'what is the managers email?',
    type: 'input',
    name: 'email',
  },
  {
    message: 'what number is the managers office?',
    type: 'input',
    name: 'office',
  },
])
.then(manager=>{
  console.log(manager);
  let newManager=new Manager(manager.name, manager.ID, manager.email, manager.office)
  employeeArray.push(newManager)
  engineerOrIntern()
})

