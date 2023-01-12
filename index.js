// Your code here

function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: date
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: date
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = 0;
    let timeOut = 0;
    for(let i = 0; i < employeeRecord.timeInEvents.length; i++){
        if(employeeRecord.timeInEvents[i].date === date){
            timeIn = employeeRecord.timeInEvents[i].hour;
            break;
        }
    }
    for(let i = 0; i < employeeRecord.timeOutEvents.length; i++){
        if(employeeRecord.timeOutEvents[i].date === date){
            timeOut = employeeRecord.timeOutEvents[i].hour;
            break;
        }
    }
    let timeInHour = parseInt(timeIn.slice(0,2));
    let timeInMinutes = parseInt(timeIn.slice(2));
    let timeOutHour = parseInt(timeOut.slice(0,2));
    let timeOutMinutes = parseInt(timeOut.slice(2));
    let workedHour = timeOutHour - timeInHour;
    let workedMinutes = timeOutMinutes - timeInMinutes;
    if(workedMinutes < 0){
        workedHour -= 1;
        workedMinutes += 60;
    }
    return workedHour + (workedMinutes/60);
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return employeeRecord.payPerHour * hoursWorked;
}

function allWagesFor(employeeRecord) {
    let totalPay = 0;
    let dates = new Set();
    for(let i = 0; i < employeeRecord.timeInEvents.length; i++){
        dates.add(employeeRecord.timeInEvents[i].date);
    }
    for(let i = 0; i < employeeRecord.timeOutEvents.length; i++){
        dates.add(employeeRecord.timeOutEvents[i].date);
    }
    for(let date of dates){
        totalPay += wagesEarnedOnDate(employeeRecord, date);
    }
    return totalPay;
}

function calculatePayroll(employeeRecords) {
    let totalPay = 0;
    for(let i = 0; i < employeeRecords.length; i++){
        totalPay += allWagesFor(employeeRecords[i]);
    }
    return totalPay;
}