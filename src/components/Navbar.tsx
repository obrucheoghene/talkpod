import logo from '../assets/talkpod-logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="nav-content">
      <div className="logo">
        <img src={logo} alt="Talkpod Logo" />
      </div>
      <div className="menu">
        <button

          className="btn-border"
        >
          Sign In
        </button>
        <button
          className="btn-full ml-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  </nav>
  )
}

export default Navbar