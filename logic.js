var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("great_bay");

// creat fuction 
var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"Natu123@",
	database:"great_bay"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});
// put a selection so when a customer select there is the bid item
var BidonItem = function(){
	var query = "Select * FROM biditem";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
            head: ["name", "description", "price"],
			colWidths: [10,25,25,10,15]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].name,res[i].description, res[i].price]
				);
		}
		console.log(displayTable.toString());
		BidonItem();
	});
}

function bidPrompt(){
    //loop through each inquirer promt
    // since we have id for each order item we set it into a variable
	inquirer.bidprompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter Item ID you like to Bid on.",
		filter:Number
    }

 ]).then(function(answers){
 	var quantitybid = answers.Quantity;
 	var IDrequested = answers.ID;
 	bidPrompt(IDrequested, quantitybid);
 });
};

function bidPrompt(ID, amountbided){
	connection.query('Select * FROM bid WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(amountbided <= res[0].bid_quantity){
		
			var totalCost = res[0].price * amountbided;
			console.log("Good news you bid on an item!");
			console.log("Your total cost for " + amountbided + " " +res[0].bidPrompt + " is " + totalCost + " Thank you!");

			let query = "UPDATE bidPrompt SET stock_quantity = stock_quantity - " + amountbided + " WHERE bid item_id = " + ID;
			connection.query(query);
		} else{
			console.log("sorry we do not have the item you bid on " + res[0].bidPrompt + " to bid on your item.");
		};
		displaybiditem();
	});
};

bidonItem(); 