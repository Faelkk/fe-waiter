import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";
import Order from "./components/orders/Order";
import { GlobalStyles } from "./styles/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Order />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
