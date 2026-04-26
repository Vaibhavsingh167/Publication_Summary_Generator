import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function AppNavbar() {
  return (
    <Navbar
      variant="dark"
      expand="lg"
      sticky="top"
      className="app-navbar"
      id="main-navbar"
    >
      <Container>
        <Navbar.Brand href="#" className="navbar-brand-custom">
          <span className="brand-icon">📊</span>
          <span className="brand-subtitle">CurateCite</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
