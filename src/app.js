let names = [];
let result = {};
const CSVToJSON = require("csvtojson");
const FileSystem = require("fs");

CSVToJSON().fromFile("./csv/acme_worksheet.csv").then(source => {
    for (let i = 0; i < source.length; i++) {
        addItem(source[i]);
    }
    let str = 'Name/Date,';
    let dates = Object.keys(result).sort();
    dates.forEach(data => {str += data + ',';})
    str += '\n';
    names.forEach(name => {
        str += name + ',';
        dates.forEach(data => {
            str += (result[data][name] || '')+',';
        })
        str += '\n';
    })
    
    FileSystem.writeFileSync("./csv/sorted_worksheet.csv", str);
});


let addItem = item => {
 if(!Object.keys(result).find(i => i == item.Date)) {
     result[item.Date] = {}
 }
 if(!Object.keys(result[item.Date]).find(i => i == item["Employee Name"])) {
    result[item.Date][item["Employee Name"]] = item["Work Hours"]
 }
 if (!names.find(n => n == item["Employee Name"])) {
     names.push(item["Employee Name"])
 }
}


console.log("Done file");