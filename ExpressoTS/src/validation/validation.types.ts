class ValidationErrorResponses extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

export { ValidationErrorResponses };
