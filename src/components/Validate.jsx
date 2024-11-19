export const valid = (email, password) => {
    const isemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    const ispass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    if(!isemail) return "Email is not valid"
    if(!ispass) return "Password must contain at least 8 characters, including uppercase and lowercase letters, and a number"
    return null

}