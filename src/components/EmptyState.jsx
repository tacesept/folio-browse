export default function EmptyState({ search }) {
  return (
    <div className="rounded-lg border border-dashed border-border py-20 text-center">
      <p className="text-secondary">
        No portfolios found for{" "}
        <span className="font-medium text-primary">"{search}"</span>
      </p>

      <p className="mt-2 text-muted">
        Try searching for a different name or role.
      </p>
    </div>
  );
}
