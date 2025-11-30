import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { ITR7VerificationData } from './itr-7-verification.types';

interface Itr7VerificationProps {
  form: UseFormReturn<ITR7VerificationData>;
}

const Itr7Verification: React.FC<Itr7VerificationProps> = ({ form }) => {
  const { register } = form;

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">VERIFICATION</h1>
      </div>

      <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
        <p className="mb-4 leading-relaxed">
          I, <input {...register("verification.name")} className="border-b border-gray-400 px-2 py-1 outline-none w-64" placeholder="Name" /> son/ daughter of <input {...register("verification.parent_name")} className="border-b border-gray-400 px-2 py-1 outline-none w-64" placeholder="Parent Name" />, solemnly declare that to the best of my knowledge and belief, the information given in the return and the schedules thereto is correct and complete is in accordance with the provisions of the Income-tax Act, 1961.
        </p>
        <p className="mb-4 leading-relaxed">
          I further declare that I am making this return in my capacity as <input {...register("verification.capacity")} className="border-b border-gray-400 px-2 py-1 outline-none w-48" placeholder="Capacity" /> (drop down to be provided and I am also competent to make this return and verify it. I am holding permanent account number <input {...register("verification.pan")} className="border-b border-gray-400 px-2 py-1 outline-none w-40 uppercase" maxLength={10} placeholder="PAN" /> (if allotted) (Please see instruction).
        </p>
        <p className="mb-6 leading-relaxed">
          I further declare that the critical assumptions specified in the agreement have been satisfied and all the terms and conditions of the agreement have been complied with. (Applicable, in a case where return is furnished under section 92CD)
        </p>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" {...register("verification.date")} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Place</label>
            <input {...register("verification.place")} className="w-full p-2 border rounded" />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
           <div className="text-center">
             <div className="h-12 border-b border-gray-400 w-48 mb-2"></div>
             <p className="text-sm font-medium">Sign here ➔</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Itr7Verification;
