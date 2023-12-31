import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const Login = () => {
    const [show, setShow]= useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState()

    const toast = useToast();
    const history = useHistory();
    const handleClick = ()=>{
            setShow(!show)
    }

    const submithandler = async()=>{
        setLoading(true);
        if(!email||!password){
            toast({
                title:"Please Fill All the Fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            setLoading(false);
            return;
        }
        try {
            
            const config = {
                headers:{
                    "Content-Type":"application/json",
                },
            }
            const {data} = await axios.post("/api/user/login",{email,password},config)
            toast({
                title:"Login Successfull",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            
            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            history.push("/chats")
        } catch (error) {
            toast({
                title:"Error Occurred",
                description: error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
              })
              setLoading(false);
        }

    }
    return (
        <VStack spacing="5px" color="black">
            <FormControl id="first-name" isRequired>
                <FormLabel >Name</FormLabel>
                <Input
                placeholder='Enter Your name'
                onChange={(e)=>setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel >Email</FormLabel>
                <Input
                placeholder='Enter Your email'
                onChange={(e)=>setEmail(e.target.value)}
                />
            </FormControl>
           
            <FormControl id="password" isRequired>
                <FormLabel >Password</FormLabel>
                <InputGroup>
                <Input
                type={show ? 'text' : 'password'}
                placeholder='Enter Your password    '
                onChange={(e)=>setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide":"Show"}
                    </Button>
                </InputRightElement>
                </InputGroup>
    
            </FormControl>


           <Button
           colorScheme='blue'
           width='100%'
           style={{marginTop:15}}
           onClick={submithandler}
           isLoading={loading}
           >
            Login 
           </Button>
           <Button
           variant='solid'
           colorScheme='red'
           width="100%"
           onClick={()=>{
            setEmail("guest@emaple.com")
            setPassword("123456")
           }}
           >
            Get Guest User Credentials
           </Button>
    
        </VStack >
      )
}

export default Login