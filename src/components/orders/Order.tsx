import { Order as OrderType } from "../../types/Types";
import OrdersBoard from "../ordersBoard/OrdersBoard";
import { Container } from "./style";

const ordersMock: OrderType[] = [
  {
    _id: "652809bda6c3ac4656a05d8a",
    table: "123",
    status: "WAITING",
    products: [
      {
        product: {
          name: "Pizza quatro queijos",
          imagePath: "1697116928341--quatro-queijos.png",
          price: 40,
        },
        quantity: 3,
        _id: "652809bda6c3ac4656a05d8b",
      },
      {
        product: {
          name: "Coca cola",
          imagePath: "1697120050760--coca-cola.png",
          price: 7,
        },
        quantity: 2,
        _id: "652809bda6c3ac4656a05d8c",
      },
    ],
  },
];

const Order = () => {
  return (
    <Container>
      <OrdersBoard icon="🕑" title="fila de espera" orders={ordersMock} />
      <OrdersBoard icon="👨‍🍳" title="Em preparação" orders={[]} />
      <OrdersBoard icon="✅" title="Pronto !" orders={[]} />
    </Container>
  );
};

export default Order;
