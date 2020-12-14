import React, {FC, ReactElement} from 'react';
import axios from 'axios'
import Restaurant from '../../model/Restaurant';

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

    React.useEffect(() => {
        axios
          .get<Restaurant[]>("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Api-Key q3MNxtfep8Gt"
              }
          })
          .then((response) => {
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

      console.log(restaurants[0]);


    if(loading) return <p>Loading...</p>
    else if(error !== '') return <p>{error}</p>
    else {

        var listItems = [];

        



        return <div></div>
    }
    
    ;

}

export default Restaurants;