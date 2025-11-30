import React from 'react';
import { useForm, useFieldArray, Control, UseFormReturn } from 'react-hook-form';
import { Plus, Trash2 } from "lucide-react";
import { ITR7ScheduleAL1Data } from './itr-7-schedule-al1.types';

interface Itr7ScheduleAL1Props {
  form: UseFormReturn<ITR7ScheduleAL1Data>;
}

const Itr7ScheduleAL1: React.FC<Itr7ScheduleAL1Props> = ({ form }) => {
  const { control, register } = form;

  const { fields: residentialFields, append: appendResidential, remove: removeResidential } = useFieldArray({ control, name: "scheduleAL1.residential_assets" });
  const { fields: nonResidentialFields, append: appendNonResidential, remove: removeNonResidential } = useFieldArray({ control, name: "scheduleAL1.non_residential_assets" });
  const { fields: listedEquityFields, append: appendListedEquity, remove: removeListedEquity } = useFieldArray({ control, name: "scheduleAL1.listed_equity" });
  const { fields: unlistedEquityFields, append: appendUnlistedEquity, remove: removeUnlistedEquity } = useFieldArray({ control, name: "scheduleAL1.unlisted_equity" });
  const { fields: otherSecuritiesFields, append: appendOtherSecurities, remove: removeOtherSecurities } = useFieldArray({ control, name: "scheduleAL1.other_securities" });
  const { fields: capitalContribFields, append: appendCapitalContrib, remove: removeCapitalContrib } = useFieldArray({ control, name: "scheduleAL1.capital_contributions" });
  const { fields: loansFields, append: appendLoans, remove: removeLoans } = useFieldArray({ control, name: "scheduleAL1.loans_advances" });
  const { fields: vehiclesFields, append: appendVehicles, remove: removeVehicles } = useFieldArray({ control, name: "scheduleAL1.vehicles" });
  const { fields: jewelleryFields, append: appendJewellery, remove: removeJewellery } = useFieldArray({ control, name: "scheduleAL1.jewellery_art" });
  const { fields: liabilitiesFields, append: appendLiabilities, remove: removeLiabilities } = useFieldArray({ control, name: "scheduleAL1.liabilities" });

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">SCHEDULE AL-1</h1>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          Assets and liabilities as at the end of the year
        </span>
      </div>
      <div className="mb-4 text-sm text-gray-600">
        (Mandatorily required to be filled up by an unlisted company) (other than a start-up for which Schedule AL-2 is to be filled up)
      </div>

      {/* A. Residential Assets */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">A. Details of building or land appurtenant there to, or both, being a residential house</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Address</th>
              <th className="border p-2">Pin code</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Purpose for which used</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {residentialFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL1.residential_assets.${index}.address`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.residential_assets.${index}.pin_code`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL1.residential_assets.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.residential_assets.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.residential_assets.${index}.purpose_of_use`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeResidential(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendResidential({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* B. Non-Residential Assets */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">B. Details of land or building or both not being in the nature of residential house</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Address</th>
              <th className="border p-2">Pin code</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Purpose for which used</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {nonResidentialFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL1.non_residential_assets.${index}.address`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.non_residential_assets.${index}.pin_code`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL1.non_residential_assets.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.non_residential_assets.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.non_residential_assets.${index}.purpose_of_use`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeNonResidential(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendNonResidential({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* C. Listed Equity Shares */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">C. Details of listed equity shares</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2" colSpan={2}>Opening balance</th>
              <th className="border p-2" colSpan={2}>Shares acquired during the year</th>
              <th className="border p-2" colSpan={2}>Shares transferred during the year</th>
              <th className="border p-2" colSpan={2}>Closing balance</th>
              <th className="border p-2" rowSpan={2}>Action</th>
            </tr>
            <tr className="bg-gray-100">
              <th className="border p-2">No. of shares</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">No. of shares</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">No. of shares</th>
              <th className="border p-2">Sale consideration</th>
              <th className="border p-2">No. of shares</th>
              <th className="border p-2">Cost of acquisition</th>
            </tr>
          </thead>
          <tbody>
            {listedEquityFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.listed_equity.${index}.opening_balance_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.listed_equity.${index}.opening_balance_cost`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.listed_equity.${index}.acquired_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.listed_equity.${index}.acquired_cost`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.listed_equity.${index}.transferred_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.listed_equity.${index}.transferred_sale_consideration`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.listed_equity.${index}.closing_balance_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.listed_equity.${index}.closing_balance_cost`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeListedEquity(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendListedEquity({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* D. Unlisted Equity Shares */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">D. Details of unlisted equity shares</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2" rowSpan={2}>Name of company</th>
              <th className="border p-2" rowSpan={2}>PAN</th>
              <th className="border p-2" colSpan={2}>Opening balance</th>
              <th className="border p-2" colSpan={2}>Shares acquired during the year</th>
              <th className="border p-2" colSpan={2}>Shares transferred during the year</th>
              <th className="border p-2" colSpan={2}>Closing balance</th>
              <th className="border p-2" rowSpan={2}>Action</th>
            </tr>
            <tr className="bg-gray-100">
              <th className="border p-2">No. of shares</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">No. of shares</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">No. of shares</th>
              <th className="border p-2">Sale consideration</th>
              <th className="border p-2">No. of shares</th>
              <th className="border p-2">Cost of acquisition</th>
            </tr>
          </thead>
          <tbody>
            {unlistedEquityFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL1.unlisted_equity.${index}.name_of_company`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.unlisted_equity.${index}.pan`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.unlisted_equity.${index}.opening_balance_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.unlisted_equity.${index}.opening_balance_cost`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.unlisted_equity.${index}.acquired_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.unlisted_equity.${index}.acquired_cost`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.unlisted_equity.${index}.transferred_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.unlisted_equity.${index}.transferred_sale_consideration`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.unlisted_equity.${index}.closing_balance_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.unlisted_equity.${index}.closing_balance_cost`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeUnlistedEquity(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendUnlistedEquity({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* E. Other Securities */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">E. Details of other securities</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2" rowSpan={2}>Type of security</th>
              <th className="border p-2" colSpan={2}>Opening balance</th>
              <th className="border p-2" colSpan={2}>Securities acquired during the year</th>
              <th className="border p-2" colSpan={2}>Securities transferred during the year</th>
              <th className="border p-2" colSpan={2}>Closing balance</th>
              <th className="border p-2" rowSpan={2}>Action</th>
            </tr>
            <tr className="bg-gray-100">
              <th className="border p-2">No. of securities</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">No. of securities</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">No. of securities</th>
              <th className="border p-2">Sale consideration</th>
              <th className="border p-2">No. of securities</th>
              <th className="border p-2">Cost of acquisition</th>
            </tr>
          </thead>
          <tbody>
            {otherSecuritiesFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL1.other_securities.${index}.type_of_security`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.other_securities.${index}.opening_balance_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.other_securities.${index}.opening_balance_cost`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.other_securities.${index}.acquired_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.other_securities.${index}.acquired_cost`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.other_securities.${index}.transferred_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.other_securities.${index}.transferred_sale_consideration`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.other_securities.${index}.closing_balance_no`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.other_securities.${index}.closing_balance_cost`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeOtherSecurities(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendOtherSecurities({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* F. Capital Contribution */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">F. Details of capital contribution to other entity</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name of entity</th>
              <th className="border p-2">PAN</th>
              <th className="border p-2">Opening balance</th>
              <th className="border p-2">Amount contributed during the year</th>
              <th className="border p-2">Amount withdrawn during the year</th>
              <th className="border p-2">Closing balance</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {capitalContribFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL1.capital_contributions.${index}.name_of_entity`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.capital_contributions.${index}.pan`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.capital_contributions.${index}.opening_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.capital_contributions.${index}.amount_contributed`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.capital_contributions.${index}.amount_withdrawn`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.capital_contributions.${index}.closing_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeCapitalContrib(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendCapitalContrib({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* G. Loans & Advances */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">G. Details of Loans & Advances to any other concern (If money lending is not assessee's substantial business)</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name of person</th>
              <th className="border p-2">PAN</th>
              <th className="border p-2">Opening Balance</th>
              <th className="border p-2">Amount lent</th>
              <th className="border p-2">Amount repaid</th>
              <th className="border p-2">Closing balance</th>
              <th className="border p-2">Rate of interest (%)</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loansFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL1.loans_advances.${index}.name_of_person`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.loans_advances.${index}.pan`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.loans_advances.${index}.opening_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.loans_advances.${index}.amount_lent`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.loans_advances.${index}.amount_repaid`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.loans_advances.${index}.closing_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.loans_advances.${index}.rate_of_interest`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeLoans(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendLoans({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* H. Motor Vehicles */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">H. Details of motor vehicle, aircraft, yacht or other mode of transport</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Particulars of asset</th>
              <th className="border p-2">Registration number</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Purpose for which used</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL1.vehicles.${index}.particulars`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.vehicles.${index}.registration_no`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.vehicles.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL1.vehicles.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.vehicles.${index}.purpose_of_use`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeVehicles(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendVehicles({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* I. Jewellery, Art, etc. */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">I. Details of Jewellery, archaeological collections, drawings, paintings, sculptures, any work of art or bullion</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Particulars of asset</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Purpose for which used</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jewelleryFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL1.jewellery_art.${index}.particulars`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.jewellery_art.${index}.quantity`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.jewellery_art.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL1.jewellery_art.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.jewellery_art.${index}.purpose_of_use`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeJewellery(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendJewellery({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* J. Liabilities */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">J. Details of liabilities</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name of person</th>
              <th className="border p-2">PAN</th>
              <th className="border p-2">Opening Balance</th>
              <th className="border p-2">Amount received</th>
              <th className="border p-2">Amount paid</th>
              <th className="border p-2">Closing balance</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {liabilitiesFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL1.liabilities.${index}.name_of_person`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL1.liabilities.${index}.pan`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.liabilities.${index}.opening_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.liabilities.${index}.amount_received`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.liabilities.${index}.amount_paid`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL1.liabilities.${index}.closing_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeLiabilities(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendLiabilities({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

    </div>
  );
};

export default Itr7ScheduleAL1;
