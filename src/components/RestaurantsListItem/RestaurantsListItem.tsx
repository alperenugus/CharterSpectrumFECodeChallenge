import React, {FC, ReactElement} from 'react';
import './RestaurantsListItem.css'
import Restaurant from '../../models/Restaurant';

interface RestaurantProps {
    index: number;
    restaurant: Restaurant;
}

const RestaurantsListItem : FC<RestaurantProps> = ({index, restaurant}: RestaurantProps) : ReactElement => {
    return(
        <tr>
            <td>{index + 1}.&ensp;{restaurant.name}</td>
            <td>{restaurant.city}</td>
            <td>{restaurant.state}</td>
            <td>{restaurant.telephone}</td>
            <td>{restaurant.genre}</td>
        </tr>
    );

}

export default RestaurantsListItem;