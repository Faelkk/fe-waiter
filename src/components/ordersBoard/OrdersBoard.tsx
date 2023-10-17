import { FC, useState } from "react";

import { OrderType } from "../../types/Types";
import { Board, OrdersContainer } from "./style";
import OrderModal from "../orderModal/OrderModal";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

interface PropsOrderBoard {
  title: string;
  icon: string;
  orders: OrderType[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: OrderType["status"]) => void;
}

const OrdersBoard: FC<PropsOrderBoard> = ({
  title,
  icon,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}) => {
  const [isModalVisible, setIsModalVisibile] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenOrder = (order: OrderType) => {
    setIsModalVisibile(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalVisibile(false);
    setSelectedOrder(null);
  };

  const handleChangeOrderStatus = async () => {
    setIsLoading(true);

    const status =
      selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

    await api.patch(`/orders/${selectedOrder?._id}`, {
      status,
    });

    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve o status alterado`
    );

    selectedOrder!._id;
    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisibile(false);
  };

  const handleCancelOrder = async () => {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`);

    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisibile(false);
  };

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        selectedOrder={selectedOrder}
        onClose={handleCloseModal}
        onCancel={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
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
