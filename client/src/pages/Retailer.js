import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Modal, Button, Table, Form, Select, Input, message, Checkbox, } from 'antd';
import DefaultLayout from '../components/DefaultLayout'

const Retailer = () => {
    const [itemsData, setItemsData] = useState([]);
    const [mData, setMenuData] = useState([]);
    const [disData, setDisData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [popupModel, setPopupModel] = useState(false)
    const [editItem, setEditItem] = useState(null)

    const getMenuItems = async () => {
        try {
            const { data } = await axios.get('/api/Menuf/get-Menuf')
            setMenuData(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };



    const getDisItems = async () => {
        try {
            const { data } = await axios.get('/api/dis/get-dis')
            setDisData(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };

    const getAllItems = async () => {
        try {
            const { data } = await axios.get('/api/re/get-re')
            setItemsData(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        getAllItems();
        getDisItems();
        getMenuItems();
    }, [])


    const handleDelelte = async (record) => {
        try {

            await axios.post('/api/re/delete-re', { itemId: record._id })
            message.success('Item deleted Successfully')
            getAllItems();
            setPopupModel(false)
        } catch (error) {
            message.error('something went wrong')
            console.log(error)
        }
    }


    const handleSelectedCategory = (value) => {
        setSelectedCategory(value)
    }


    const columns = [
        { title: 'Retailer Name', dataIndex: 'rname' },

        { title: 'Address', dataIndex: 'address' },
        { title: 'distributor', dataIndex: 'distributor' },

        { title: 'category', dataIndex: 'rcategory' },
        { title: 'product', dataIndex: 'rproduct' },
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
                const res = await axios.post('/api/re/add-re', value)
                message.success('Item Add Successfully')
                getAllItems();
                setPopupModel(false)

            } catch (error) {
                message.error('something went wrong')
                console.log(error)
            }
        } else {

            try {
                await axios.put('/api/re/edit-re', { ...value, itemId: editItem._id })
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
            <Table columns={columns} dataSource={itemsData} pagination={false} bordered />

            {
                popupModel && (
                    <Modal title={`${editItem !== null ? 'Edit Item' : 'Add New Retailer Details'}`}
                        visible={popupModel}
                        onCancel={() => {
                            setEditItem(null)
                            setPopupModel(false)
                        }} footer={false}>

                        <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit} >



                            <Form.Item name='rname' label=' Retailer Name'>
                                <Input />
                            </Form.Item>
                            <Form.Item name='address' label='Address'>
                                <Input />
                            </Form.Item>
                            <Form.Item name='distributor' label='Distributor Name'>
                            <Select  value={selectedCategory}  onChange={handleSelectedCategory}>
                            {disData.map((option) => (
                                <Select.Option value={option.dname}>{option.dname}</Select.Option>
                            ))}
                            </Select>
                            </Form.Item>

                            <Form.Item name='rcategory' label='Category'>
                                <Select  value={selectedCategory}  onChange={handleSelectedCategory}>
                                {disData.filter((option)=>option.dname === selectedCategory).map((option) => (
                                    <Select.Option value={option.dcategory}>{option.dcategory}</Select.Option>
                                ))}
                                </Select>

                            </Form.Item>
                            <Form.Item name='rproduct' label='Product'>
                                <Select>
                                    {disData.filter((option)=>option.dcategory === selectedCategory).map((option) => (
                                        <Select.Option value={option.dproduct}>{option.dproduct}</Select.Option>
                                    ))}
                                </Select>

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

export default Retailer