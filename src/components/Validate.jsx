export const valid = (email, password) => {
    const isemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    const ispass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    if(!isemail) return "Email не коректний"
    if(!ispass) return "Пароль має складатись з літер англійської абетки, містити великі і маленькі літери та цифри. Мінімальна довжина - 8 символів"
    return null

}