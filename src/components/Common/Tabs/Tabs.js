import React, { useEffect, useState } from "react";
import './Tabs.css';
const Tabs = ({ children, dynamic = false, removeTabs, setResizeObserver}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  let contentBox=null;
  const closeHandler = (event, index) => {
    event.stopPropagation();
    removeTabs(index);
    if (activeTabIndex === children.length - 1) {
      setActiveTabIndex(index - 1);
    }
  };

  useEffect(()=>{
    if(contentBox){
      setResizeObserver(contentBox);
    }
  },[contentBox]);

  return (
    <div>
      <div className="tabBar">
      <ul className="usa-button-group usa-button-group--segmented" >
        {children.map((el, i) => (
          <li key={i} className="usa-button-group__item usa-tooltip" style={{position:'relative'}} data-position="bottom" title={el.props.title}>
            <button
              className={
                activeTabIndex === i
                  ? "active-button button-group"
                  : "notActive-button button-group"
              }
              onClick={() => setActiveTabIndex(i)}
            >
              {dynamic ? (
                <i
                  className={
                    i === 0
                      ? "fa fa-times close-icon hidden"
                      : "fa fa-times close-icon"
                  }
                  onClick={(e) => closeHandler(e, i)}
                ></i>
              ) : null}
              <span  className={i!==0?"tabTitle":"firstTabTitle"}>{el.props.title}</span>
            </button>
          </li>
        ))}
      </ul>
      </div>
      <div
        className="tabContent"
        ref={el => {
          if (!el) {
            return
          }
          contentBox=el
        }}>{children[activeTabIndex]}</div>
    </div>
  );
};

export default Tabs;
