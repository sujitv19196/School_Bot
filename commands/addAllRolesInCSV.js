//a one time run command to add server roles based off of csv file 
const TEXT_CHANNEL_CATEGORY_ID = "741069302769123409"
const VOICE_CHANNEL_CATEGORY_ID = "741069302769123410"

module.exports = {
    name: "addAllRolesInCSV",
    description: "a one time run command to add server roles based off of csv file ",
    
    execute(message, args) {
        var classes = ['cs100', 'cs101', 'cs105', 'cs107', 'cs125', 'cs126', 'cs173', 'cs196', 'cs199', 'cs210', 'cs225', 'cs233', 'cs240', 'cs241', 'cs242', 'cs265', 'cs296', 'cs357', 'cs361', 'cs374', 'cs397', 'cs410', 'cs411', 'cs412', 'cs413', 'cs418', 'cs421', 'cs424', 'cs425', 'cs426', 'cs427', 'cs433', 'cs438', 'cs439', 'cs440', 'cs445', 'cs446', 'cs447', 'cs450', 'cs461', 'cs465', 'cs466', 'cs473', 'cs481', 'cs483', 'cs491', 'cs492', 'cs497', 'cs498', 'cs499', 'cs519', 'cs523', 'cs524', 'cs527', 'cs549', 'cs556', 'cs563', 'cs572', 'cs581', 'cs591', 'cs597', 'cs598'];   //array of strings with class names, HARD CODED FOR NOW 
        
        //TODO Parse CSV file for class list 

        //add classes as roles to server and make corresponding channels 
        //assumes each class has a coresponding role, could add cases later?
        for (var cls of classes) { 
            if (!message.guild.channels.cache.array().some(c => c.name == cls)) {  //if class doesnt already exist on server
                var rolePromise = message.guild.roles.create({    
                    data: {
                        name: cls,
                        mentionable: true,
                    },
                });
                
                rolePromise.then(function(v) {  //resolve promise
                    var clsRole = v;
                    var everyoneRole = message.guild.roles.everyone
                    message.guild.channels.create(cls, {    //create text channel for class and tie it to the newly created role
                        type: "text",
                        name: clsRole.name,
                        parent: TEXT_CHANNEL_CATEGORY_ID,    //hard coded category id defined aboce
                        permissionOverwrites: [
                            {
                                id: clsRole.id,
                                allow: ['VIEW_CHANNEL'],

                            },
                            {
                                id: everyoneRole.id,
                                deny: ['VIEW_CHANNEL'],
                            }
                        ]
                    }); 
                    message.guild.channels.create(cls, {    //create voice channel for class and tie it to the newly created role
                        type: "voice",
                        name: clsRole.name,
                        parent: VOICE_CHANNEL_CATEGORY_ID,    //hard coded category id defined above
                        permissionOverwrites: [
                            {
                                id: clsRole.id,
                                allow: ['VIEW_CHANNEL'],

                            },
                            {
                                id: everyoneRole.id,
                                deny: ['VIEW_CHANNEL'],
                            }
                        ]
                    }); 
                });
            }
        }
        console.log("Successfully Added Roles")
    }
}