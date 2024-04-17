function SvgIcon(props) {
  return (
    <svg
      style={{
        width: '18px',
        height: '18px',
        position: 'relative',
        fill: 'currentColor',
        paddingRight: '8px',
        verticalAlign: '-2px',
      }}
      aria-hidden='true'>
      <use xlinkHref={'#' + props.iconName} fill={props.color} />
    </svg>
  )
}
