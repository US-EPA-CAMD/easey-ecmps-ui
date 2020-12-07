import React from 'react'
import DynamicTabs from '../../Common/Tabs/DynamicTabs'
const DynamicTabBarRender = ({totalTabs}) => {
  console.log(totalTabs,' this is total tabs ')
    return (
              <div className="tabsBar">
                <DynamicTabs
                  tabsProps={totalTabs}
                />
              </div>
    );
}

export default DynamicTabBarRender
