import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import SearchBar from 'material-ui-search-bar'
import FontAwesome from 'react-fontawesome'
import dateFormat from 'dateformat';


const Icon = (props) => (
  <FontAwesome name={props.name} size={props.size || '2x'} />
)

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { searching: false };
  }

  toggleSearch = () => {
    this.setState({ searching: !this.state.searching });
    this.props.toggleSearch();
  }

  render() {
    let search = this.state.searching
        ? <SearchBar onChange={this.props.onMakeSearch}
                     onRequestSearch={function(){}} />
        : "";
    let selectedMonth = dateFormat(this.props.selectedMonth, "mmmm yyyy");
    return (
      <div>
        <AppBar
          style={{ backgroundColor: "#F5F5F5" }}
          showMenuIconButton={false}
          title={
            <div className='header' onClick={this.props.onTitleClick}>
              <span>{selectedMonth}</span>
              <FontAwesome name="chevron-up" />
            </div>
          }
          iconElementRight={
            <div className="header action-icons">
              <div onClick={this.toggleSearch}><Icon name='search'/></div>
              <div onClick={this.props.onToggleAddBooking}><Icon name='plus' /></div>
            </div>
          } />
        {search}
      </div>
    );
  }
}

export default Header;
