import Header from "./components/header/Header";
import Order from "./components/orders/Order";
import { GlobalStyles } from "./styles/GlobalStyles";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Order />
    </>
  );
};

export default App;
