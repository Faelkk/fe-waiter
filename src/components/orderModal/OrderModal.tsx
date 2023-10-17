import { Actions, ModalBody, OrderDetails, Overlay } from "./style";

interface orderModalProps {
  visible: boolean;
  selectedOrder: OrderType | null;
  isLoading: boolean;
  onClose: () => void;
  onCancel: () => void;
  onChangeOrderStatus: () => void;
}

import closeIcon from "../../assets/images/close-icon.svg";
import { OrderType } from "../../types/Types";
import { formatCurrency } from "../../utils/FormatCurrency";
import { useEffect } from "react";

const OrderModal = ({
  visible,
  selectedOrder,
  isLoading,
  onClose,
  onCancel,
  onChangeOrderStatus,
}: orderModalProps) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!visible || !selectedOrder) {
    return null;
  }
  const total = selectedOrder.products.reduce(
    (total, { product, quantity }) => {
      return total + product.price * quantity;
    },
    0
  );

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>{`Mesa ${selectedOrder.table} `}</strong>

          <button type="submit" onClick={onClose}>
            <img src={closeIcon} alt="icone para fechar o modal" />
          </button>
        </header>

        <div className="status-container">
          <small>status do pedido</small>
          <div>
            <span>
              {selectedOrder.status === "WAITING" && "🕑"}
              {selectedOrder.status === "IN_PRODUCTION" && "👨‍🍳"}
              {selectedOrder.status === "DONE" && "✅"}
            </span>

            <strong>
              {selectedOrder.status === "WAITING" && "Fila de espera"}
              {selectedOrder.status === "IN_PRODUCTION" && "Em preparação"}
              {selectedOrder.status === "DONE" && "Pronto"}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>itens</strong>

          <div className="order-itens">
            {selectedOrder.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  width="80"
                  height="40"
                  alt={product.name}
                  src={`http://localhost:5001/uploads/${product.imagePath}`}
                />

                <span className="quantify">{`${quantity}x`}</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {selectedOrder.status !== "DONE" && (
            <button
              disabled={isLoading}
              type="button"
              className="primary"
              onClick={onChangeOrderStatus}
            >
              {selectedOrder.status === "WAITING" ? (
                <>
                  <span>👨‍🍳</span>
                  <strong>Iniciar Produção</strong>
                </>
              ) : (
                <>
                  <span>✅</span>
                  <strong>Concluir Pedido</strong>
                </>
              )}
            </button>
          )}
          <button type="button" className="secondary" onClick={onCancel}>
            cancelar pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
};

export default OrderModal;
