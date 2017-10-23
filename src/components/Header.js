import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import SearchBar from 'material-ui-search-bar'
import FontAwesome from 'react-fontawesome'
import dateFormat from 'dateformat';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isSearching: false };
  }

  toggleSearch = () => {
    this.setState({ isSearching: !this.state.isSearching });
    this.props.toggleSearch();
  }

  render() {
    let search = "";
    if (this.state.isSearching) {
      search = <SearchBar onChange={this.props.onMakeSearch} onRequestSearch={function(){} /*required*/} />;
    }
    
    let selectedMonth = dateFormat(this.props.selectedMonth, "mmmm yyyy");
    return (
      <div>
        <AppBar
          style={{ backgroundColor: "#F5F5F5" }}
          showMenuIconButton={false}
          title={
            <div className='header' onClick={this.props.onTitleClick}>
              <span>{selectedMonth}</span>
              <FontAwesome name='chevron-up' />
            </div>
          }
          iconElementRight={
            <div className="header action-icons">
              <div onClick={this.toggleSearch}>
                <FontAwesome name='search' size='2x' />
              </div>
              <div onClick={this.props.onToggleAddBooking}>
                <FontAwesome name='plus' size='2x' />
              </div>
            </div>
          } />
        { search }
      </div>
    );
  }
}

export default Header;
