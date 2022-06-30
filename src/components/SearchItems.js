import React from 'react'

const SearchItems = (props) => {
  let { title, description, newsUrl } = props;
  return (
    <div className="mt-3 mb-4 card container d-flex flex-column align-items-start py-3 shadow bg-light rounded">
      <h3>{title}</h3>
      <p className="fst-italic">{description}</p>
      <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-info fw-bold">Read Full Article</a>
    </div>
  )

}

export default SearchItems
