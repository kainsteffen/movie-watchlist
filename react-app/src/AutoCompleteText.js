import React from 'react';

export default class AutoCompleteText extends React.Component {
    constructor (props){
        super(props);
        this.items = [
          'David',
          'Damien',
          'Franz',
          'Max'
        ];
        this.state = {
          suggestions: [],

        }
      }


onTextChanged = (e) => {
const value = e.target.value;
let suggestions = [];
if (value.length > 0){
  const regex = new RegExp('${value}','i');
  console.log({value});
  const suggestions = this.items.sort().filter(v => regex.test(v));
  console.log(suggestions);
}
this.setState(() => ({ suggestions}));
}

renderSuggestions (){
  const {suggestions} = this.state;
  if (suggestions.length === 0) {
    return null;
  }
  return (
    <ul>
<li> Hello </li>
      {suggestions.map((item) => <li>{item}</li>)}

    </ul>
  );
}

      render () {
        return (
          <div>
          <input onChange={this.onTextChanged} type ="text"/>
          {this.renderSuggestions()}
          </div>
        )
      }
}
