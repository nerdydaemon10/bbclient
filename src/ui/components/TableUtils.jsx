export function THeaders({headers}) {
  return (
    <tr>
      {headers.map((item, index) => <th key={index}>{item}</th>)}
    </tr>
  )
}

export function TDStatus({message, headersSize}) {
  return (
    <tr>
      <td className="app-table-td-status" colSpan={headersSize}>
        {message}
      </td>
    </tr>
  )
}