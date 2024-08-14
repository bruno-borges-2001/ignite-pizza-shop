import type { IconType } from "@/@types/utils";
import { Link, useLocation, type LinkProps } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  label: string;
  icon: IconType;
}

export default function NavLink({ label, icon: Icon, ...rest }: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      {...rest}
      data-active={rest.to === pathname}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
    >
      <Icon className="h-4 w-4" /> {label}
    </Link>
  );
}
