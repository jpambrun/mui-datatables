import React from 'react';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';

const defaultSearchStyles = theme => ({
  main: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginRight: '8px',
  },
  searchText: {
    flex: '0.8 0',
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
});

class TableSearch extends React.Component {
  state = {
    value: ''
  };

  constructor(props) {
    super(props);

    this.initializeState();
  }

  initializeState = () => {
    if (this.props.options.userState.searchText) {
      this.state.value = this.props.options.userState.searchText;
    }
  };

  handleTextChange = (event) => {
    const { value } = event.target;
    const { onSearchChange } = this.props.options;

    if (onSearchChange) {
      onSearchChange(value);
    }

    this.props.onSearch(value);

    this.setState({ value: event.target.value });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.onHide();
    }
  };

  render() {
    const { classes, options, onHide } = this.props;
    const { value } = this.state;

    console.log('search', 'render', value);

    return (
      <Grow appear in={true} timeout={300}>
        <div className={classes.main} ref={el => (this.rootRef = el)}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            className={classes.searchText}
            autoFocus={true}
            InputProps={{
              'aria-label': options.textLabels.toolbar.search,
            }}
            onChange={this.handleTextChange}
            fullWidth={true}
            inputRef={el => (this.searchField = el)}
            value={value}
          />
          <IconButton className={classes.clearIcon} onClick={onHide}>
            <ClearIcon />
          </IconButton>
        </div>
      </Grow>
    );
  }
}

export default withStyles(defaultSearchStyles, { name: 'MUIDataTableSearch' })(TableSearch);
