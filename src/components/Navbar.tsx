import { Link, useLocation } from "react-router-dom";
import logoDeGreenSci from "@/assets/logo-degreensci.png";
import { WalletConnectButton } from "./WalletConnectButton";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img src={logoDeGreenSci} alt="DeGreenSci" className="h-12 w-12" />
            <span className="text-xl font-bold text-foreground">DeGreenSci</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Upload
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
