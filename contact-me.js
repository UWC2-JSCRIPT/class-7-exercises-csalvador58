// TODO
// Check that DOM content had all loaded before running code
document.addEventListener('DOMContentLoaded', function() {

    const fullName = document.getElementById('name');
    const email = document.getElementById('email');
    const form = document.getElementById('contact-me');

    // Used 'blur' to run function once a user leaves an input field. The useCapture argument was set to true to allow capture of all 'blur' events
    document.addEventListener('blur', function(e) {

        // Check if form element includes partial id name 'name', then run isNameInvalid function
        if(e.target.id == 'name') isNameInvalid(e.target, e.target.value);

        // Check if form id element is 'email', then run isNameInvalid function
        if(e.target.id == 'email') isEmailInvalid(e.target, e.target.value);

        // form.reportValidity();
    }, true);


    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
        
    //     // Run all invalid checks
    //     isNameInvalid(firstName, firstName.value);
    //     isNameInvalid(lastName,lastName.value);
    //     isEmailInvalid(email, email.value);

    //     // If name and email fields are valid, continue with submit
    //     if (! (firstName.validity.customError && lastName.validity.customError && email.validity.customError)) {
    //         form.submit();
    //     }
    // });


    // If email does not match requirement, custom validity error is set and invalid class is added until user corrects input 
    function isEmailInvalid (e, email) {
        const regex = /\w+@\w+\.\w+/gi;
        if(!regex.test(email)) {
            e.classList.add('invalid'); 
            e.setCustomValidity('Email is invalid');
        } else {
            e.classList.remove('invalid'); 
            e.setCustomValidity('');
        }  
    }

    // If first or last name does not match requirement, custom validity error is set and invalid class is added until user corrects input 
    function isNameInvalid (e, name) {
        if(name.length < 3) {
            e.classList.add('invalid'); 
            e.setCustomValidity('Name must be at least 3 characters');
            
        } else {
            e.classList.remove('invalid'); 
            e.setCustomValidity('');
        }
    }

});