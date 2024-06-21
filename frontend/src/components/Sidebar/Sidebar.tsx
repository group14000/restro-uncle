import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isFoodManagementOpen, setIsFoodManagementOpen] = useState(false);
    const [isManageFoodOpen, setIsManageFoodOpen] = useState(false);

    const toggleFoodManagement = () => {
        setIsFoodManagementOpen(!isFoodManagementOpen);
    };

    const toggleManageFood = () => {
        setIsManageFoodOpen(!isManageFoodOpen);
    };

    const sidebarItems = [
        { icon: "home", label: "Dashboard", to: "/" },
        { icon: "shopping_cart", label: "Manage Order", to: "/manage-order" },
        { icon: "book_online", label: "Reservation", to: "/reservation" },
        { icon: "shopping_basket", label: "Purchase Manage", to: "/purchase-manage" },
        { icon: "bar_chart", label: "Report", to: "/report" },
        {
            icon: "fastfood", label: "Food Management", to: "#", toggle: toggleFoodManagement, isOpen: isFoodManagementOpen, subItems: [
                { label: "Manage Category", to: "/manage-category" },
                {
                    label: "Manage Food", to: "#", toggle: toggleManageFood, isOpen: isManageFoodOpen, subItems: [
                        { label: "Add Food", to: "/add-food" },
                        { label: "Food List", to: "/food-list" },
                        { label: "Add Group Item", to: "/add-group-item" },
                        { label: "Food Variant", to: "/food-variant" },
                        { label: "Food Availability", to: "/food-availability" },
                        { label: "Menu Type", to: "/menu-type" },
                    ]
                },
                { label: "Manage Add-ons", to: "/manage-addons" },
            ]
        },
        { icon: "build", label: "Production", to: "/production" },
        { icon: "settings", label: "Setting", to: "/setting" },
        { icon: "account_balance", label: "Accounts", to: "/accounts" },
        { icon: "people", label: "Human Resource", to: "/human-resource" },
        { icon: "facebook", label: "Facebook Setting", to: "/facebook-setting" },
        { icon: "delete", label: "Waste Tracking", to: "/waste-tracking" },
        { icon: "qr_code", label: "QR App", to: "/qr-app" },
    ];

    return (
        <div className="h-screen bg-blue-900 text-white w-64">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center mb-3">
                    <img src="/images.png" alt="Profile" className="rounded-full" />
                </div>
                <div className="text-lg mb-10">JOHN DOE</div>
            </div>
            <nav className="flex flex-col pl-5">
                {sidebarItems.map((item, index) => (
                    <div key={index} className="mb-2 flex flex-col">
                        {item.subItems ? (
                            <>
                                <div className="flex items-center cursor-pointer" onClick={item.toggle}>
                                    <span className="material-icons mr-3">{item.icon}</span> {item.label}
                                    <span className="material-icons ml-auto">{item.isOpen ? 'expand_less' : 'expand_more'}</span>
                                </div>
                                {item.isOpen && (
                                    <div className="pl-8 mt-2 flex flex-col">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <div key={subIndex} className="mb-2 flex flex-col">
                                                {subItem.subItems ? (
                                                    <>
                                                        <div className="flex items-center cursor-pointer" onClick={subItem.toggle}>
                                                            <span>{subItem.label}</span>
                                                            <span className="material-icons ml-auto">{subItem.isOpen ? 'expand_less' : 'expand_more'}</span>
                                                        </div>
                                                        {subItem.isOpen && (
                                                            <div className="pl-4 mt-2 flex flex-col">
                                                                {subItem.subItems.map((nestedItem, nestedIndex) => (
                                                                    <Link key={nestedIndex} to={nestedItem.to} className="mb-2">{nestedItem.label}</Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Link to={subItem.to} className="mb-2">{subItem.label}</Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to={item.to} className="mb-2 flex items-center">
                                <span className="material-icons mr-3">{item.icon}</span> {item.label}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
