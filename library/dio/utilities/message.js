function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("DATA_SUCCESSFULLY_RETRIEVED", "Data successfully retrieved.");
define("DATA_SUCCESSFULLY_CREATED", "Data successfully created.");
define("DATA_SUCCESSFULLY_DELETED", "Data successfully deleted.");
define("DATA_SUCCESSFULLY_UPDATED", "Data successfully updated.");

define("DATA_FAILED_TO_RETRIEVE", "Unable to retrieve data. Contact your system immediately.");
define("DATA_FAILED_TO_CREATE", "Unable to create data. Contact your system immediately.");
define("DATA_FAILED_TO_DELETE", "Unable to delete data. Contact your system immediately.");
define("DATA_FAILED_TO_UPDATE", "Unable to update data. Contact your system immediately.");

define("LOGIN_USERNAME_REQUIRED", "Unable to Login. Username is required.");
define("LOGIN_PASSWORD_REQUIRED", "Unable to Login. Password is required.");

define("ERROR", "Error was encountered.");