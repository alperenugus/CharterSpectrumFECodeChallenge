import React, {FC, ReactElement} from 'react';
import './RestaurantsListItem.css'
import Restaurant from '../../model/Restaurant';

interface RestaurantProps {
    restaurant: Restaurant;
}

const RestaurantsListItem : FC<RestaurantProps> = ({restaurant}: RestaurantProps) : ReactElement => {
    return(
        <tr>
            <td>{restaurant.name}</td>
            <td>{restaurant.city}</td>
            <td>{restaurant.state}</td>
            <td>{restaurant.telephone}</td>
            <td>{restaurant.genre}</td>
        </tr>
    );

}

export default RestaurantsListItem;