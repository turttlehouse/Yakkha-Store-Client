import { useDispatch } from "react-redux"
import Form from "../Form"
import { UserDataType } from "../types"

const Register = () => {
  const dispatch = useDispatch()
  const handleRegister = (data:UserDataType)=>{
    console.log(data);

  }
  return (
    <div>
        <Form type="register" onSubmit={handleRegister} />
    </div>
  )
}

export default Register
