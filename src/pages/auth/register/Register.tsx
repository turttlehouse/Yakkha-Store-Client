import Form from "../Form"
import { UserDataType } from "../types"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { register, resetStatus,  } from "../../../store/authSlice"
import { Status } from "../../../globals/types/types"
import { useNavigate } from "react-router-dom"
import React from "react"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  //here state is the store state and taking out the status from the auth slice as auth key is used in the store to store the auth state
  const {status} = useAppSelector((state)=>state.auth)
  const handleRegister = (data:UserDataType)=>{
    // console.log(data);
    dispatch(register(data))

    //dispatch garda kehi time lagcha so sometimes navigate garda problem auxa so we can use async await or use below approach
    // if(status === Status.SUCCESS){
    //   navigate('/login')
    // }
  }

  React.useEffect(()=>{
    //so next page ma navigate garda ni status success nai vayera basirakhxa so status reset garnu paro
    if(status === Status.SUCCESS){
      dispatch(resetStatus())
      navigate('/login')
    }
  },[navigate,status,dispatch])

  return (
    <div>
        <Form type="register" onSubmit={handleRegister} />
    </div>
  )
}

export default Register
