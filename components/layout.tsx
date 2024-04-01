import React from 'react';

type LayoutType = {
    children: React.ReactNode;
    className?: string,
}


const Layout: React.FC<LayoutType> = ({ className, children }) => (
    <div className={`ml-auto mr-auto w-full px-5 sm:max-w-440 md:max-w-720 lg:max-w-1140 xl:max-w-[1280px] 2xl:max-w-1320 ${className}`}>
        {children}
    </div>
)

export default Layout
