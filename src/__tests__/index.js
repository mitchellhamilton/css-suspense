// @flow
import * as React from "react";
import { render } from "react-dom";
import { Stylesheet } from "../";

function safeQuerySelector(selector) {
  let element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Could not find element matching selector: ${selector}`);
  }
  return element;
}

function App() {
  return (
    <React.Fragment>
      {/*$FlowFixMe*/}
      <React.Placeholder delayMs={500} fallback="loading...">
        <Stylesheet href="./style.css">
          {/* this content shouldn't render
          until the stylesheet finishes loading */}
          <span className="big">what up what up</span>
        </Stylesheet>
      </React.Placeholder>
      <div>some other content</div>
    </React.Fragment>
  );
}

let sleep = time => new Promise(resolve => setTimeout(resolve, time));

test("wow", cb => {
  safeQuerySelector("body").innerHTML = `<div id="root"></div>`;
  render(<App />, safeQuerySelector("#root"), () => {
    expect(document.documentElement).toMatchSnapshot();
    safeQuerySelector("link").dispatchEvent(new Event("load"));
    setTimeout(() => {
      expect(document.documentElement).toMatchSnapshot();

      cb();
    }, 0);
  });
});
