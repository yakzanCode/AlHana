import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <Link className="nav-link" to="/">
        <h1 className='text-center my-3 mb-0' style={{ fontSize: "40px" }}>Al Hana Kitchen</h1>
        <p className='text-center text-muted'>=flavors of home=</p>
      </Link>

      <nav className="navbar navbar-expand-md border-dark border border-end-0 border-start-0">
        <div className="d-flex mx-auto text-center px-5">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link mx-4 mx-md-5" to={{ pathname: "/", hash: "#dishes" }}>Dishes</Link>
          <Link className="nav-link" to={{ pathname: "/", hash: "#about" }}>About Us</Link>
          <Link className="nav-link ms-4 ms-md-5" to="/contact">Contact</Link>
        </div>
      </nav>
    </>
  );
}
