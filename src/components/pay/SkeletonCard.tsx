const SkeletonCard = () => (
  <div className="stat-card animate-pulse">
    <div className="flex items-start justify-between">
      <div className="space-y-3">
        <div className="h-3 w-20 bg-muted rounded" />
        <div className="h-7 w-32 bg-muted rounded" />
        <div className="h-3 w-16 bg-muted rounded" />
      </div>
      <div className="w-10 h-10 rounded-xl bg-muted" />
    </div>
  </div>
);

export default SkeletonCard;
