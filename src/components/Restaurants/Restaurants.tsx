import React, {FC, ReactElement} from 'react';
import './Restaurants.css';
import axios from 'axios';
import Restaurant from '../../model/Restaurant';
import RestaurantsListItem from '../RestaurantsListItem/RestaurantsListItem';
import Search from '../Search/Search';

const defaultRestaurants: Restaurant[] = [];


const Restaurants : FC = (props) : ReactElement => {

    const [restaurants, setRestaurants]: [Restaurant[], (restaurants: Restaurant[]) => void] = React.useState(
        defaultRestaurants
      );

    const [loading, setLoading]: [
        boolean,
        (loading: boolean) => void
    ] = React.useState<boolean>(true);

    const [error, setError]: [string, (error: string) => void] = React.useState(
        ''
    );

    const [searchString, setsearchString]: [string, (searchString: string) => void] = React.useState(
        ''
    );

    React.useEffect(() => {
        axios
          .get<Restaurant[]>("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Api-Key q3MNxtfep8Gt"
              }
          })
          .then((response) => {
            // Sort alphabetically
            response.data.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
            setRestaurants(response.data);
            setLoading(false);
          })
          .catch(ex => {
            const error =
            ex.response.status === 404
              ? "Resource not found"
              : "An unexpected error has occurred";
            setError(error);
            setLoading(false);
          });
      }, []);

    //   console.log(restaurants[0]);

    const handleSearch = (str: string) => {
        setsearchString(str);
        console.log("Search string is:" + str)
    }


    if(loading) return <p>Loading...</p>
    else if(error !== '') return <p>{error}</p>
    else {

        var listItems = [];

        if(searchString === ''){
            listItems = restaurants.map((listItem, index) => {
                return <RestaurantsListItem key={listItem.telephone.toString()} restaurant={listItem}></RestaurantsListItem>
            })
        }
        else{
            listItems = restaurants.filter(listItem => 
                listItem.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1 ||
                listItem.city.toLowerCase().indexOf(searchString.toLowerCase()) > -1 ||
                listItem.genre.toLowerCase().indexOf(searchString.toLowerCase()) > -1
            ).map((listItem, index) => {
                return <RestaurantsListItem key={listItem.telephone.toString()} restaurant={listItem}></RestaurantsListItem>
            })
        }

        if(listItems.length === 0){
            return (<div>
                        <Search search='' onSearch={handleSearch}></Search>
                        No results were found.
                    </div>
            );
        }

        return (
            <div>
                <Search search='' onSearch={handleSearch}></Search>
                <table>
                    <tbody>{listItems}</tbody>
                </table>
            </div>
        );
    };

}

export default Restaurants;