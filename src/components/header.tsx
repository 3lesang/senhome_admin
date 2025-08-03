import AuthButton from "@/components/auth-button";
import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gray-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-2">
          <nav className="flex items-center gap-2">
            <Link to="/"></Link>
          </nav>
          <div className="flex items-center gap-2">
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
