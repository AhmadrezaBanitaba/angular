const OrderRepo   = require('../Data/OrderRepo');
const _orderRepo  = new OrderRepo();
const Order       = require('../Models/Order');


// This is the default page for domain.com/order/index.
// It shows a listing of orders if any exist.
exports.Index = async function(request, response){
    let orders = await _orderRepo.allOrders();
    if(orders!= null) {
        // response.render('Order/Index', { orders:orders })
        response.json({orders:orders});
    }
    else {
        // response.render('Order/Index', { orders:[] })
        response.json({orders:[]});
    }
};


// Receives POST data and tries to save it.
exports.CreateOrder = async function(request, response) {

    // Package object up nicely using content from 'body'
    // of the POST request.
    let tempOrderObj  = new Order( {
        "firstName":request.body.firstName,
        "lastName":    request.body.lastName,
        "address": request.body.address,
        "total": request.body.total
    });

    // Call Repo to save 'Order' object.
    let responseObject = await _orderRepo.create(tempOrderObj);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        // response.render('Order/Detail', { order:responseObject.obj, 
        //                                     errorMessage:""});
        response.json({ order:responseObject.obj, errorMessage:""});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Item not created.");
        /*
        response.render('Order/Create', {
                        Order:responseObject.obj,
                        errorMessage:responseObject.errorMessage}); */
        response.json({ order:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }
};



// This function receives an id when it is posted. 
// It then performs the delete and shows the order listing after.
// A nicer (future) version could take you to a page to confirm the deletion first.
exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let firstName           = request.body.firstName;
    let lastName            = request.body.lastName;
    let address = request.body.address;
    let total = request.body.total;
    let deletedItem  = await _orderRepo.delete(id);


    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
    let orders     = await _orderRepo.allOrders();
    // response.render('Order/Index', {orders:orders});
   // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    response.json({orders:orders});
}



