import { useNavigate } from "react-router-dom"
import { login, resetStatus } from "../../../store/authSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import Form from "../Form"
import { UserLoginType } from "../types"
import React from "react"
import { Status } from "../../../globals/types/types"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {status} = useAppSelector((state)=>state.auth)
  const handleLogin = (data : UserLoginType)=>{
    // console.log(data);
    dispatch(login(data))
  }

  React.useEffect(()=>{
    if(status === Status.SUCCESS){
      dispatch(resetStatus())
      navigate('/')
    }
  },[status,navigate,dispatch])

  return (
    <div>
      <Form type="login" onSubmit = {handleLogin} />
    </div>
  )
}

export default Login
