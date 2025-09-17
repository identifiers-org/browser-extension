import React from "react"
import Search from "./resolve-bar/Search"
import ReverseSearch from "./convert-bar/ReverseSearch"

export default () => (
  <div className="container-fluid">
    <div className="bg-lightgray shadow mt-4 mx-3 px-3 py-2 border rounded-3">
      <h4 className="mt-3">
        <i className="icon icon-common icon-search me-2"></i>
        Resolve a Compact Identifier
      </h4>
      <Search onButtonClick={query => open(`http://identifiers.org/${query}`, '_blank')}
            buttonCaption="Resolve"
            placeholderCaption="Enter an identifier to resolve" />
      <small><a className="text-body-tertiary ms-1 text-decoration-none mb-2" 
          href="https://www.ebi.ac.uk/ebisearch" target="_blank">
        powered by EBI Search
      </a></small>
    </div>
    
    <div className="bg-lightgray shadow mt-5 mx-3 px-3 py-2 border rounded-3">
      <h4 className="mt-3">
        <i className="icon icon-common icon-search me-2"></i>
        Convert provider URL to identifiers.org URL
      </h4>
      <ReverseSearch />
    </div>
  </div>
  
)