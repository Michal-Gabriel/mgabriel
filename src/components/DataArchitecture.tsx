const rowY = [180, 290, 400, 510];
const sources = [
  ["Commerce database", "orders · order_items"],
  ["CRM & profiles", "customers · contacts"],
  ["Product catalog", "products · variants"],
  ["Billing & events", "payments · refunds"],
];
const bronze = [
  ["orders / orders_v2", "orders_fix / backfill"],
  ["customers / profiles", "contacts_export / legacy"],
  ["products / products_v3", "variants / catalog_sync"],
  ["payments / payments_fix", "refunds_raw / events"],
];
const silver = [
  ["orders + order_items", "Aligned IDs & timestamps"],
  ["customers", "Deduplicated profiles"],
  ["products + variants", "Standardised catalog"],
  ["payments + refunds", "Validated transactions"],
];
const marts = [
  ["Sales", "Orders × items × payments"],
  ["Customer analytics", "Customers × orders"],
  ["Product analytics", "Products × order items"],
  ["Finance", "Payments × refunds"],
];
const gold = [
  ["Entities", "Orders · customers · products"],
  ["Shared KPIs", "Revenue · repeat purchase"],
  ["Aggregates", "Daily sales · customer value"],
  ["Beyond", "Dashboards & AI answers"],
];
const layers = [
  { x: 210, title: "Bronze layer", subtitle: "Preserve the source", color: "#d6a77c", note: ["Raw copies, versions, exports.", "Keep the original detail."] },
  { x: 450, title: "Silver layer", subtitle: "Clean & standardise", color: "#b9c8da", note: ["Consistent IDs and formats.", "Reliable tables, ready to join."] },
  { x: 690, title: "Platinum layer", subtitle: "Model for the business", color: "#a99be3", note: ["Join across source systems.", "Build models for each function."] },
  { x: 930, title: "Gold layer", subtitle: "One shared truth", color: "#e8c77d", note: ["Agreed definitions and metrics.", "One place for every answer."] },
];

function Node({ x, y, lines, color }: { x: number; y: number; lines: string[]; color: string }) {
  return <g>
    <rect x={x} y={y} width={180} height={76} rx={10} fill={color} fillOpacity="0.09" stroke={color} strokeOpacity="0.55" />
    <text x={x + 90} y={y + 29} textAnchor="middle" fill="#e0e7f1" fontSize="12" fontWeight="600">{lines[0]}</text>
    <text x={x + 90} y={y + 51} textAnchor="middle" fill="#a6b4c8" fontSize="10">{lines[1]}</text>
  </g>;
}

export default function DataArchitecture() {
  return (
    <figure className="story-architecture" id="data-architecture">
      <div className="architecture-intro"><span className="story-eyebrow">From source data to shared answers</span><span className="architecture-scroll-hint">Scroll horizontally to explore →</span></div>
      <div className="architecture-scroll" tabIndex={0} role="region" aria-label="Data architecture diagram; scroll horizontally to explore all layers">
        <svg className="architecture-diagram" viewBox="0 0 1170 720" role="img" aria-labelledby="architecture-title architecture-desc">
          <title id="architecture-title">Source systems → Bronze → Silver → Platinum → Gold</title>
          <desc id="architecture-desc">Illustrative architecture for orders, customers, products and payments. Bronze preserves raw source tables. Silver cleans and standardises them. Platinum joins data across sources into sales, customer, product and finance models. Gold provides shared entities, KPIs and aggregates for Beyond dashboards and AI answers.</desc>
          <defs><marker id="architecture-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#7b8fa8" /></marker></defs>
          <text x="10" y="44" fill="#7dd3e8" fontSize="17" fontWeight="600">Source systems</text>
          <text x="10" y="70" fill="#a6b4c8" fontSize="11">Different features. Different tables.</text>
          {layers.map(layer => <g key={layer.title}>
            <text x={layer.x + 10} y="44" fill={layer.color} fontSize="17" fontWeight="600">{layer.title}</text>
            <text x={layer.x + 10} y="70" fill="#a6b4c8" fontSize="11">{layer.subtitle}</text>
            <rect x={layer.x} y="95" width="220" height="530" rx="16" fill={layer.color} fillOpacity="0.035" stroke={layer.color} strokeOpacity="0.35" />
            <text x={layer.x + 16} y="665" fill="#a6b4c8" fontSize="11">{layer.note[0]}</text>
            <text x={layer.x + 16} y="684" fill="#a6b4c8" fontSize="11">{layer.note[1]}</text>
          </g>)}
          <g fill="none" stroke="#7b8fa8" strokeWidth="1.4" markerEnd="url(#architecture-arrow)">
            {rowY.map(y => <g key={y}><path d={`M190 ${y+38} H230`} /><path d={`M410 ${y+38} H470`} /><path d={`M650 ${y+38} H710`} />{y !== 510 && <path d={`M890 ${y+38} H950`} />}</g>)}
            <path d="M650 218 C680 218 680 328 710 328" />
            <path d="M650 218 C675 218 685 438 710 438" />
            <path d="M650 548 C678 548 682 218 710 218" />
            <path d="M890 328 C917 328 921 218 950 218" />
            <path d="M890 438 C917 438 921 328 950 328" />
            <path d="M890 548 C917 548 921 438 950 438" />
            <path d="M1040 256 V290" />
            <path d="M1040 366 V400" />
            <path d="M1040 476 V510" />
          </g>
          <text x="250" y="133" fill="#d6a77c" fontSize="10" letterSpacing="1.5">RAW REPLICATION</text>
          <text x="490" y="133" fill="#b9c8da" fontSize="10" letterSpacing="1.5">CLEANING / ETL</text>
          <text x="730" y="133" fill="#a99be3" fontSize="10" letterSpacing="1.5">BUSINESS MODELS</text>
          <text x="970" y="133" fill="#e8c77d" fontSize="10" letterSpacing="1.5">SHARED DEFINITIONS</text>
          {rowY.map((y, i) => <g key={y}>
            <Node x={10} y={y} lines={sources[i]} color="#7dd3e8" />
            <Node x={230} y={y} lines={bronze[i]} color="#d6a77c" />
            <Node x={470} y={y} lines={silver[i]} color="#b9c8da" />
            <Node x={710} y={y} lines={marts[i]} color="#a99be3" />
            <Node x={950} y={y} lines={gold[i]} color="#e8c77d" />
          </g>)}
        </svg>
      </div>
      <figcaption><strong>Many sources. One shared truth.</strong> An illustrative view of the layers: preserve the raw data, clean it, connect it into business models, then publish shared definitions. Table names and business models are examples.</figcaption>
    </figure>
  );
}
