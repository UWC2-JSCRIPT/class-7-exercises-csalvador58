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
        // if(e.target.id == 'name') isNameInvalid(e.target, e.target.value);
        if(e.target.id == 'name') isStrInvalid(e.target, e.target.value, 3);
        if(e.target.id == 'email') isRegexInvalid(e.target, e.target.value, 0);
        if(e.target.id == 'message') isStrInvalid(e.target, e.target.value, 10);

        // {EXTRA CREDIT}
        if(e.target.id == 'title') isStrInvalid(e.target, e.target.value, 1);
        if(e.target.id == 'company') isRegexInvalid(e.target, e.target.value, 1);
    }, true);

    // Added a 'change' listener event to run function when dropdown selection is changed
    document.addEventListener('change', function(e) {
        if(e.target.id == 'contact-reason') isReasonInvalid(e.target, e.target.value);

        // {EXTRA CREDIT}
        if(e.target.id == 'language') isLanguageInvalid(e.target, e.target.value);
    }, true);

    // 'Submit' listener to run checks before form submission  
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Run all invalid checks
        isStrInvalid(fullName, fullName.value, 3);
        isRegexInvalid(email, email.value, 0);
        isStrInvalid(message, message.value, 10);

        // Run additional checks based on optional reason for contact info.
        // form.reportValidity method used to alert invalid inputs on screen
        if (contactReason.value == 'job') {
            isStrInvalid(title, title.value, 1);
            isRegexInvalid(company, company.value, 1);
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
            form.reportValidity();
            if (! (fullName.validity.customError + email.validity.customError + message.validity.customError) > 0) {
                form.submit();
            }
        }
    });

    // Function will hide/display additional info based on the option selected in the dropdown menu
    function displayAdditionalInfo (info) {
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
            isStrInvalid(title, true, 1);
            isRegexInvalid(company, 'https://wwww.123test.com', 1);
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
            isStrInvalid(title, true, 1);
            isRegexInvalid(company, 'https://wwww.123test.com', 1);
            isReasonInvalid (contactReason, true);
            document.querySelector('.additional-info-job').style.display = 'none';
            document.querySelector('.additional-info-talk').style.display = 'none';
        }
    }

    function isRegexInvalid (el, str, expression) {
        // Regex array - 0 for email test, 1 for url test.
        const regex = [/\w+@\w+\.\w+/g, /https?\:\/\/.+\..+/g];

        if(! (regex[expression].test(str))) {
            el.classList.add('invalid'); 
            el.setCustomValidity(`Your ${el.id} is invalid`);
        } else {
            el.classList.remove('invalid'); 
            el.setCustomValidity('');
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

    // Checks if string is invalid. Arguments include the referenced element, string, and string length limit.
    function isStrInvalid (el, str, minLimit) {
        if(str.length < minLimit) {
            el.classList.add('invalid'); 
            el.setCustomValidity(`Input must be at least ${minLimit} characters`);
            
        } else {
            el.classList.remove('invalid'); 
            el.setCustomValidity('');
        }
    }

    function isReasonInvalid (e, reason) {
        if(!reason) {
            e.classList.add('invalid'); 
            e.setCustomValidity('Please select an option');
            
        } else {
            e.classList.remove('invalid'); 
            e.setCustomValidity('');
        }
        displayAdditionalInfo(reason);
    }
});