import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import apiClient from '../../Service/apiClient';

const Verify = () => {
    const [loading,setLoading] = useState(true);
    const [isSuccess,setIsSuccess] = useState(false);
 const [searchParams, setSearchParams] = useSearchParams();
const type = searchParams.get('type');
const token = searchParams.get('token');

    useEffect(()=>{
switch (type) {
    case "email":
        apiClient.verifyMail(token).then(res=>{
            console.log(res);
            setIsSuccess(true)
        }).catch(err=>console.log(err)).finally(()=>{
            setLoading(false);
            setIsSuccess(false);
        });
        
        break;

    default:
        break;
}        
        
    },[])

if(loading) return <>Loading......</>
  return (
    <div>{isSuccess?"Verified":"Fail to verify"}</div>
  )
}

export default Verify