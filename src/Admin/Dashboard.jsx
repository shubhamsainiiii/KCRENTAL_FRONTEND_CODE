import React, { useState } from "react";

import AddJewelry from "./AddJewelry";
import JewelryList from "./JewelryList";


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('garments');
    const [activeSection, setActiveSection] = useState('list');

    return (
        <div className="min-h-screen bg-linear-to-br from-[#3A153F] via-[#8234a1] to-[#3A153F] p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-[#e2b82e] mb-8 text-center mt-17">Admin Dashboard</h1>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <button
                        onClick={() => {
                            setActiveTab('garments');
                            setActiveSection('add');
                        }}
                        className="bg-black/10 hover:bg-black/20 text-[#e2b82e] font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:scale-103 transition-all duration-500 border border-[#e2b82e] cursor-pointer"
                    >
                        Add Garments
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('jewelry');
                            setActiveSection('add');
                        }}
                        className="bg-black/10 hover:bg-black/20 text-[#e2b82e] font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:scale-103 transition-all duration-500 border border-[#e2b82e] cursor-pointer"
                    >
                        Add Jewelry
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('garments');
                            setActiveSection('list');
                        }}
                        className="bg-black/10 hover:bg-black/20 text-[#e2b82e] font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:scale-103 transition-all duration-500 border border-[#e2b82e] cursor-pointer"
                    >
                        All Garments
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('jewelry');
                            setActiveSection('list');
                        }}
                        className="bg-black/10 hover:bg-black/20 text-[#e2b82e] font-semibold py-4 px-6 rounded-xl shadow-lg transform hover:scale-103 transition-all duration-500 border border-[#e2b82e] cursor-pointer"
                    >
                        All Jewelry
                    </button>
                </div>

                <hr className="my-12 border-[#e2b82e]" />

                {/* Content Area */}
                <div className="">
                    {activeSection === 'add' ? (
                        <div>
                            {activeTab === 'garments' ? (
                                <AddGarment />
                            ) : (
                                <AddJewelry />
                            )}
                        </div>
                    ) : (
                        <div>
                            {activeTab === 'garments' ? (
                                <GarmentList />
                            ) : (
                                <JewelryList />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
