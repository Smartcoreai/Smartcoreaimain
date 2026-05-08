type AddonCardProps = {
  title: string;
  description: string;
  priceKr: string; // e.g. "kr 7 500"
  features: string[];
  highlight?: boolean;
  delay?: 1 | 2 | 3 | 4;
};

export default function AddonCard({
  title,
  description,
  priceKr,
  features,
  highlight = false,
  delay,
}: AddonCardProps) {
  const classes = [
    "pp-addon-card",
    "pp-fade-target",
    highlight ? "highlight" : "",
    delay ? `delay-${delay}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="pp-card-head">
        <div>
          <div className="pp-addon-title">{title}</div>
          <p className="pp-card-desc">{description}</p>
        </div>
        <div className="pp-addon-price">
          {priceKr}
          <span className="pp-unit">/mnd</span>
        </div>
      </div>
      <div className="pp-addon-features">
        {features.map((f) => (
          <div className="pp-feature-row" key={f}>
            <span className="pp-feature-check">✓</span>
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
