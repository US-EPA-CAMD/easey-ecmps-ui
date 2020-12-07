import React from 'react'
import Header from './Header/Header';
import Footer from './Footer/Footer';
const Layout = (props) => {
    const childrenWithProps= React.Children.map(props.children, child => React.cloneElement(child));
    return (
        <div>
            <Header/>
                <div>
                    {childrenWithProps}
                </div>
            <Footer/>
        </div>
    )
}

export default Layout
