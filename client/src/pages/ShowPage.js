import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'

import { Row, Col } from 'antd';
import ItemOne from '../components/ItemOne';

const ShowPage = () => {
    const [itemsData, setItemsData] = useState([]);
    useEffect(() => {
        const getAllItems = async () => {
            try {
                const { data } = await axios.get('/api/re/get-re')
                setItemsData(data);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        };
        getAllItems();
    }, [])
    return (
        <DefaultLayout>
            <Row>
                {
                    itemsData.map(item => (
                        <Col xs={24} lg={6} md={12} sm={6}>
                            < ItemOne item={item} />
                        </Col>
                    ))
                }
            </Row>
        </DefaultLayout>
    )
}

export default ShowPage