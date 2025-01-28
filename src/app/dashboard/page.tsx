'use client';

import React , {useState} from 'react'
import Tab from './_component/Tab'
import { GiMedicines } from 'react-icons/gi'
import { TbReportSearch } from "react-icons/tb";
import Medicine from './_component/Medicine';
import MedicineReport from './_component/MedicineReport';
import Downloads from './_component/reports/Downloads';
import { FaCloudDownloadAlt } from "react-icons/fa";

interface PatientTabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: PatientTabItem[] = [
  { id: 'medicine', label: 'Medicine', icon: <GiMedicines className="text-xl" /> },
  { id: 'Report', label: 'Reports', icon: <TbReportSearch className="text-xl" /> },
  { id: 'Downloads', label: 'Downloads', icon: <FaCloudDownloadAlt className="text-xl" /> },
];


const Page = () => {
  const [selectedTab, setSelectedTab] = useState<string>('medicine');
  return (
   <>
    <Tab tabs={tabs} selectedTab={selectedTab} onTabChange={setSelectedTab}>
      {selectedTab === 'medicine' && ( <Medicine />)}
      {selectedTab === 'Report' && ( <MedicineReport />)}
      {selectedTab === 'Downloads' && ( <Downloads />)}
    </Tab>
   
   </>
  )
}

export default Page