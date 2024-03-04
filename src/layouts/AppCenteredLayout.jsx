//import "./AppDashboardLayout.css"

function AppCenteredLayout({children}) {
  return (
    <div 
      className="w-100 d-flex justify-content-center align-items-center" 
      style={{
        height: "100vh"
    }}>
      {children}
    </div>
  )
}

export default AppCenteredLayout