import { Component, Input } from '@angular/core';

@Component({
  selector: 'child',
  template: `
  <form #myForm="ngForm">

  first name
     <input type="text" pattern="[a-zA-Z-' ]*" minlength="3" required 
    [(ngModel)]="_firstName" name="firstName" #myFirstName="ngModel" >
    <p class="alert alert-danger" *ngIf="myFirstName?.errors?.required && myForm.submitted">This field is required.</p>
    <p class="alert alert-danger" *ngIf="myFirstName?.errors?.pattern && myForm.submitted"> Only alphabetical characters are allowed.</p>
    <p class="alert alert-danger" *ngIf="myFirstName?.errors?.minlength && myForm.submitted">This entry must have at least three characters.</p> 
    <br>  



    last name:
    <input type="text" pattern="[a-zA-Z-' ]*" minlength="2" required 
    [(ngModel)]="_lastName" name="lastName" #myLastName="ngModel" >
    <p class="alert alert-danger" *ngIf="myLastName?.errors?.required && myForm.submitted">This field is required.</p>
    <p class="alert alert-danger" *ngIf="myLastName?.errors?.pattern && myForm.submitted">Only alphabetical characters are allowed.</p>
    <p class="alert alert-danger" *ngIf="myLastName?.errors?.minlength && myForm.submitted">This entry must have at least two characters.</p> 

        <br>

Street Address:
    <input type="text" pattern="[a-zA-Z1-9]*" minlength="2" required
     [(ngModel)]="_address" name="address" #streetAddress="ngModel">
    <p class="alert alert-danger" *ngIf="streetAddress?.errors?.required && myForm.submitted">This field is required.</p>
    <p class="alert alert-danger" *ngIf="streetAddress?.errors?.minlength && myForm.submitted">This entry must have at least two characters.</p>
    <br>




        
<button type="submit" class="btn btn-default" 
 (click)="submitInput()">Submit Address</button>
        </form>
  `
})
export class ChildComponent {
    _firstName:string;
    _lastName:string;
    _address: string;
    
    @Input()
    detail: string;

    @Input()  // Reference to parent function. Ref provided by parent.
    callParent: Function;

    submitInput() {
        this.callParent(this._address, this._firstName, this._lastName);
    }
}
