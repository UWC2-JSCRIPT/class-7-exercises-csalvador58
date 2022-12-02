// TODO
// Check that DOM content had all loaded before running code
document.addEventListener('DOMContentLoaded', function() {

    const fullName = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const form = document.getElementById('contact-me');

    // Added a 'blur' listener to detect when a user leaves an input field. The useCapture argument was set to true to allow capture of all 'blur' events
    document.addEventListener('blur', function(e) {

        // Check element's ID then run invalid function
        if(e.target.id == 'name') isNameInvalid(e.target, e.target.value);
        if(e.target.id == 'email') isEmailInvalid(e.target, e.target.value);
        if(e.target.id == 'message') isMessageInvalid(e.target, e.target.value);

        // form.reportValidity();
    }, true);

    // Added a 'change' listener event to run function when dropdown selection is changed
    document.addEventListener('change', function(e) {
        if(e.target.id == 'contact-reason') isReasonInvalid(e.target, e.target.value);
    }, true);

     
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Run all invalid checks
        isNameInvalid(fullName, fullName.value);
        isEmailInvalid(email, email.value);
        isMessageInvalid(message, message.value);

        // If name and email fields are valid, continue with submit
        if (! (fullName.validity.customError && email.validity.customError && message.validity.customError)) {
            form.submit();
        }
    });

    // Function will hide/display additional info based on option selected in dropdown menu
    function displayAdditionalInfo (info) {
        const job = document.querySelector('.additional-info-job');
        const talk = document.querySelector('.additional-info-talk');
        
        if(info == 'job') {
            job.style.display = 'block';
            talk.style.display = 'none';
        }
            
        if(info == 'talk') {
            job.style.display = 'none';
            talk.style.display = 'block';
        }

        if(info == '') {
            job.style.display = 'none';
            talk.style.display = 'none';
        }
    }

    // Following functions checks form requirements. If form field is invalid, the custom validity error is set and invalid class is added until user corrects input
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

    function isMessageInvalid (e, msg) {
        if(msg.length < 10) {
            e.classList.add('invalid'); 
            e.setCustomValidity('Message must be at least 10 characters');
            
        } else {
            e.classList.remove('invalid'); 
            e.setCustomValidity('');
        }
    }

    function isNameInvalid (e, name) {
        if(name.length < 3) {
            e.classList.add('invalid'); 
            e.setCustomValidity('Name must be at least 3 characters');
            
        } else {
            e.classList.remove('invalid'); 
            e.setCustomValidity('');
        }
    }

    function isReasonInvalid (e, reason) {

        console.log(e)
        if(!reason) {
            e.classList.add('invalid'); 
            e.setCustomValidity('Please select and option');
            
        } else {
            e.classList.remove('invalid'); 
            e.setCustomValidity('');
        }
        displayAdditionalInfo(reason);
    }

});