import React, { useEffect, useState } from 'react'


import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Modal, Button, Table, Form, Select, Input, message } from 'antd';
import DefaultLayout from '../components/DefaultLayout'

const Manufacturer = () => {
    const [itemsData, setItemsData] = useState([]);
    const [popupModel, setPopupModel] = useState(false)
    const [editItem, setEditItem] = useState(null)

    const getAllItems = async () => {
        try {
            const { data } = await axios.get('/api/Menuf/get-Menuf')
            setItemsData(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        getAllItems();
    }, [])


    const handleDelelte = async (record) => {
        try {

            await axios.post('/api/Menuf/delete-Menuf', { itemId: record._id })
            message.success('Item deleted Successfully')
            getAllItems();
            setPopupModel(false)
        } catch (error) {
            message.error('something went wrong')
            console.log(error)
        }
    }


    const columns = [
        { title: 'Manufacturer Name', dataIndex: 'mname' },

        { title: 'location', dataIndex: 'location' },
        { title: 'Category', dataIndex: 'mcategory' },
        { title: 'product', dataIndex: 'mproduct' },
        { title: 'Date', dataIndex: 'date' },

        {
            title: 'Action', dataIndex: '_id',


            render: (id, record) => (<div>

                <EditOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setEditItem(record)
                        setPopupModel(true)
                    }}
                />,

                <DeleteOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        handleDelelte(record)
                    }} />
            </div>
            )
        }
    ];

    const handleSubmit = async (value) => {
        if (editItem === null) {
            try {
                const res = await axios.post('/api/Menuf/add-Menuf', value)
                message.success('Item Add Successfully')
                getAllItems();
                setPopupModel(false)

            } catch (error) {
                message.error('something went wrong')
                console.log(error)
            }
        } else {

            try {
                await axios.put('/api/Menuf/edit-Menuf', { ...value, itemId: editItem._id })
                message.success('Item updated Successfully')
                getAllItems();
                setPopupModel(false)

            } catch (error) {
                message.error('something went wrong')
                console.log(error)
            }
        }
    };

    return (
        <DefaultLayout>
            <div className='d-flex justify-content-between '>
                <h1></h1>
                <Button type='primary' onClick={() => setPopupModel(true)}>Add Details</Button>
            </div>
            <h1></h1>
            <Table columns={columns} dataSource={itemsData}  pagination={false} bordered />

            {
                popupModel && (
                    <Modal title={`${editItem !== null ? 'Edit Item' : 'Add New Manufacturer'}`}
                        visible={popupModel}
                        onCancel={() => {
                            setEditItem(null)
                            setPopupModel(false)
                        }} footer={false}>

                        <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit} >



                            <Form.Item name='mname' label=' Manufacturer Name'>
                                <Input />
                            </Form.Item>
                            <Form.Item name='location' label='Location'>
                                <Input />
                            </Form.Item>
                            <Form.Item name='mcategory' label='Category'>
                                <Input />
                            </Form.Item>

                            <Form.Item name='mproduct' label='Product'>
                                <Input />
                            </Form.Item>
                            <Form.Item name='date' label='Date'>
                                <Input />
                            </Form.Item>
                            <div className='d-flex justify-content-end'>
                                <Button type='primary' htmlType='submit'>save</Button>
                            </div>

                        </Form>
                    </Modal>
                )
            }
        </DefaultLayout >
    )
}

export default Manufacturer