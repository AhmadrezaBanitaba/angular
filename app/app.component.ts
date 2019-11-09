import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

const BASE_URL = "http://localhost:1337/Product/";
const BASE_URL_ORDER = "http://localhost:1337/Order/";

// This component consumes the re-usable service.
@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html'
})
export class AppComponent {
  parentFuncRef: Function;
  operations:    Array<any>;
  dataFromChild: string;

  items:Array<any>
  temp_array:Array<any>
  _productsArray: Array<any>;
  _ordersArray: Array<any>;
  _http:HttpClient;
  _id:Number;
  _productName:String;
  _price: Number;
  _productPrice:Number;
_firstName: String;
_lastName: String;
_address: String;
_total: 0;
  quantity:number;
  subtotal:number;
  _errorMessage:String = "";
  form: FormGroup;
  selectedOption: string;
  // This function is called by the Angular framework after
  // the constructor executes.
  public ngOnInit() { 
    this.parentFuncRef = this.myCallBackFunction.bind(this);
  }

  // This function can be called by child.
  public myCallBackFunction(_address, _firstName,_lastName ) {
    this.dataFromChild = 
    _firstName + " " + _lastName  + " " + "at" + " " + _address
  }


  // Since we are using a provider above we can receive 
  // an instance through a constructor.
  constructor(private http: HttpClient) {
      this._http = http;
      this.getAllProducts();
      this.getAllOrders();
      this.items = [];
      this.temp_array=[];
      this.getTotal();
   
  }

add_to_temp(){
  var info = this._productName.split(' ')
  var productName = info[0]
  for(var i=1; i<info.length-1;i++){
    productName += " " + info[i]
  }
  var productPrice = parseFloat(info[info.length-1])
  this.temp_array.push({productName:productName, quantity:this.quantity, productPrice:productPrice});
  
  
  
}



remove_from_temp(item) {
  this.temp_array.splice(this.temp_array.indexOf(item), 1);

}


getTotal(){
  var _total = 0;
  for(var i = 0; i < this.temp_array.length; i++){
      var product =this.temp_array[i];
      _total += (product.productPrice * product.quantity);
      
  }
  return _total;
}





getAllOrders() {
  let url = BASE_URL_ORDER + 'Index'
  this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
          this._ordersArray = result.orders;
          console.log(this._ordersArray);
      }, 

      error =>{
        // Let user know about the error.
          this._errorMessage = error;
      })
}


  getAllProducts() {
    let url = BASE_URL + 'Index'
    this._http.get<any>(url)
        // Get data and wait for result.
        .subscribe(result => {
            this._productsArray = result.products;
        }, 

        error =>{
          // Let user know about the error.
            this._errorMessage = error;
        })
  }

createOrder(){
         // This free online service receives post submissions.
         this.http.post(BASE_URL_ORDER + "CreateOrder",
         {
             firstName:  this._firstName,
             lastName:   this._lastName,
             address: this._address,
             total: this._total
         })
     .subscribe(
         // Data is received from the post request.
         (data) => {
             // Inspect the data to know how to parse it.
             console.log("POST call successful. Inspect response.", 
                         JSON.stringify(data));
             this._errorMessage = data["errorMessage"];
             this.getAllOrders();
               
         },
         // An error occurred. Data is not received. 
         error => {
             this._errorMessage = error;                
         });
        

    }



  createProduct() {
      // This free online service receives post submissions.
      this.http.post(BASE_URL + "CreateProduct",
          {
              _id:  this._id,
              productName:   this._productName, 
              price: this._price
          })
      .subscribe(
          // Data is received from the post request.
          (data) => {
              // Inspect the data to know how to parse it.
              console.log("POST call successful. Inspect response.", 
                          JSON.stringify(data));
              this._errorMessage = data["errorMessage"];
              this.getAllProducts();
                
          },
          // An error occurred. Data is not received. 
          error => {
              this._errorMessage = error;                
          });
  }



  deleteOrder(_id) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
      "body": { _id:_id}
    };
  
    let url = BASE_URL_ORDER + "Delete"
    this.http.delete(  url , httpOptions) 
    .subscribe(
        // Data is received from the post request.
        (data) => {
            this._errorMessage = data["errorMessage"];
            this.getAllOrders(); 
        },
        // An error occurred. Data is not received. 
        error  => {
          this._errorMessage = error; 
        });
  }


 
}

