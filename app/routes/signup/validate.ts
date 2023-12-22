export function validate(email:string, password:string, name:string){
    let errors : {email?:string, password?:string, name?:string} = {}

    if (!email) {
        errors.email = "Email is required"
    }
    if (!password) {
        errors.password = "Password is required"
    }
    if (!name) {
        errors.name = "Name is required"
    }

    return Object.keys(errors).length ? errors : null
}
