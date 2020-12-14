import React, {FC, ReactElement} from 'react';

interface SearchProps {
    search: string;
    onSearch: Function;
}

const Search : FC<SearchProps> = ({search, onSearch}: SearchProps) : ReactElement => {

    const [searchString, setsearchString]: [string, (searchString: string) => void] = React.useState(
        ''
    );

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
                    onChange={(text) => { setsearchString(text.target.value); handleSearch();}}
                />
            </form>
        </div>
    )

}

export default Search;