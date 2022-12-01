// TODO

// Check that DOM content had all loaded before running code
document.addEventListener('DOMContentLoaded', function() {

    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const form = document.getElementById("form");


    // Used 'blur' to run function once a user leaves an input field. The useCapture argument was set to true to allow capture of all 'blur' events
    document.addEventListener('blur', function(e) {

    // Check if form element includes partial class name 'name', then run checkNameError function
    if(e.target.id.slice(-4) == 'name') checkNameError(e, e.target.value);

    // Check if form element includes partial class name 'name', then run checkNameError function
    if(e.target.id == 'email') checkEmailError(e, e.target.value);

    }, true);


    // If email does not match requirement, setCustomValidity method used to report error and require user to correct input
    function checkEmailError (e, email) {
        const regex = /^\w+[@]\w+[.]\w+/gi;
        regex.test(email) ? e.target.setCustomValidity('') : e.target.setCustomValidity('Email is invalid');

        e.target.reportValidity();
    }

    // If first or last name does not match requirement, setCustomValidity method used to report error and require user to correct input
    function checkNameError (e, name) {
        name.length > 1 ? e.target.setCustomValidity('') : e.target.setCustomValidity('Name must be more than 1 character');

        e.target.reportValidity();
    }

});