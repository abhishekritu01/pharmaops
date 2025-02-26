'use client';
import React, { useState } from 'react'
import Tab from './_component/Tab'
import { GiMedicines } from 'react-icons/gi'
import { TbReportSearch } from "react-icons/tb";
import Medicine from './_component/Medicine';
import MedicineReport from './_component/MedicineReport';
import Downloads from './_component/reports/Downloads';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import Inventory from './_component/Inventory';
import Stocks from './_component/Stocks';

interface PatientTabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: PatientTabItem[] = [
  { id: 'medicine', label: 'Medicine', icon: <GiMedicines className="text-xl" /> },
  { id: 'Report', label: 'Reports', icon: <TbReportSearch className="text-xl" /> },
  { id: 'Downloads', label: 'Downloads', icon: <FaCloudDownloadAlt className="text-xl" /> },
  { id: 'Inventory', label: 'Inventory', icon: <MdInventory className="text-xl" /> },
  { id: 'Stocks', label: 'Stocks', icon: <MdInventory className="text-xl" /> }
];


const Page = () => {
  const [selectedTab, setSelectedTab] = useState<string>('medicine');
  return (
    <>
      <Tab tabs={tabs} selectedTab={selectedTab} onTabChange={setSelectedTab}>
        {selectedTab === 'medicine' && (<Medicine />)}
        {selectedTab === 'Report' && (<MedicineReport />)}
        {selectedTab === 'Downloads' && (<Downloads />)}
        {selectedTab === 'Inventory' && (<Inventory />)}
        {selectedTab === 'Stocks' && (<Stocks />)}
      </Tab>

    </>
  )
}

export default Page