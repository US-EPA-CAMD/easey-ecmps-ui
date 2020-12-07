import React from 'react'
import DynamicTabs from '../../Common/Tabs/DynamicTabs'
const DynamicTabBarRender = ({totalTabs}) => {

    return (
 
              <div className="tabsBar">
                <DynamicTabs
                  tabsProps={totalTabs}
                />
              </div>
      
    );
}

export default DynamicTabBarRender
