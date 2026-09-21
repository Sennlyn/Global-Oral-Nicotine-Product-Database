import { Atom, Candy, CircleDot, Layers3, Leaf, Package, PanelsTopLeft, Pill, ScanLine, Shapes } from "lucide-react";
import type { Category } from "@/types/catalog";

export function TaxonomyIcon({ type, size = 27 }: { type: Category["icon"]; size?: number }) {
  const props = { size, strokeWidth: 1.55 };
  const icons = { pouch: <Package {...props}/>, film: <PanelsTopLeft {...props}/>, gum: <CircleDot {...props}/>, candy: <Candy {...props}/>, lozenge: <ScanLine {...props}/>, tablet: <Pill {...props}/>, solid: <Shapes {...props}/>, snus: <Layers3 {...props}/>, tobacco: <Leaf {...props}/>, other: <Atom {...props}/> };
  return icons[type];
}
