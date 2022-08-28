// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map((array) => {
    return createEmployeeRecord(array);
  });
}
function createTimeInEvent(object, timeStamp) {
  object.timeInEvents.push({
    type: "TimeIn",
    hour: Number(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0],
  });
  return object;
}
function createTimeOutEvent(object, timeStamp) {
  object.timeOutEvents.push({
    type: "TimeOut",
    hour: Number(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0],
  });
  return object;
}
function hoursWorkedOnDate(object, date) {
  const timeIn = object.timeInEvents.filter((obj) => {
    return obj.date === date;
  })[0].hour;
  const timeOut = object.timeOutEvents.filter((obj) => {
    return obj.date === date;
  })[0].hour;
  return (timeOut - timeIn) / 100;
}
function wagesEarnedOnDate(object, date) {
  return object.payPerHour * hoursWorkedOnDate(object, date);
}
function allWagesFor(object) {
  return object.timeInEvents
    .map((element) => {
      return wagesEarnedOnDate(object, element.date);
    })
    .reduce((totalWages, wage) => totalWages + wage);
}
function calculatePayroll(array) {
  return array.map((employee) => allWagesFor(employee)).reduce((payroll, employeeWage) => payroll + employeeWage);
}
