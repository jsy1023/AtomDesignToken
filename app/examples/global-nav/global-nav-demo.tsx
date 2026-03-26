import { Navigation, NavBrand, NavList, NavItem } from "@/app/templates/Navigation/Navigation";

export default function GlobalNavDemo() {
  return (
    <div className="w-full border border-[var(--color-border-standard)] rounded overflow-hidden">
      <Navigation>
        <NavBrand href="#">
          <span className="font-bold text-[var(--color-text-title)]">AtomSystem</span>
        </NavBrand>
        <NavList>
          <NavItem href="#">Home</NavItem>
          <NavItem href="#">Docs</NavItem>
          <NavItem href="#">GitHub</NavItem>
        </NavList>
      </Navigation>
    </div>
  );
}
