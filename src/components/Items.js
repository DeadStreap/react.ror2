import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Items extends Component {
    render() {
        const {item} = this.props
        return (
                <Link to={`/item/${item.name}`} className='items-card' >
                    <img src={item.img}/>
                </Link>
        )
    }


}

export {Items}
