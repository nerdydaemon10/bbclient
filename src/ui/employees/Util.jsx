import { Fragment } from "react"
import { BiSolidCheckCircle } from "react-icons/bi"

import { compareEntity, truncate } from "../../util/helper.js"
import Role from "../../util/classes/Role.js"
import Status from "../../util/classes/Status.js"

export function FullNameRenderer({item, user}) {  
  const fullName = truncate(item.full_name)

  return (
    <Fragment>
      {fullName}
      {compareEntity(item, user) && <span className="ms-1">(You)</span>}
      {Role.isAdmin(item.role_id) && <span className="ms-1"><BiSolidCheckCircle/></span>}
    </Fragment>
  )
}

export function StatusRenderer({item}) {
  const status =  Status.toObject(item.status)
  
  return (
    <span className={`badge ${status.badge}`}>
      <span className="me-1">{status.icon}</span>
      {status.name}
    </span>
  )
}