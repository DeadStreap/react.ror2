import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Characters extends Component {
    render() {
        const {item} = this.props
        return (
                <Link to={`/character/${item.name}`} className='characters-card' >
                    <img src={item.img}/>
                    <p>{item.name}</p>
                </Link>
        )
    }


}

export { Characters }
