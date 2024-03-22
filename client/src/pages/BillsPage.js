import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Modal, Button, Table } from "antd";
import "../styles/InvoiceStyles.css";
const BillsPage = () => {
  const componentRef = useRef();

  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const getAllBills = async () => {
    try {
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    { title: "Address ", dataIndex: "address" },
    { title: "Contact No", dataIndex: "CustomerContact" },
    { title: "Status ", dataIndex: "status" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  console.log(selectedBill);
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Customer Details</h1>
      </div>

      <Table
        columns={columns}
        dataSource={billsData}
        pagination={false}
        bordered
      />

      {popupModal && (
        <Modal
          width={400}
          pagination={false}
          title="Invoice Details"
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* ============ invoice modal start ==============  */}
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2></h2>
                <p> Contact : 123456 | GUWAHATI</p>
              </div>
            </center>

            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Address : <b>{selectedBill.address}</b>
                  <br />
                  Phone No : <b>{selectedBill.CustomerContact}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>

            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Quantity</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.rproduct}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity} </p>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong>
                  <b> xyz.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>

          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
