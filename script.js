// Database connection token
const connToken = "90935024|-31949209672792235|90958900";
const dbName = "SCHOOL-DB";
const relName = "STUDENT-TABLE";
const jpdbBaseURL = "http://api.login2explore.com:5577";
const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";

// Initialize form on page load
$(document).ready(function () {
    resetForm();
    $("#rollNo").focus();
});

// Check if record exists when roll number is entered
$("#rollNo").on("blur", function () {
    const rollNo = $("#rollNo").val();
    if (rollNo === "") {
        $("#rollNoMsg").html("Roll No is required");
        $("#rollNo").focus();
        return;
    }

    const jsonStr = {
        rollNo: rollNo,
    };

    // Check if record exists in database
    const reqStr = createGETRequest(
        connToken,
        dbName,
        relName,
        JSON.stringify(jsonStr)
    );

    jQuery.ajaxSetup({ async: false });
    const resultObj = executeCommandAtGivenBaseUrl(
        reqStr,
        jpdbBaseURL,
        jpdbIRL
    );
    jQuery.ajaxSetup({ async: true });

    if (resultObj.status === 400) {
        // Record not found
        $("#rollNoMsg").html("");
        enableFormFields();
        $("#saveBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#updateBtn").prop("disabled", true);
        $("#fullName").focus();
    } else if (resultObj.status === 200) {
        // Record exists
        $("#rollNoMsg").html("");
        fillFormData(resultObj.data);
        enableFormFields();
        $("#rollNo").prop("disabled", true);
        $("#saveBtn").prop("disabled", true);
        $("#updateBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#fullName").focus();
    }
});

function validateAndGetFormData() {
    // Get form field values
    const rollNo = $("#rollNo").val();
    const fullName = $("#fullName").val();
    const className = $("#class").val();
    const birthDate = $("#birthDate").val();
    const address = $("#address").val();
    const enrollmentDate = $("#enrollmentDate").val();

    // Validate required fields
    if (rollNo === "") {
        alert("Roll No is required");
        $("#rollNo").focus();
        return "";
    }

    if (fullName === "") {
        alert("Full Name is required");
        $("#fullName").focus();
        return "";
    }

    if (className === "") {
        alert("Class is required");
        $("#class").focus();
        return "";
    }

    if (birthDate === "") {
        alert("Birth Date is required");
        $("#birthDate").focus();
        return "";
    }

    if (address === "") {
        alert("Address is required");
        $("#address").focus();
        return "";
    }

    if (enrollmentDate === "") {
        alert("Enrollment Date is required");
        $("#enrollmentDate").focus();
        return "";
    }

    // Create JSON object
    const jsonStrObj = {
        rollNo: rollNo,
        fullName: fullName,
        class: className,
        birthDate: birthDate,
        address: address,
        enrollmentDate: enrollmentDate,
    };

    return JSON.stringify(jsonStrObj);
}

function fillFormData(data) {
    const record = JSON.parse(data).record;
    $("#rollNo").val(record.rollNo);
    $("#fullName").val(record.fullName);
    $("#class").val(record.class);
    $("#birthDate").val(record.birthDate);
    $("#address").val(record.address);
    $("#enrollmentDate").val(record.enrollmentDate);
}

function enableFormFields() {
    $("#fullName").prop("disabled", false);
    $("#class").prop("disabled", false);
    $("#birthDate").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollmentDate").prop("disabled", false);
}

function disableFormFields() {
    $("#fullName").prop("disabled", true);
    $("#class").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollmentDate").prop("disabled", true);
}

function resetForm() {
    $("#studentForm").trigger("reset");
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");

    // Disable all fields except Roll No
    $("#rollNo").prop("disabled", false);
    disableFormFields();

    // Disable buttons
    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);

    // Clear error message
    $("#rollNoMsg").html("");

    // Set focus on roll number
    $("#rollNo").focus();
}

function saveStudent() {
    const jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return; // Exit if validation fails
    }

    // Create PUT request string with DB credentials
    const putReqStr = createPUTRequest(
        connToken,
        jsonStr,
        dbName,
        relName
    );

    jQuery.ajaxSetup({ async: false });
    // Send request to login2explore API
    const resultObj = executeCommandAtGivenBaseUrl(
        putReqStr,
        jpdbBaseURL,
        jpdbIML
    );
    jQuery.ajaxSetup({ async: true });

    if (resultObj.status === 200) {
        alert("Data saved successfully");
    } else {
        alert("Error: " + resultObj.message);
    }

    resetForm();
}

function updateStudent() {
    const jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return; // Exit if validation fails
    }

    // Create UPDATE request string
    const updateReqStr = createUPDATERecordRequest(
        connToken,
        jsonStr,
        dbName,
        relName,
        $("#rollNo").val()
    );

    jQuery.ajaxSetup({ async: false });
    // Send request to login2explore API
    const resultObj = executeCommandAtGivenBaseUrl(
        updateReqStr,
        jpdbBaseURL,
        jpdbIML
    );
    jQuery.ajaxSetup({ async: true });

    if (resultObj.status === 200) {
        alert("Data updated successfully");
    } else {
        alert("Error: " + resultObj.message);
    }

    resetForm();
}