sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("searchvec.controller.Overview", {
        onInit: function () {

        },
        onPressUpload: function (oEvent) {
            let file = oEvent.getSource().FUEl.files[0] // Get the file using FileUploader reference

   if (!file) {
       MessageBox.show("Please select a file", {
           icon: MessageBox.Icon.WARNING,
           title: "Warning"
       });
       return;
   }

   // Show busy indicator
   sap.ui.core.BusyIndicator.show(0);

   // Prepare form data
   let formData = new FormData();
   formData.append("file", file); // Append the file to FormData
   console.log("Request URL:", "/api/upload-pdf");

   // Make an AJAX request to upload the file
$.ajax({
   url: "/upload-pdf",  // The destination you've configured in xs-app.json
   type: "POST",
   data: formData,
   contentType: false,      // To prevent jQuery from setting the content type
   processData: false,      // To prevent jQuery from converting the FormData object into a query string
   success: function (data) {
       // Assuming the response is in JSON format and contains the extracted text
       var extractedText = data.extractedText || "No text found.";
       var oText = this.getView().byId("resultText");
       oText.setText(extractedText);
   }.bind(this),
   error: function (jqXHR, textStatus, errorThrown) {
       // Handle errors
       console.error("Error:", textStatus, errorThrown);
       MessageBox.show("Error processing the response from the server.", {
           icon: MessageBox.Icon.ERROR,
           title: "Error"
       });
   },
   complete: function () {
       // Hide busy indicator
       sap.ui.core.BusyIndicator.hide();
   }
});
},

    });
});
