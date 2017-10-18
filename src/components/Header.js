import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FontAwesome from 'react-fontawesome'
import SearchBar from 'material-ui-search-bar'
import dateFormat from 'dateformat';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.state = { searching: false };
  }

  toggleSearch() {
    this.setState({ searching: !this.state.searching });
  }

  render() {
    let search = this.state.searching
        ? <SearchBar onChange={this.props.onMakeSearch}
                     onRequestSearch={this.props.onMakeSearch} />
        : "";
    let selectedMonth = dateFormat(this.props.selectedMonth, "mmmm yyyy");
    return (
      <div>
        <AppBar
          style={{ backgroundColor: "#F5F5F5" }}
          className='header'
          showMenuIconButton={false}
          title={
            <div onClick={this.props.onTitleClick}>
              <span style={{ color: "black" }}>{selectedMonth}</span>
              <FontAwesome name="chevron-up" style={{ color: "blue", fontSize: ".75em" }} />
            </div>
          }
          iconElementRight={
            <div>
              <div onClick={this.toggleSearch}><Icon name='search'/></div>
              <div><Icon name='plus' /></div>
            </div>
          } />
        {search}
      </div>
    );
  }
}

const Icon = (props) => (
  <FontAwesome name={props.name} size={props.size || '2x'} style={{ color: "blue" }} />
)

export default Header;
