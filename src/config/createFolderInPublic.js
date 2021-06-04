const path = require('path')
const fs = require("fs")

exports.createFolderInPublic = async()=>{    
    try {
        if (fs.existsSync(`${__dirname}/../../public`)) {
            console.log(`Directory exists=> Public`)
        }else {
            console.log("Directory does not exist.")
            fs.mkdirSync(`${__dirname}/../../public`);
        }
        let allDirectory = ["Post"]
        allDirectory.forEach((dirName)=>{
            if (fs.existsSync(`${__dirname}/../../public/${dirName}`)) {
                console.log(`Directory exists=>${dirName}`)
            } else {
                console.log("Directory does not exist.")
                fs.mkdirSync(`${__dirname}/../../public/${dirName}`);
            }
        })
    } catch(e) {
        console.log("An error occurred.")
    }
}

this.createFolderInPublic()