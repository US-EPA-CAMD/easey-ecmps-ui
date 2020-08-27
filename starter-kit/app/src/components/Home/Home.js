import React from "react";
import { Alert, Search } from "@trussworks/react-uswds";

const mockSubmit = () => {};

function App() {
  return (
    <div class="container">
      <h2>USWDS</h2>
      <div class="usa-alert usa-alert--success">
        <div class="usa-alert__body">
          <h3 class="usa-alert__heading">Success status</h3>
          <p class="usa-alert__text">
            Demonstrating the use of usdws as a styling and UI library
          </p>
        </div>
      </div>
      <h2>REACT-USWDS</h2>
      <Alert type="success" heading="Success status" className="react-alert">
        Demonstrating the use of usdws as a styling and UI library
      </Alert>
      <br />
      <h2>USWDS</h2>
      <section aria-label="Default search component">
        <form class="usa-search" role="search">
          <label class="usa-sr-only" for="search-field">
            Search
          </label>
          <input
            class="usa-input"
            id="search-field"
            type="search"
            name="search"
          />
          <button class="usa-button" type="submit">
            <span class="usa-search__submit-text">Search</span>
          </button>
        </form>
      </section>
      <h2>REACT-USWDS</h2>
      <Search onSubmit={mockSubmit} />
    </div>
  );
}

export default App;
