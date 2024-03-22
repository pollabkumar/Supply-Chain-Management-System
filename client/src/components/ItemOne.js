import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";

const ItemOne = ({ item }) => {
  const dispatch = useDispatch();
  const handleSHOWToCart = () => {
    dispatch({
      type: "ADD_TO_CARD",
      payload: { ...item, quantity: 1 },
    });
  };
  const { Meta } = Card;
  return (
    <div>
      <Card style={{ width: 240, height: 100, marginBottom: 20 }}>
        <Meta title={item.rproduct} />
        <div className="item-button">
          <Button onClick={() => handleSHOWToCart()}>Add Product</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemOne;
