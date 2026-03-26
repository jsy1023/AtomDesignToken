import { Badge } from "@/app/templates/Badge/Badge";

export default function BadgeTinted() {
  return (
    <div className="flex gap-3 flex-wrap items-center justify-center">
      <Badge color="primary" type="tint">Primary</Badge>
      <Badge color="secondary" type="tint">Secondary</Badge>
      <Badge color="warning" type="tint">Warning</Badge>
      <Badge color="danger" type="tint">Danger</Badge>
    </div>
  );
}
