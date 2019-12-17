import React, {Component} from 'react';
import classes from './Drawer.css';
import {NavLink} from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';


const links = [
  {to: '/', label: 'Quizzes List', exact: true},
  {to: '/auth', label: 'Authorization', exact: false},
  {to: '/quiz-creator', label: 'Create Quiz', exact: false}
]


class Drawer extends Component {

  clickHandler = () => { this.props.onClose() }


  renderLinks() {
    return links.map( (link, index) => {
      return (
        <li key={index}>
          {/* Can't use here a regular <a/> tag */}
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            
            // To close menu when wanted option selected
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }


  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) cls.push(classes.close);
      
    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
        
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}


export default Drawer;