const Product = require('../Models/Product');

class ProductRepo {
    
    // This is the constructor.
    ProductRepo() {        
    }

    // Gets all products.
    async allProducts() {     
        let products = await Product.find().exec();
        return   products;
    }

    async getProduct(id) {  
        let product = await Product.findOne({_id:id}).exec();
        return   product;
    }

    async create(productObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await productObj.validateSync();
    
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          productObj,
                    errorMessage: error.message };
    
                return response; // Exit if the model is invalid.
            } 
    
            // Model is not invalid so save it.
            const result = await productObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          productObj,
                errorMessage: err.message };
    
            return  response;
        }    
    } 
    

    
    async delete(id) {
        console.log("Id to be deleted is: " + id);
        let deletedItem =  await Product.find({_id:id}).remove().exec();
        console.log(deletedItem);
        return deletedItem;
    }
    
}


module.exports = ProductRepo;
