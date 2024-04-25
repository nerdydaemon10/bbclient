export default function Flex({
  className, 
  style, 
  direction="row", 
  justifyContent="start", 
  alignItems="start", 
  gap, 
  children
}) {
  return (
    <div 
      className={`
        d-flex flex-${direction} 
        gap-${gap} 
        ${justifyContent && `justify-content-${justifyContent}`}
        ${alignItems && `align-items-${alignItems}`} 
        ${className}`
      } 
      style={style}
    >
      {children}
    </div>
  )
}