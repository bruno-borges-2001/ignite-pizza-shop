import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import AccountMenu from "./account-menu";
import NavLink from "./nav-link";
import { ModeToggle } from "./theme/mode-toggle";
import { Separator } from "./ui/separator";

export default function Header() {
  return (
    <header className="sticky top-0 border-b border-border">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/" label="Início" icon={Home} />
          <NavLink to="/orders" label="Pedidos" icon={UtensilsCrossed} />
        </nav>

        <div className="ml-auto flex items-center justify-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
