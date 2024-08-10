export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="p-4 border-b">
      <h4>{title}</h4>
      <span className="text-muted-foreground">{subtitle}</span>
    </header>
  );
}
