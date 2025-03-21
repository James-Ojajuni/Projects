for (var i=0; i <= document.querySelectorAll('button').length-1; i++) {
    //Remove all characters if "Clear" is clicked
    if (document.querySelectorAll("button")[i].textContent ==="C") {
        document.querySelectorAll("button")[i].addEventListener("click", 
        () => document.querySelector('#output').textContent = ""); 
    }

    else if (document.querySelectorAll("button")[i].textContent ==="x") {
        document.querySelectorAll("button")[i].addEventListener("click", 
        () => document.querySelector('#output').textContent = ""); 
    }
    //Remove the last character "X" is clicked
    else if (document.querySelectorAll("button")[i].textContent ==="DEL") {
        document.querySelectorAll("button")[i].addEventListener("click", 
        () => document.querySelector('#output').textContent = 
        document.querySelector('#output').textContent.
        slice(0,document.querySelector('#output').textContent.length-1) ); 
    }
    //Evaluate already displayed expression if "=" is clicked
    else if (document.querySelectorAll("button")[i].textContent === "=") {
        document.querySelectorAll("button")[i].addEventListener
         ('click', 
        () => {
        let expression = document.querySelector('#output').textContent;
        try {
            let result = new Function('return ' + expression)(); // Safe evaluation of expression
            document.querySelector('#output').textContent = result;
        } catch (error) {
            document.querySelector('#output').textContent = "Error";      
            console.error(error.message);      
        }
    }); 
    }
    //Divide the output by 100 if "%" is clicked
    else if (document.querySelectorAll("button")[i].textContent === "%") {
        document.querySelectorAll("button")[i].addEventListener
        ('click', 
       () => {
        let expression = document.querySelector('#output').textContent;
        try {
        let result = new Function('return ' + expression/100)();
        document.querySelector('#output').textContent = result;
        } catch (error) {
            document.querySelector('#output').textContent = "Error";
            console.error(error.message);            
        }
       })
    }
    //Display the content in the output if it does not meet the previous conditions
    else { document.querySelectorAll("button")[i].addEventListener("click", myFunction); }
    }
    //Function to display the content in the output 
    function myFunction () {
        const button = this;
        var inputValue = document.querySelector('#output');
        inputValue.textContent += button.textContent;
    }