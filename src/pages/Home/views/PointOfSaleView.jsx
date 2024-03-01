import { useDispatch, useSelector } from "react-redux"
import AppLocalStorage from "../../../utils/AppLocalStorage.jsx"

function PointOfSaleView() {
  const { user } = useSelector((state) => state.auth)
  
  return (
    <>
      <h1 className="app-text-title">{user.full_name}</h1>
      <p className="app-text-title-caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>  
    </>
  )
}

export default PointOfSaleView