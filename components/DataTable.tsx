export function DataTable({ rows, columns }: { rows: any[]; columns: { key: string; label: string }[] }) {
  return (
    <div className="table-wrap card">
      <table className="table">
        <thead><tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr></thead>
        <tbody>{rows.length ? rows.map((row, i) => <tr key={row._id || i}>{columns.map((c) => <td key={c.key}>{String(row[c.key] ?? "")}</td>)}</tr>) : <tr><td colSpan={columns.length}><div className="empty">No records yet.</div></td></tr>}</tbody>
      </table>
    </div>
  );
}
