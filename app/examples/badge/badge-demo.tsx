import { Badge } from "@/app/templates/Badge/Badge";

export default function BadgeDemo() {
  return (
    <div className="flex gap-3 flex-wrap items-center justify-center">
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="danger">Danger</Badge>
    </div>
  );
}
