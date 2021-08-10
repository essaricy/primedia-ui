import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { styles } from './SearchStyles';
import * as SearchActions from '../../search/actions/SearchActions';
import * as SearchSelectors from '../../search/selectors/SearchSelectors';

const useStyles = makeStyles((theme) => styles(theme));

function Search(props) {
  const classes = useStyles();
  const history = useHistory();

  const { mode, searchingText } = props;
  const { onSearchValueChange, onSearch } = props;

  const onChange = (e) => onSearchValueChange(e.target.value)
  const onSubmit = (e) => e.key === 'Enter' && onSearch(mode, searchingText, history);

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        value={searchingText}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChange}
        onKeyDown={onSubmit}
      />
    </div>
  );
}

const mapState = state => {
  return {
    searchingText: SearchSelectors.getSearchingText(state)
  };
};

const mapActions = {
  onSearchValueChange: SearchActions.onSearchValueChange,
  onSearch: SearchActions.onSearch
};

const SearchContainer = connect(mapState, mapActions)(Search);
export default SearchContainer;
