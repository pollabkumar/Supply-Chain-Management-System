import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Modal, Button, Table, Form, Select, Input, message } from 'antd';
import DefaultLayout from '../components/DefaultLayout'

const DistributorPage = () => {
    const [itemsData, setItemsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [disData, setDisData] = useState([]);
    const [popupModel, setPopupModel] = useState(false)
    const [editItem, setEditItem] = useState(null)

    const {Option} = Select

    console.log("Category: ", selectedCategory)

    const getDisItems = async () => {
        try {
            const { data } = await axios.get('/api/Menuf/get-Menuf')
            setDisData(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };

    const getAllItems = async () => {
        try {
            const { data } = await axios.get('/api/dis/get-dis')
            setItemsData(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        getAllItems();
        getDisItems();
    }, [])


    const handleDelelte = async (record) => {
        try {

            await axios.post('/api/dis/delete-dis', { itemId: record._id })
            message.success('Item deleted Successfully')
            getAllItems();
            setPopupModel(false)
        } catch (error) {
            message.error('something went wrong')
            console.log(error)
        }
    }


    const columns = [
        { title: ' Distributor Name', dataIndex: 'dname' },

        { title: 'Address', dataIndex: 'address' },
        { title: 'Category', dataIndex: 'dcategory' },
        { title: 'Product', dataIndex: 'dproduct' },
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

    const handleSelectedCategory = (value) => {
        setSelectedCategory(value)
    }

  
    const handleSubmit = async (value) => {
        if (editItem === null) {
            try {
                const res = await axios.post('/api/dis/add-dis', value)
                message.success('Item Add Successfully')
                getAllItems();
                setPopupModel(false)

            } catch (error) {
                message.error('something went wrong')
                console.log(error)
            }
        } else {

            try {
                await axios.put('/api/dis/edit-dis', { ...value, itemId: editItem._id })
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
                    <Modal title={`${editItem !== null ? 'Edit Item' : 'Add New Distributor details'}`}
                        visible={popupModel}
                        onCancel={() => {
                            setEditItem(null)
                            setPopupModel(false)
                        }} footer={false}>

                        <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit} >

                            <Form.Item name='dname' label='Distributor Name'>
                                <Input />
                            </Form.Item>
                            <Form.Item name='address' label='Address'>
                                <Input />
                            </Form.Item>
                            
                            <Form.Item name='dcategory' label='Category'>
                                <Select defaultValue="" value={selectedCategory} onChange={handleSelectedCategory}>
                                
                                {disData.map((option) => (
                                        <Option value={option.mcategory}>{option.mcategory}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name='dproduct' label='Product'>
                                <Select>
                                    {
                                        disData.filter((option) => option.mcategory === selectedCategory).map((option) => 
                                        <Option value={option.mproduct}>{option.mproduct}</Option>)
                                    }
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

export default DistributorPage