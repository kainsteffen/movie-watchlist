import React from "react";
import ReactDOM from "react-dom";

import movieList from "./movies.json";
import AutoCompleteText from './AutoCompleteText';



  const element = (
<div>
<AutoCompleteText />
</div>
  );
  ReactDOM.render(element, document.getElementById('root'));
