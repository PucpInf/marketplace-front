/**
 * header search widget
 */
import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';

import {Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import AutoSuggest from 'react-autosuggest';

class SearchBox extends React.Component {

   state = {
      isSearchFormOpen: false,
      value: this.props.currentRefinement,
   };

   onChange = (event, { newValue }) => {
      if (!newValue) {
         this.props.onSuggestionCleared();
      }

      this.setState({
         value: typeof newValue !== 'undefined' ? newValue : '',
     });
   };
  
    onSuggestionsFetchRequested = ({ value }) => {
      this.props.refine(value);
    };
  
    onSuggestionsClearRequested = () => {
      this.props.refine();
    };
  
    getSuggestionValue(hit) {
      return hit.name;
    }
  
    renderSuggestion(hit) {
      return  (
               <Link to={`/products/detail/${hit.id}`} className='d-block'>
                  <Highlight attribute="title" hit={hit} tagName="title" />
               </Link>
               );
    }
    

   /**
    * Method To Handle Search Form 
    */
   handleSearchForm(isOpen) {
      this.setState({ isSearchFormOpen: isOpen });
   };

   render() {
      const { isSearchFormOpen , value} = this.state;
      const { hits , onSuggestionSelected} = this.props;

      const inputProps = {
         placeholder: 'Search for a product...',
         onChange: this.onChange,
         value,
      };
      return (
         <div className={classNames("iron-search-box ", { 'active-search-form': isSearchFormOpen })}>
            <IconButton
               onClick={() => this.handleSearchForm(true)}
               color="inherit"
               className="search-icon"
            >
               <SearchIcon />
            </IconButton>

            <div className="search-form px-15 justify-content-between align-items-center" >
               <div className="input-wrap">
                  {/* <Input
                     fullWidth
                     placeholder="Search and hit enter"
                     disableUnderline
                  /> */}
                  <AutoSuggest
                     suggestions={hits}
                     onSuggestionSelected={onSuggestionSelected}
                     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                     onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                     getSuggestionValue={this.getSuggestionValue}
                     renderSuggestion={this.renderSuggestion}
                     inputProps={inputProps}
                  />
               </div>
               <IconButton
                  onClick={() => this.handleSearchForm(false)}
                  className="close-btn"
               >
                  <i className="material-icons">
                     close
                        </i>
               </IconButton>
            </div>

         </div>
      );
   }
}

export default connectAutoComplete(SearchBox);