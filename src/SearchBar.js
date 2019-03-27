import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zipCode: props.zipCode
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.zipCode);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={this.onFormSubmit}>
          <label style={{ display: 'block' }}>Enter Zip Code</label>
          <input type="text"
                 value={this.state.zipCode}
                 onChange={(e) => this.setState({ zipCode: e.target.value }) } />
        </form>
      </div>
    );
  }
}

export default SearchBar;