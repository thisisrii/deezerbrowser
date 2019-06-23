import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { searchForSuggestions } from '../../services/SearchService';
import { Button, Grid } from '@material-ui/core';

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.artist, query);
  const parts = parse(suggestion.artist, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

async function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let names = [];
  /* DO API CALL HERE */

  if (inputLength <= 3)
    return [];
  else {
    let array = await searchForSuggestions(value);
    for (let x in array) {
      await names.push({ 'artist': array[x].name })
    }
  }

  return names;
}

function getSuggestionValue(suggestion) {
  return suggestion.artist;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 90,
    flexGrow: 1,
    marginTop: 35,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  button: {
    padding: '10px 30px',
  }
}));

export default function AutoCompleteSearch(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    single: '',
  });
  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then((response) => {
      setSuggestions(response);
    });

  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue,
    });
  };

  const handleSearch = () => {
    console.log('searching....')
    props.handleSearch(state['single']);

  }

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              id: 'search',
              label: 'Search for Album',
              placeholder: 'Search here',
              value: state.single,
              onChange: handleChange('single'),
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={suggestions => (
              <Paper {...suggestions.containerProps} square>
                {suggestions.children}
              </Paper>
            )}
          />
        </Grid>
        <Grid item xs>
          <Button className={classes.button} variant="contained" color="primary" onClick={handleSearch}>Search</Button>
        </Grid>
      </Grid>
    </div>
  );
}