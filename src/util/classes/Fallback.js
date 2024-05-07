import { isEmpty } from "lodash"

export default class Fallback {}

Fallback.checkMeta = (data) => {
  const option = { current_page: 1, last_page: 1 }

  if (isEmpty(data)) return option
  if (isEmpty(data.meta)) return option

  return data.meta
}