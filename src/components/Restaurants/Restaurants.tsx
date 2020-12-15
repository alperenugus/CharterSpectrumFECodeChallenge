import React, { FC, ReactElement } from 'react';
import './Restaurants.css';
import axios from 'axios';
import Restaurant from '../../model/Restaurant';
import RestaurantsListItem from '../RestaurantsListItem/RestaurantsListItem';
import Search from '../Search/Search';
import states from '../../constants/states';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import genres from '../../constants/genres';
import Pagination from 'react-bootstrap/Pagination'


const defaultRestaurants: Restaurant[] = [];


const Restaurants: FC = (props): ReactElement => {

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

    const [stateFilter, setstateFilter]: [string, (stateFilter: string) => void] = React.useState(
        'ALL'
    );

    const [genreFilter, setgenreFilter]: [string, (genreFilter: string) => void] = React.useState(
        'ALL'
    );

    const [pageNum, setpageNum]: [number, (setpageNum: number) => void] = React.useState(
        1
    );

    const dropDownStates = states.map((state, index) => {
        return <Dropdown.Item eventKey={state}>{state}</Dropdown.Item>
    })

    const dropDownGenres = genres.map((genre, index) => {
        return <Dropdown.Item eventKey={genre}>{genre}</Dropdown.Item>
    })

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
                response.data.sort(function (a, b) {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
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
        if (str == null) str = '';
        setsearchString(str);
    }

    const handleStateFilter = (str: any) => {
        if (str == null) str = '';
        setstateFilter(str);
    }

    const handleGenreFilter = (str: any) => {
        if (str == null) str = '';
        setgenreFilter(str);
    }

    const handlePagination = (page: number) => {
        window.scrollTo(0, 0);
        setpageNum(page - 1);
    }

    if (loading) return <p>Loading...</p>
    else if (error !== '') return <p>{error}</p>
    else {

        var listItems = [];

        if (searchString === '' && (stateFilter === '' || stateFilter === 'ALL') && (genreFilter === '' || genreFilter === 'ALL')) {
            listItems = restaurants.map((listItem, index) => {
                return <RestaurantsListItem index={index} key={listItem.telephone.toString()} restaurant={listItem}></RestaurantsListItem>
            })
        }
        else {
            listItems = restaurants.filter(listItem =>

            (
                (
                    searchString === '' ||
                    listItem.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1 ||
                    listItem.city.toLowerCase().indexOf(searchString.toLowerCase()) > -1 ||
                    listItem.genre.toLowerCase().indexOf(searchString.toLowerCase()) > -1
                )

                &&

                (
                    stateFilter === 'ALL' ||
                    listItem.state.toLowerCase().indexOf(stateFilter.toLowerCase()) > -1
                )

                &&

                (
                    genreFilter === 'ALL' ||
                    listItem.genre.toLowerCase().indexOf(genreFilter.toLowerCase()) > -1
                )

            )
            ).map((listItem, index) => {
                return <RestaurantsListItem index={index} key={listItem.telephone.toString()} restaurant={listItem}></RestaurantsListItem>
            })
        }

        let items = [];
        for (let number = 1; number <= listItems.length / 10 + 1; number++) {
            items.push(
                <Pagination.Item key={number} onClick={() => {handlePagination(number)}}>
                    {number}
                </Pagination.Item>,
            );
        }

        var paginatedListItems = listItems.slice( pageNum * 10, (pageNum * 10) + 10);

        if (listItems.length === 0) {
            return (<div style={{textAlign: "center"}}>
                <Search search='' onSearch={handleSearch}></Search>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>
                                <DropdownButton
                                    alignRight
                                    title={`State: ` + stateFilter}
                                    id="dropdown-menu-align-right"
                                    onSelect={handleStateFilter}
                                >
                                    {dropDownStates}
                                </DropdownButton>
                            </th>
                            <th>Phone</th>
                            <th>
                                <DropdownButton
                                    alignRight
                                    title={`Genre: ` + genreFilter}
                                    id="dropdown-menu-align-right"
                                    onSelect={handleGenreFilter}
                                >
                                    {dropDownGenres}
                                </DropdownButton>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{listItems}</tbody>
                </table>
                        No results were found.
            </div>
            );
        }

        return (
            <div>
                <Search search='' onSearch={handleSearch}></Search>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>
                                <DropdownButton
                                    alignRight
                                    title={`State: ` + stateFilter}
                                    id="dropdown-menu-align-right"
                                    onSelect={handleStateFilter}
                                >
                                    {dropDownStates}
                                </DropdownButton>
                            </th>
                            <th>Phone</th>
                            <th>
                                <DropdownButton
                                    alignRight
                                    title={`Genre: ` + genreFilter}
                                    id="dropdown-menu-align-right"
                                    onSelect={handleGenreFilter}
                                >
                                    {dropDownGenres}
                                </DropdownButton>
                            </th>
                        </tr>
                    </thead>
                    {paginatedListItems.length > 0 &&
                        <tbody>{paginatedListItems}</tbody>
                    }
                </table>

                <Pagination>{items}</Pagination>
            </div>
        );
    };

}

export default Restaurants;