import React from 'react';
import classes from './MenuToggle.css';


const MenuToggle = props => {
  const cls = [
    classes.MenuToggle,
    'fa' // icon
  ]

  if (props.isOpen) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }


  return (
    <i
      className={cls.join(' ')}

      // When onclicked, calls to onToggle prop of MenuToggle component
      onClick={props.onToggle}
    />
  )
}


export default MenuToggle;