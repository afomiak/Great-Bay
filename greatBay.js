var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    password:"",
    database:"great_baydb"
})
connection.connect(function(err){
    if (err)
    throw err
    beginPrompt();
})

var beginPrompt = function(){
    inquirer.prompt([
        {
            type: "list",
            name:"action",
            message:"Would you like to bid or post an item?",
            choices: ["Post an item", "Bid an item"]
        }
    ]).then(function(answers){
//based on answers, do function postItem or bidItem
if (answers.choice = "Post an item")
    {
    postItem();
    }
else
{
    bidItem();
}
    })
}

var postItem = function(){
    inquirer.prompt([
        {
            type:"input",
            name:"itemName",
            message:"What would you like to post?",
        },
        {
            type:"input",
            name:"itemDescription",
            message:"Describe your item please"
        },
        {
            type:"input",
            name:"bidStart",
            message:"What is the starting bid?"
        }
    ]).then(function(response){
        //push new item onto array
        var items = [];
        items.push(response.itemName);
        items.push(response.itemDescription);
        items.push(response.bidStart);
        POST();
    })
}

var POST = function(values){
    connection.query("Insert into items",
    {
        item:values[0],
        description: values[1],
        bidStart: values[2],
    }, function(err){
        if (err) throw err
        console.log("You posted: "+values[0] + "for $"+ values[2]);
        beginPrompt();
    })
}