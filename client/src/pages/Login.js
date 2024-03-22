import { Form, Input, Select, Button, message } from 'antd'
import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const handleSubmit = async (value) => {
        try {
          
            const res = await axios.post("/api/users/login", value);
            message.success("user login Succesfully");
            localStorage.setItem('auth', JSON.stringify(res.data))
            navigate("/menuf");
        } catch (error) {
            message.error("Something Went Wrong");
            console.log(error);
        }
    };

    // currently login  user
    useEffect(() => {
        if (localStorage.getItem("auth")) {
            localStorage.getItem("auth");
            navigate("/menuf");
        }
    }, [navigate]);
   

    return (
        <>
            <div className='register'>
                <div className='register-form'>

                    <h3>LOGIN</h3>


                    <Form layout='vertical' onFinish={handleSubmit}>

                        <Form.Item name='userId' label='UserId'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='password' label='Password'>
                            <Input type="password" />
                        </Form.Item>
                        <div className='d-flex justify-content-between'>
                            <p>
                                Not a user please
                                <Link to='/'> Register Here</Link>
                            </p>
                            <Button type='primary' htmlType='submit'>lOGIN</Button>
                        </div>

                    </Form>
                </div>
            </div>



        </>
    )
}

export default Login