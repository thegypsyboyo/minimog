import React from 'react'

type LayoutType = {
    children: React.ReactNode;
    // className?: string,
}
const AdminLayout: React.FC<LayoutType> = ({ children }) => (
    <div>{children}</div>
)

export default AdminLayout