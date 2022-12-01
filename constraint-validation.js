// TODO

// Check that DOM content had all loaded before running code
document.addEventListener('DOMContentLoaded', function() {

    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const form = document.getElementById('connect-form');

    // Used 'blur' to run function once a user leaves an input field. The useCapture argument was set to true to allow capture of all 'blur' events
    document.addEventListener('blur', function(e) {

        console.log(e.target)

        // Check if form element includes partial id name 'name', then run checkNameError function
        if(e.target.id.slice(-4) == 'name') checkNameError(e, e.target.value);

        // Check if form id element is 'email', then run checkNameError function
        if(e.target.id == 'email') checkEmailError(e, e.target.value);

        // form.reportValidity();
    }, true);


    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // console.log(e.target.validity.valid);
        console.log(firstName)
        checkNameError(firstName, firstName.value);
        checkNameError(lastName,lastName.value);
        checkEmailError(email, email.value);
    });


    // If email does not match requirement, custom validity error is set and invalid class is added until user corrects input 
    function checkEmailError (e, email) {
        const regex = /\w+@\w+\.\w+/gi;
        if(!regex.test(email)) {
            e.setCustomValidity('Email is invalid');
            e.classList.add('invalid'); 
        } else {
            e.setCustomValidity('');
            e.classList.remove('invalid'); 
        }  
    }

    // If first or last name does not match requirement, custom validity error is set and invalid class is added until user corrects input 
    function checkNameError (e, name) {
        console.log(e)
        if(name.length < 3) {
            e.setCustomValidity('Name must be at least 3 characters');
            e.classList.add('invalid'); 
        } else {
            e.setCustomValidity('');
            e.classList.remove('invalid'); 
        }
    }

});