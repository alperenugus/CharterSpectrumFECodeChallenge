import React, {FC, ReactElement, useEffect} from 'react';
import './Search.css'


interface SearchProps {
    search: string;
    onSearch: Function;
}

const Search : FC<SearchProps> = ({search, onSearch}: SearchProps) : ReactElement => {

    const [searchString, setsearchString]: [string, (searchString: string) => void] = React.useState(
        ''
    );

    useEffect(() => {
        handleSearch();
    })

    // Using the props from the parent component, search through items for the searchString
    const handleSearch = () => {
        onSearch(searchString);
    }

    return (
        <div className="d-flex justify-content-center">
            <form className="form-group"  onSubmit={(e) => { e.preventDefault(); }}>
                <input
                    id='search-input'
                    type='text'
                    className='form-control'
                    placeholder='Search'
                    style={{ padding: 20, margin: 10 }}
                    onChange={(text) => { setsearchString(text.target.value); }}
                />
            </form>
        </div>
    )

}

export default Search;