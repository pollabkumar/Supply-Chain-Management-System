import React, { useEffect } from 'react'
import { Form, Input, Select, Button, message } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()
    const handleSubmit = async (value) => {
        try {

            await axios.post('/api/users/register', value)
            message.success('Register Successfully')
            navigate('/login')

        } catch (error) {

            message.error('something went wrong')
            console.log(error)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            localStorage.getItem('auth')
            navigate('/login')
        }
    }, [navigate])
    return (
        <>
            <div className='register'>
                <div className='register-form'>

                    <h3>REGISTRATION</h3>


                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item name='name' label='Name'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='userId' label='UserId'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='password' label='Password'>
                            <Input type="password" />
                        </Form.Item>
                        <div className='d-flex justify-content-between'>
                            <p>
                                Already Register please
                                <Link to='/login'>Login Here</Link>
                            </p>
                            <Button type='primary' htmlType='submit'>Register</Button>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    )
}

export default Register