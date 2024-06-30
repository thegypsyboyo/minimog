type LinksProps = {
    name: string;
    link: string;
    filter?: string;
}
type Props = {
    heading: string;
    links?: LinksProps[];
    link?: any;
}
export const sidebarData: Props[] = [
    {
        heading: "My Account",
        links: [
            {
                name: "My Profile",
                link: "/profile",
            },
            {
                name: "Addresses",
                link: "/profile/address",
            },
            {
                name: "My Payment Options",
                link: "/profile/payment",
            },
            {
                name: "Account Security",
                link: "/profile/security",
            },
        ],
    },
    {
        heading: "My Orders",
        links: [
            {
                name: "All Orders",
                link: "/profile/orders",
                filter: "",
            },
            {
                name: "Paid Orders",
                link: "/profile/orders",
                filter: "paid",
            },
            {
                name: "Unpaid Orders",
                link: "/profile/orders",
                filter: "unpaid",
            },

            {
                name: "Processing Orders",
                link: "/profile/orders",
                filter: "Processing",
            },
            {
                name: "Unprocessed Orders",
                link: "/profile/orders",
                filter: "Not Processed",
            },
            {
                name: "Dispatched Orders",
                link: "/profile/orders",
                filter: "Dispatched",
            },
            {
                name: "Delievered Orders",
                link: "/profile/orders",
                filter: "Completed",
            },
            {
                name: "Cancelled Orders",
                link: "/profile/orders",
                filter: "Cancelled",
            },
        ],
    },
    {
        heading: "My Lists",
        links: [
            {
                name: "Whishlist",
                link: "/profile/wishlist",
            },
            {
                name: "Recently Viewed",
                link: "/profile/recent",
            },
        ],
    },
    {
        heading: "Customer Service",
        links: [
            {
                name: "My Message",
                link: "",
            },
            {
                name: "Service Records",
                link: "",
            },
        ],
    },
    {
        heading: "Other Services",
        links: [
            {
                name: "Survey Center",
                link: "",
            },
            {
                name: "Contact Preferences",
                link: "",
            },
        ],
    },
    // {
    //     heading: "Policy",
    //     links: [
    //         {
    //             name: "Shipping Info",
    //             link: "/profile/shipping",
    //         },
    //         {
    //             name: "Return Policy",
    //             link: "/profile/return-policy",
    //         },
    //         {
    //             name: "Privacy & Cookie Policy",
    //             link: "/profile/privacy-policy",
    //         },
    //     ],
    // },
    {
        heading: "Sign out",
        link: [],
        links: []
    },
];

export const ordersLinks = [
    {
        name: "All Orders",
        filter: "",
    },
    {
        name: "Paid Orders",
        filter: "paid",
    },
    {
        name: "Unpaid Orders",
        filter: "unpaid",
    },
    {
        name: "Processing Orders",
        filter: "Processing",
    },
    {
        name: "Unprocessed Orders",
        filter: "Not Processed",
    },
    {
        name: "Dispatched Orders",
        filter: "Dispatched",
    },
    {
        name: "Delievered Orders",
        filter: "Delievered",
    },
    {
        name: "Cancelled Orders",
        filter: "Cancelled",
    },
];
