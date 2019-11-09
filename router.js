var HomeController    = require('./Controllers/HomeController');
var ProductController = require('./Controllers/ProductController');
var OrderController = require('./Controllers/OrderController');
const cors = require('cors');

// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      HomeController.Index);    
    app.get('/Product/Index', cors(), ProductController.Index);
    app.get('/Order/Index', cors(), OrderController.Index);
    app.get('/Product/Detail', cors(), ProductController.Detail);
    app.get('/Product/Create', ProductController.Create);

    app.post('/Product/CreateProduct', cors(), ProductController.CreateProduct);
    app.post('/Order/CreateOrder', cors(), OrderController.CreateOrder);

    app.get('/Product/Edit', ProductController.Edit);
    app.put('/Product/Update', cors(), ProductController.Update);    // put is for update.
    app.delete('/Product/Delete', cors(), ProductController.Delete);
    app.delete('/Order/Delete', cors(), OrderController.Delete);
};

