'use client';

import React , {useState} from 'react'
import Tab from './_component/Tab'
import { GiMedicines } from 'react-icons/gi'
import { TbReportSearch } from "react-icons/tb";
import Medicine from './_component/Medicine';
import MedicineReport from './_component/MedicineReport';

interface PatientTabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: PatientTabItem[] = [
  { id: 'medicine', label: 'Medicine', icon: <GiMedicines className="text-xl" /> },
  { id: 'Report', label: 'Reports', icon: <TbReportSearch className="text-xl" /> }
];


const Page = () => {
  const [selectedTab, setSelectedTab] = useState<string>('medicine');
  return (
   <>
    <Tab tabs={tabs} selectedTab={selectedTab} onTabChange={setSelectedTab}>
      {selectedTab === 'medicine' && ( <Medicine />)}
      {selectedTab === 'Report' && ( <MedicineReport />)}
    </Tab>
   
   </>
  )
}

export default Page