//TODO: 78/100 + 2 error
//TODO: use exponent form for numbers that are too large to display

//Use alias for $(document).ready(function() { ... });
$(function(){

  var number = "";
  var expression = new Array();
  var evaluated_flag = false;//becomes true when user presses the "=" button
  var erase_flag = false;//controls whether digits get concatenated to the calc's display number

  //User clicked on a number
  $( "#number_0" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag || number == ""){
      number = "0";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "0";
    }
    displayValue();
  });

  $( "#number_1" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag){
      number = "1";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "1";
    }
    displayValue()
  });

  $( "#number_2" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag){
      number = "2";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "2";
    }
    displayValue()
  });

  $( "#number_3" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag){
      number = "3";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "3";
    }
    displayValue()
  });

  $( "#number_4" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag){
      number = "4";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "4";
    }
    displayValue()
  });

  $( "#number_5" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag){
      number = "5";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "5";
    }
    displayValue()
  });

  $( "#number_6" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag){
      number = "6";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "6";
    }
    displayValue()
  });

  $( "#number_7" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag){
      number = "7";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "7";
    }
    displayValue()
  });

  $( "#number_8" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag){
      number = "8";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "8";
    }
    displayValue()
  });

  $( "#number_9" ).click(function() {
    if(number == "0" || erase_flag || evaluated_flag){
      number = "9";
      evaluated_flag = false;
      erase_flag = false;
    }else{
      number += "9";
    }
    displayValue()
  });

  //User clicked on an operator
  //push number and operator in order depending on if stack is empty or not
  $( "#operator_add" ).click(function() {
    if(expression.length % 2 == 0){
      expression.push(number);
      expression.push("add");
    }else{
      expression.push("add");
      expression.push(number);
    }
    erase_flag = true;
    console.log("the expression is: " + expression);
    //clear_display();
  });

  $( "#operator_subtract" ).click(function() {
    if(expression.length % 2 == 0){
      expression.push(number);
      expression.push("subtract");
    }else{
      expression.push("subtract");
      expression.push(number);
    }
    erase_flag = true;
    console.log("the expression is: " + expression);
    //clear_display();
  });

  $( "#operator_multiply" ).click(function() {
    if(expression.length % 2 == 0){
      expression.push(number);
      expression.push("multiply");
    }else{
      expression.push("multiply");
      expression.push(number);
    }
    erase_flag = true;
    console.log("the expression is: " + expression);
    //clear_display();
  });

  $( "#operator_divide" ).click(function() {
    if(expression.length % 2 == 0){
      expression.push(number);
      expression.push("divide");
    }else{
      expression.push("divide");
      expression.push(number);
    }
    erase_flag = true;
    console.log("the expression is: " + expression);
    //clear_display();
  });

  $( "#operator_equals" ).click(function() {

    if(expression.length % 2 == 0){
      expression.push(number);
      console.log("expression before eval: " + expression);
    }
    var answer = evaluate();
    number = answer;
    console.log("expression: " + expression + ", number: "+ number);
    displayValue();
    evaluated_flag = true;
  });

  //Additional buttons
  $( "#clear" ).click(function() {
    number = 0;
    expression = new Array();
    displayValue();
  });

  $( "#point" ).click(function() {
    number += ".";
    displayValue();
  });

  $( "#negate" ).click(function() {
    number *= -1;
    erase_flag = true;
    displayValue();
  });

  $( "#percentage" ).click(function() {
    number /= 100.0;
    erase_flag = true;
    displayValue();
  });

  function evaluate(){
    var temp_stack = new Array();
    var temp_result;

    /*Following BEDMAS rules, pop stack and evaluate multiplication/division expressions
      immediately.
      Reinsert products and quotients into stack along with addition/subtractions
      expressions to be evaluated afterwards
    */
    while(expression.length >= 1){
      //the first element in the stack should always be a number
      var b = expression.pop();
      //var operator = expression.pop();
      //var a = Number(expression.pop());

      if(b == 'divide'){
        var a = Number(expression.pop());
        var c = Number(temp_stack.pop());

        temp_result = divide(a,c);
        temp_stack.push(temp_result);
      }else if(b == 'multiply'){
        var a = Number(expression.pop());
        var c = temp_stack.pop();
        temp_result = multiply(a,c);
        temp_stack.push(temp_result);
      }else{
        //no operation required
        temp_stack.push(b);
      }
    }

    console.log("temp_stack: " + temp_stack);
    //main stack is empty and all divisions/multiplications from BEDMAS has been taken care of
    //proceed with additions and subtractions
    if(temp_stack.length > 1){
      var a = Number(temp_stack.pop());
      while(temp_stack.length > 1){
        var b = temp_stack.pop();
        if(b == 'add'){
          var c = Number(temp_stack.pop());
          a = add(a,c);
          console.log("a: "+a);
          temp_stack.push(a);
        }else if(b == 'subtract'){
          var c = Number(temp_stack.pop());
          a = subtract(a,c);
          temp_stack.push(a);
        }
      }
    }

    var final_result = temp_stack[0];
    if(isNaN(final_result)){
      final_result = "Not a Number";
    }
    console.log("final result: " + final_result);
    return final_result;
  }

  function clear_display(){
    number = 0;
    displayValue();
  }

  function displayValue(){
    $('#output').html(number);
  }

  function add(a,b){
    return a+b;
  }

  function subtract(a,b){
    return a-b;
  }

  function multiply(a,b){
    return a*b;
  }

  function divide(a,b){
    return a/b;
  }

});
