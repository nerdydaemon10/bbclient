export function THeaders({columns}) {
  return (
    <tr>
      {columns.map((column, index) => <th key={index}>{column}</th>)}
    </tr>
  )
}

export function TDStatus({colSpan, children}) {
  return (
    <tr>
      <td className="app-td-status" colSpan={colSpan}>{children}</td>
    </tr>
  )
}