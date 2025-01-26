import React from 'react';
import AddMedicine from './AddMedicine';
import ListOfMedicin from './ListOfMedicin';
import { useState } from 'react';

const Medicine = () => {
  const [update, setUpdate] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      <div className="col-span-3 md:col-span-2 p-4 md:p-0 border-dashed border-2 border-gray-400 rounded-lg">
        <AddMedicine  
          update={update}
          setUpdate={setUpdate}
        />
      </div>
      <div className="col-span-3 md:col-span-1 p-4 md:p-0 border-dashed border-2 border-gray-400 rounded-lg">
        <ListOfMedicin 
          update={update}
         
        />
      </div>
    </div>
  );
};

export default Medicine;
