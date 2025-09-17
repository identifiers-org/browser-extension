import React, {useState} from "react";
import ReverseSearchMatch from "./ReverseSearchMatch";
import config from "../config";

const isUrl = (str: string) => {
  if (!str || !str.startsWith("http")) { return false; }
  try { return Boolean(new URL(str)); }
  catch(e) { return false; }
}

const exampleUrls = {
  IntAct: "https://www.ebi.ac.uk/intact/interaction/EBI-2307691",
  ENA: "https://www.ebi.ac.uk/ena/browser/view/BN000065",
  UniProt: "http://purl.uniprot.org/uniprot/P0DP23"
}

export default () => {
  const [url, setUrl] = useState('')
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState<boolean|null>(null);

  const handleExampleClick = (e:any) => {
    setUrl(e.target.dataset.idorgExample);
    setTimeout(() => document.getElementById("reverseResolveButton")?.click(), 50);
  }

  const handleInputChange = (e:any) => {
    const {value} = e.target;
    setMatch(null);
    setLoading(null)
    setUrl(value);
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault(); e.stopPropagation();

    setLoading(true);
    fetch (config.resolverApi + "/reverse/byPrefix", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({apiVersion: "1.0", payload: {url}})
    })
      .then(res => res.status === 200 ? res.json() : null, console.error)
      .then(match => setMatch(match ? match.payload : {}))
      .finally(() => setLoading(false));
  }

  return (
      <div>
        <small className="form-text text-muted ms-1">
          Examples:{' '}
          {
            Object.entries(exampleUrls).map(([provider, url]) => (
                <button role='suggestion' key={provider} tabIndex={0}
                        type="button" className='text-primary me-2'
                        onClick={handleExampleClick}
                        onKeyDown={handleExampleClick}
                        title={url}
                        data-idorg-example={url}>
                  {provider}
                </button>
            ))
          }
        </small>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
                role="searchbox"
                spellCheck={false}
                className="form-control search-input"
                placeholder="Enter a provider URL to link to via identifiers.org"
                onChange={handleInputChange}
                value={url}
            />
            <button id="reverseResolveButton"
                className="btn btn-primary text-white search-button"
                disabled={isUrl(url) && !loading ? undefined : true}
                type="submit"
            >
              <i className="icon icon-common icon-search pe-2" />
              {loading ? "Converting..." : "Convert" }
            </button>
            <ReverseSearchMatch url={url} match={match} loading={loading} />
          </div>
        </form>
      </div>
    )
}

