// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee.js')

class Manager extends Employee {
  constructor(name, id, email, Office) {
    super(name, id, email);
    this.Office = Office
}
getName() {
  return this.name
}
getId() {
  return this.id
}
getEmail() {
  return this.email
}
getRole() {
  return "Manager";
}
getGithub() {
  return this.Office;
}

}

module.exports = Manager;