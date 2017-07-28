// JQFormValidation.js
/*
 * Shorthand for $(document).ready( function() {...} )
 * Run once the DOM tree is contructed.
 */
$( function() {
   // Set initial focus
   $('#txtName').focus();
 
   // Bind "submit" event handler to form
   $('#formTest').on('submit', function() {
      var $form = $(this);
      // return false would prevent default submission
      return isNotEmpty($form.find('#txtName'), "Please enter your name!",
               $form.find('#elmNameError'))
            && isNumeric($form.find('#txtZipcode'), "Please enter a 5-digit zip code!",
               $form.find('#elmZipcodeError'))
            && isLengthMinMax($form.find('#txtZipcode'), 5, 5, "Please enter a 5-digit zip code!",
               $form.find('#elmZipcodeError'))
            && isSelected($form.find('#selCountry'), "Please make a selection!",
               $form.find('#elmCountryError'))
            && isChecked($form.find('[name="gender"]:checked'), "Please check a gender!",
               $form.find('#elmGenderError'))
            && isChecked($form.find('[name="color"]:checked'), "Please check a color!",
               $form.find('#elmColorError'))
            && isNumeric($form.find('#txtPhone'), "Please enter a valid phone number!",
               $form.find('#elmPhoneError'))
            && isValidEmail($form.find('#txtEmail'), "Enter a valid email!",
               $form.find('#elmEmailError'))
            && isValidPassword($form.find('#txtPassword'), "Password shall be 6-8 characters!",
               $form.find('#elmPasswordError'))
            && verifyPassword($form.find('#txtPassword'), $form.find('#txtPWVerified'),
               "Different from new password!", $form.find('#elmPWVerifiedError'))
            ;
   });
 
   // Bind "click" event handler to "reset" button
   $('#btnReset').on('click', function() {
      $('.errorBox').removeClass('errorBox');  // remove the error styling
      $('td[id$="Error"]').html('');  // id ends with "Error", remove contents
      $('txtName').focus();  // Set focus element
   });
});
 
/*
 * Helper function, to be called after validation, to show or clear
 *   existing error message, and to set focus to the input element
 *   for correcting error.
 * If isValid is false, show the errMsg on errElm, and place the
 *   focus on the inputElm for correcting the error.
 * Else, clear previous errMsg on errElm, if any.
 *
 * @param isValid (boolean): flag indicating the result of validation
 * @param errMsg (string)(optional): error message
 * @param errElm (jQuery object)(optional): if isValid is false, show errMsg;
          else, clear.
 * @param inputElm (jQuery object)(optional): set focus to this element,
 *        if isValid is false
 */
function postValidate(isValid, errMsg, errElm, inputElm) {
   if (!isValid) {
      // Show errMsg on errElm, if provided.
      if (errElm !== undefined && errElm !== null
            && errMsg !== undefined && errMsg !== null) {
         errElm.html(errMsg);
      }
      // Set focus on Input Element for correcting error, if provided.
      if (inputElm !== undefined && inputElm !== null) {
         inputElm.addClass("errorBox");  // Add class for styling
         inputElm.focus();
      }
   } else {
      // Clear previous error message on errElm, if provided.
      if (errElm !== undefined && errElm !== null) {
         errElm.html('');
      }
      if (inputElm !== undefined && inputElm !== null) {
         inputElm.removeClass("errorBox");
      }
   }
}
 
/*
 * Validate that input value is not empty.
 *
 * @param inputElm (jQuery object): input element
 * @param errMsg (string): error message
 * @param errElm (jQuery object): element to place error message
 */
function isNotEmpty(inputElm, errMsg, errElm) {
   var isValid = (inputElm.val().trim() !== "");
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
/* Validate that input value contains one or more digits */
function isNumeric(inputElm, errMsg, errElm) {
   var isValid = (inputElm.val().trim().match(/^\d+$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
/* Validate that input value contains only one or more letters */
function isAlphabetic(inputElm, errMsg, errElm) {
   var isValid = (inputElm.val().trim().match(/^[a-zA-Z]+$/) !== null) ;
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
/* Validate that input value contains one or more digits or letters */
function isAlphanumeric(inputElm, errMsg, errElm) {
   var isValid = (inputElm.val().trim().match(/^[0-9a-zA-Z]+$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
/* Validate that input value length is between minLength and maxLength */
function isLengthMinMax(inputElm, minLength, maxLength, errMsg, errElm) {
   var inputValue = inputElm.val().trim();
   var isValid = (inputValue.length >= minLength) && (inputValue.length <= maxLength);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
// Validate that input value is a valid email address
function isValidEmail(inputElm, errMsg, errElm) {
   var isValid = (inputElm.val().trim().match(
         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
/*
 * Validate that a selection is made (not default of "") in <select> input
 *
 * @param selectElm (jQuery object): the <select> element
 */
function isSelected(selectElm, errMsg, errElm) {
   // You need to set the default value of <select>'s <option> to "".
   var isValid = (selectElm.val() !== "");   // value in selected <option>
   postValidate(isValid, errMsg, errElm, selectElm);
   return isValid;
}
 
/*
 * Validate that one of the checkboxes or radio buttons is checked.
 * Checkbox and radio are based on name attribute, not id.
 *
 * @param inputElms (jQuery object): "checked" checkboxes or radio
 */
function isChecked(inputElms, errMsg, errElm) {
   var isChecked = inputElms.length > 0;
   postValidate(isChecked, errMsg, errElm, null);  // no focus element
   return isChecked;
}
 
// Validate password, 6-8 characters of [a-zA-Z0-9_]
function isValidPassword(inputElm, errMsg, errElm) {
   var isValid = (inputElm.val().trim().match(/^\w{6,8}$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
// Verify password.
function verifyPassword(pwElm, pwVerifiedElm, errMsg, errElm) {
   var isTheSame = (pwElm.val() === pwVerifiedElm.val());
   postValidate(isTheSame, errMsg, errElm, pwVerifiedElm);
   return isTheSame;
}