"use strict";
/* global classnames r React ReactDOM Experiments */

/**
 * Mapping of pages displayed on the sidebar. Keys are the value used in the
 * URL hash to identify the current page.
 *
 * Pages will appear in the sidebar in the order they are defined here. If the
 * URL doesn't contain a hash, the first page will be displayed in the content area.
 */
const PAGES = new Map([
  ["experiments", {
    name: "Desktop",
    component: Experiments,
    icon: "https://image.flaticon.com/icons/svg/220/220215.svg",
  }],
]);

/**
 * Handle basic layout and routing within about:flags.
 */
class AboutFlags extends React.Component {
  constructor(props) {
    super(props);

    let hash = new URL(window.location).hash.slice(1);
    if (!PAGES.has(hash)) {
      hash = "experiments";
    }

    this.state = {
      currentPageId: hash,
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener("hashchange", this);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this);
  }

  handleEvent(event) {
    const newHash = new URL(event.newURL).hash.slice(1);
    if (PAGES.has(newHash)) {
      this.setState({currentPageId: newHash});
    }
  }

  render() {
    const currentPageId = this.state.currentPageId;
    const pageEntries = Array.from(PAGES.entries());
    const currentPage = PAGES.get(currentPageId);

    return (
      r("div", {className: "about-flags-container"},
        r(Sidebar, {},
          pageEntries.map(([id, page]) => (
            r(Clock),
            r(SidebarItem, {
              key: id,
              pageId: id,
              selected: id === currentPageId,
              page,
            })
          )),
        ),
        r(Content, {},
          r(Clock),
          currentPage && r(currentPage.component)
        ),
      )
    );
  }
}

class Sidebar extends React.Component {
  render() {
    return r("ul", {id: "categories"}, this.props.children);
  }
}

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.location = `#${this.props.pageId}`;
  }

  render() {
    const { page, selected } = this.props;
    return (
      r("li", {
        className: classnames("category", {selected}),
        onClick: this.handleClick,
      },
        page.icon && r("img", {className: "category-icon", src: page.icon}),
        r("span", {className: "category-name"}, page.name),
      )
    );
  }
}

class Content extends React.Component {
  render() {
    return (
      r("div", {className: "main-content"},
        r("div", {className: "content-box"},
          this.props.children,
        ),
      )
    );
  }
}

ReactDOM.render(
  r(AboutFlags),
  document.getElementById("app"),
);
