import { useEffect, useState } from "react";
import { OrderType } from "../../types/Types";
import { Container } from "./style";
import { api } from "../../utils/api";

import OrdersBoard from "../ordersBoard/OrdersBoard";
import socketIo from "socket.io-client";

const Order = () => {
  const [order, setOrder] = useState<OrderType[]>([]);
  async function listOrder() {
    const response = await api.get("/orders");
    setOrder(response.data);
  }

  useEffect(() => {
    const socket = socketIo("http://localhost:5001", {
      transports: ["websocket"],
    });

    socket.on("orders@new,", (order) => {
      setOrder((prevState) => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    listOrder();
  }, []);

  const waitingOrder = order.filter(
    (eachOrder) => eachOrder.status === "WAITING"
  );
  const inProductionOrder = order.filter(
    (eachOrder) => eachOrder.status === "IN_PRODUCTION"
  );
  const readyOrder = order.filter((eachOrder) => eachOrder.status === "DONE");

  function handleCancelOrder(orderId: string) {
    setOrder((prevState) =>
      prevState.filter((eachOrder) => eachOrder._id !== orderId)
    );
  }

  function handleOrderStatusChange(
    orderId: string,
    status: OrderType["status"]
  ) {
    setOrder((prevstate) =>
      prevstate.map((orderChange) =>
        orderChange._id === orderId
          ? {
              ...orderChange,
              status,
            }
          : orderChange
      )
    );
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="fila de espera"
        orders={waitingOrder}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={inProductionOrder}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto !"
        orders={readyOrder}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
};

export default Order;
