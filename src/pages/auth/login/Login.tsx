import Form from "../Form"
import { UserDataType } from "../types"

const Login = () => {
  const handleLogin = (data : UserDataType)=>{
    console.log(data);

  }
  return (
    <div>
      <Form type="login" onSubmit = {handleLogin} />
    </div>
  )
}

export default Login
