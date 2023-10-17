import styled from "styled-components";

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background: #fff;
  width: 30rem;
  border-radius: 0.5rem;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 1.5rem;
    }

    button {
      border: 0;
      background: transparent;
      line-height: 0;
    }
  }

  .status-container {
    margin-top: 2rem;

    small {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    div {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-top: 0.5rem;
    }
  }
`;

export const OrderDetails = styled.div`
  margin-top: 2rem;

  > strong {
    font-weight: 500;
    font-size: 0.875rem;
    opacity: 0.8;
  }

  .order-itens {
    margin-top: 1rem;

    .item {
      display: flex;

      & + .item {
        margin-top: 1rem;
      }

      img {
        border-radius: 6px;
      }

      .quantify {
        font-size: 0.875rem;
        color: #666;
        display: block;
        min-width: 20px;
        margin-left: 0.75rem;
      }

      .product-details {
        margin-left: 0.25rem;
        strong {
          display: block;
          margin-bottom: 4px;
        }

        span {
          font-size: 0.875rem;
          color: #666;
        }
      }
    }
  }
  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;

    span {
      font-size: 0.875rem;
      opacity: 0.8;
      font-weight: 500;
    }
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    background: #333;
    border-radius: 3rem;
    border: 0;
    color: #fff;
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    gap: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .secondary {
    padding: 0.875rem 1.5rem;
    color: #d73035;
    border: none;
    font-weight: bold;
    background: transparent;
    margin-top: 0.75rem;
  }
`;
