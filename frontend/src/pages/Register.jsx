import Form from "../components/form"

function Register(){
    console.log("register")
    return <Form route="/api/user/register/" method="register"/>
}
export default Register