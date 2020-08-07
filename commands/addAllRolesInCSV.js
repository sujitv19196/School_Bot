//a one time run command to add server roles based off of csv file 

module.exports = {
    name: "addAllRolesInCSV",
    description: "a one time run command to add server roles based off of csv file ",
    
    execute(message, args) {
        var classes = ["test"];   //array of strings with class names 
        //parse csv in to classes array     TODO:!!!!BROKEN!!!!!
        // var fs = require('fs');  
        // var Papa = require('papaparse');

        // var file = fs.createReadStream('./csv/classes.csv');

        // Papa.parse(file, {
        //     header: false,
        //     delimiter: ",",
        //     complete: function(results) {
        //         //console.log("Finished:", results.data);
        //     classes = results.data;
        //     }
        // });

        //add classes as roles to server and make corresponding channels 
        for (var cls of classes) { 
            if (!message.guild.roles.cache.array().some(c => c === cls)) {  //if class doesnt already exist on server
                message.guild.roles.create({    
                    data: {
                        name: cls,
                    },
                });
                message.guild.channels.create(cls, {
                    type: "text"
                    //TODO: ADD PERMS 
                }); 
            }
        }
        // console.log("Successfully Added Roles")
    }
}