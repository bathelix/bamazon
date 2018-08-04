
var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 8889,
  
    user: "root",

    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    selectAll();
  });
  
  function selectAll() {
    console.log("Welcome to bAmazon\n");
    var query = connection.query(
      "SELECT * FROM PRODUCTS",
     
      function(err, res) {
        console.log(res);
        var inventory = res;
        askID(inventory);
      }
    )};

    function askID(inv) {
        
        inquirer.prompt([

            {
              type: "input",
              name: "productID",
              message: "What is the product ID you would want to buy???"
            },
            {
                type: "input",
                name: "quantity",
                message: "How many units do you want???"
              },
        
            ]).then(function(userresponse) {
                console.log ("userresponse", userresponse)
                for(var i = 0; i< inv.length;i++){
                console.log(inv[i].item_id)
                if(inv[i].item_id === userresponse.productID){
                    console.log("quatuity avail: ", inv[i].stock_quantity)
                    if(parseInt(inv[i].stock_quantity) > parseInt(userresponse.quantity)){
                        console.log("WE HAVE ENOUGH")
                        // UPDATE PRODUCTS TABLE
                        cost(parseInt(userresponse.quantity),parseInt(inv[i].price))
                       
                        connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",[userresponse.quantity, userresponse.productID])
                        
                    }else{
                        console.log("NOT ENOUGH AVAILABLE, SORRY")
                    }
                }

                }
                checkInventory(inv);
            }

            )}

            function cost(qty,price){
                
                var total = qty * price;
                console.log("YOUR TOTAL COST IS: ","$" +total)

            }

            function checkInventory(invCheck){
               // if inventory.item_id <1 console.log("we have that in stock")

            }


       



