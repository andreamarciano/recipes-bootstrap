import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

function Navbar() {
  return (
    <>
      <div className="d-none d-lg-block">
        <DesktopNavbar />
      </div>

      <div className="d-lg-none">
        <MobileNavbar />
      </div>
    </>
  );
}

export default Navbar;
