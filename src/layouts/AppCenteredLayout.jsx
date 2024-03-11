//import "./AppDashboardLayout.css"

const style = { height: "100vh" }

function AppCenteredLayout({children}) {
  return (
    <div 
      className="w-100 d-flex justify-content-center align-items-center" 
      style={style}
    >
      {children}
    </div>
  )
}

export default AppCenteredLayout