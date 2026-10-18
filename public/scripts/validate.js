const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const pattern = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
const error = document.getElementById("error");
document.getElementById("registrationForm").addEventListener("submit",function(event){

    if(password.value !== confirmPassword.value){
        error.style.color = 'red';
        error.innerHTML = "<p>passwords do not match";
        console.log("passwords do not match");
        event.preventDefault();
    }  
    else{
        if(!pattern.test(password.value)){
            event.preventDefault();
            error.style.color = 'red';
            error.innerHTML = `<p>password Requirments</p>
            <ul>
                        <li>At least 8 characters long</li>
                        <li>At least one Uppercase letter (A-Z)</li>
                        <li>At least one special character(like !, @, #, $, %)</li>
            </ul>`;

        }
        error.style.display("none");
    }
    
});