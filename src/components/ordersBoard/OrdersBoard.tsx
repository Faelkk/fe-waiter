import { FC, useState } from "react";

import { Order } from "../../types/Types";
import { Board, OrdersContainer } from "./style";
import OrderModal from "../orderModal/OrderModal";

interface PropsOrderBoard {
  title: string;
  icon: string;
  orders: Order[];
}

const OrdersBoard: FC<PropsOrderBoard> = ({ title, icon, orders }) => {
  const [isModalVisible, setIsModalVisibile] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenOrder = (order: Order) => {
    setIsModalVisibile(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalVisibile(false);
    setSelectedOrder(null);
  };

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        selectedOrder={selectedOrder}
        onClose={handleCloseModal}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>(1)</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders?.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenOrder(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{`${order.products.length} itens`}</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
};

export default OrdersBoard;
