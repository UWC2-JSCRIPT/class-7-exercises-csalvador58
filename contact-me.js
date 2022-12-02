// Check that DOM content had all loaded before running code
document.addEventListener('DOMContentLoaded', function() {

    const fullName = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const title = document.getElementById('title');
    const company = document.getElementById('company');
    const codeLang = document.getElementById('language');
    const contactReason = document.getElementById('contact-reason');
    const form = document.getElementById('contact-me');

    // Added a 'blur' listener to detect when a user leaves an input field. The useCapture argument was set to true to allow capture of all 'blur' events
    document.addEventListener('blur', function(e) {

        // Check element's ID then run invalid function
        if(e.target.id == 'name') isNameInvalid(e.target, e.target.value);
        if(e.target.id == 'email') isEmailInvalid(e.target, e.target.value);
        if(e.target.id == 'message') isMessageInvalid(e.target, e.target.value);

        // {EXTRA CREDIT}
        if(e.target.id == 'title') isTitleInvalid(e.target, e.target.value);
        if(e.target.id == 'company') isCompanyInvalid(e.target, e.target.value);
    }, true);

    // Added a 'change' listener event to run function when dropdown selection is changed
    document.addEventListener('change', function(e) {
        if(e.target.id == 'contact-reason') isReasonInvalid(e.target, e.target.value);

        // {EXTRA CREDIT}
        if(e.target.id == 'language') isLanguageInvalid(e.target, e.target.value);
    }, true);

     
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Run all invalid checks
        isNameInvalid(fullName, fullName.value);
        isEmailInvalid(email, email.value);
        isMessageInvalid(message, message.value);

        if (contactReason.value == 'job') {
            isTitleInvalid(title, title.value);
            isCompanyInvalid(company, company.value);
            form.reportValidity();

            if (! (fullName.validity.customError + email.validity.customError + message.validity.customError + title.validity.customError + company.validity.customError) > 0) {
                form.submit();
            }
        } else if (contactReason.value == 'talk') {
            isLanguageInvalid(codeLang, codeLang.value);
            form.reportValidity();

            if (! (fullName.validity.customError + email.validity.customError + message.validity.customError + codeLang.validity.customError) > 0) {
                form.submit();
            }
        } else {
            // If name and email fields are valid, continue with submit
            form.reportValidity();
            if (! (fullName.validity.customError + email.validity.customError + message.validity.customError) > 0) {
                form.submit();
            }
        }
    });

    // Function will hide/display additional info based on option selected in dropdown menu
    function displayAdditionalInfo (info) {
        console.log("log: " + info)

        if(info == 'job') {
            // Reset options
            codeLang.value = "";
            isLanguageInvalid(codeLang, true);
            isReasonInvalid (contactReason, true);
            document.querySelector('.additional-info-talk').style.display = 'none';

            // Show Talk options
            document.querySelector('.additional-info-job').style.display = 'block';
        }
            
        if(info == 'talk') {
            // Reset options
            title.value = "";
            company.value = "";
            isTitleInvalid(title, true);
            isCompanyInvalid(company, 'https://wwww.123.com');
            isReasonInvalid (contactReason, true);
            document.querySelector('.additional-info-job').style.display = 'none';

            // Show Talk options
            document.querySelector('.additional-info-talk').style.display = 'block';
        }

        if(info == "") {
            // Reset to default values
            codeLang.value = "";
            title.value = "";
            company.value = "";
            isLanguageInvalid(codeLang, true);
            isTitleInvalid(title, true);
            isCompanyInvalid(company, 'https://wwww.123.com');
            isReasonInvalid (contactReason, true);
            document.querySelector('.additional-info-job').style.display = 'none';
            document.querySelector('.additional-info-talk').style.display = 'none';
        }
    }

    // Following functions checks form requirements. If form field is invalid, the custom validity error is set and invalid class is added until user corrects input
    function isCompanyInvalid (e, company) {
        const regex = /https?\:\/\/.+\..+/gi;
        if(!regex.test(company)) {
            e.classList.add('invalid'); 
            e.setCustomValidity('URL is invalid');
        } else {
            e.classList.remove('invalid'); 
            e.setCustomValidity('');
        }
    }

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

    function isLanguageInvalid (e, code) {
        if(!code) {
            e.classList.add('invalid'); 
            e.setCustomValidity('Please select an option');
            
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
        if(!reason) {
            e.classList.add('invalid'); 
            e.setCustomValidity('Please select and option');
            
        } else {
            e.classList.remove('invalid'); 
            e.setCustomValidity('');
        }
        displayAdditionalInfo(reason);
    }

    function isTitleInvalid (e, title) {
        if(title.length < 1) {
            e.classList.add('invalid'); 
            e.setCustomValidity('Text field must not be empty');
            
        } else {
            e.classList.remove('invalid'); 
            e.setCustomValidity('');
        }
    }
});