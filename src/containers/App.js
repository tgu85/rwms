import { members } from '../Members.js';
import React, { Component } from 'react';
import Searchbox from "../components/Searchbox";
import CardList from "../components/CardList";


//this App displays the members (robots) and the searchbox from the example of udemy
class MembersList extends Component {
  constructor() {
    super()
    this.state = {
      members: members,
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    //console.log(filterMembers);
  }
  render () {
    const filteredMembers = this.state.members.filter(member => {
      return member.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    return (
        <div className='tc'>
          <h1>Members</h1>
          <Searchbox searchChange={this.onSearchChange}/>
          <CardList members={filteredMembers}/>
        </div>
    );
  }
}

export default MembersList;
