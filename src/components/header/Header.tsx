import logo from "../../assets/images/logo.svg";
import { Container, Content, SubTitleHead, TitleHead } from "./Style";

const Header = () => {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <TitleHead>pedidos</TitleHead>
          <SubTitleHead>Acompanhe os pedidos dos clientes</SubTitleHead>
        </div>
        <img src={logo} alt="WAITERAPP" />
      </Content>
    </Container>
  );
};

export default Header;
