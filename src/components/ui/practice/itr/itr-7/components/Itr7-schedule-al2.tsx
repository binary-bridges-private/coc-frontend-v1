import React from 'react';
import { useForm, useFieldArray, Control, UseFormReturn } from 'react-hook-form';
import { Plus, Trash2 } from "lucide-react";
import { ITR7ScheduleAL2Data } from './itr-7-schedule-al2.types';

interface Itr7ScheduleAL2Props {
  form: UseFormReturn<ITR7ScheduleAL2Data>;
}

const Itr7ScheduleAL2: React.FC<Itr7ScheduleAL2Props> = ({ form }) => {
  const { control, register } = form;

  const { fields: residentialFields, append: appendResidential, remove: removeResidential } = useFieldArray({ control, name: "scheduleAL2.residential_assets" });
  const { fields: nonResidentialFields, append: appendNonResidential, remove: removeNonResidential } = useFieldArray({ control, name: "scheduleAL2.non_residential_assets" });
  const { fields: loansFields, append: appendLoans, remove: removeLoans } = useFieldArray({ control, name: "scheduleAL2.loans_advances" });
  const { fields: capitalContribFields, append: appendCapitalContrib, remove: removeCapitalContrib } = useFieldArray({ control, name: "scheduleAL2.capital_contributions" });
  const { fields: sharesFields, append: appendShares, remove: removeShares } = useFieldArray({ control, name: "scheduleAL2.shares_securities" });
  const { fields: vehiclesFields, append: appendVehicles, remove: removeVehicles } = useFieldArray({ control, name: "scheduleAL2.vehicles" });
  const { fields: jewelleryFields, append: appendJewellery, remove: removeJewellery } = useFieldArray({ control, name: "scheduleAL2.jewellery_art" });
  const { fields: archaeologicalFields, append: appendArchaeological, remove: removeArchaeological } = useFieldArray({ control, name: "scheduleAL2.archaeological_collections" });
  const { fields: liabilitiesFields, append: appendLiabilities, remove: removeLiabilities } = useFieldArray({ control, name: "scheduleAL2.liabilities" });

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">SCHEDULE AL-2</h1>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          Assets and liabilities as at the end of the year (applicable for start-ups only)
        </span>
      </div>
      <div className="mb-4 text-sm text-gray-600">
        If you are a start-up which has filed declaration in Form-2 under para 5 of DPIIT notification dated 19.02.2019, please furnish the following information for the period from the date of incorporation upto end of the year;-
      </div>

      {/* A. Residential Assets */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">A. Details of building or land appurtenant there to, or both, being a residential house acquired since incorporation</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Address</th>
              <th className="border p-2">Pin code</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Purpose for which used</th>
              <th className="border p-2">Whether transferred on or before end of year?</th>
              <th className="border p-2">If Yes, date of transfer</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {residentialFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL2.residential_assets.${index}.address`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.residential_assets.${index}.pin_code`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.residential_assets.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.residential_assets.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.residential_assets.${index}.purpose_of_use`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2">
                  <select {...register(`scheduleAL2.residential_assets.${index}.transferred_on_or_before_end_of_year`)} className="w-full p-1 border rounded">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.residential_assets.${index}.date_of_transfer`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeResidential(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendResidential({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* B. Non-Residential Assets */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">B. Details of land or building or both not being a residential house acquired since incorporation</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Address</th>
              <th className="border p-2">Pin code</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Purpose for which used</th>
              <th className="border p-2">Whether transferred on or before end of year?</th>
              <th className="border p-2">If Yes, date of transfer</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {nonResidentialFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL2.non_residential_assets.${index}.address`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.non_residential_assets.${index}.pin_code`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.non_residential_assets.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.non_residential_assets.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.non_residential_assets.${index}.purpose_of_use`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2">
                  <select {...register(`scheduleAL2.non_residential_assets.${index}.transferred_on_or_before_end_of_year`)} className="w-full p-1 border rounded">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.non_residential_assets.${index}.date_of_transfer`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeNonResidential(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendNonResidential({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* C. Loans & Advances */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">C. Details of Loans & Advances made since incorporation (If lending of money is not assessee's substantial business)</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name of person</th>
              <th className="border p-2">PAN</th>
              <th className="border p-2">Date on which loans and advances has been made</th>
              <th className="border p-2">Amount of loans and advances</th>
              <th className="border p-2">Amount repaid</th>
              <th className="border p-2">Whether repaid before end of year?</th>
              <th className="border p-2">If Yes, date of repayment</th>
              <th className="border p-2">Closing balance</th>
              <th className="border p-2">Rate of interest</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loansFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL2.loans_advances.${index}.name_of_person`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.loans_advances.${index}.pan`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.loans_advances.${index}.date_loan_made`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.loans_advances.${index}.amount_loans_advances`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.loans_advances.${index}.amount_repaid`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2">
                  <select {...register(`scheduleAL2.loans_advances.${index}.repaid_before_end_of_year`)} className="w-full p-1 border rounded">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.loans_advances.${index}.date_of_repayment`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.loans_advances.${index}.closing_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.loans_advances.${index}.rate_of_interest`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeLoans(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendLoans({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* D. Capital Contribution */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">D. Details of capital contribution made to any other entity since incorporation</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name of entity</th>
              <th className="border p-2">PAN</th>
              <th className="border p-2">Date on which capital contribution has been made</th>
              <th className="border p-2">Amount of contribution</th>
              <th className="border p-2">Amount withdrawn</th>
              <th className="border p-2">Amount of profit/loss/dividend/interest debited or credited</th>
              <th className="border p-2">Closing balance</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {capitalContribFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL2.capital_contributions.${index}.name_of_entity`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.capital_contributions.${index}.pan`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.capital_contributions.${index}.date_contribution_made`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.capital_contributions.${index}.amount_contribution`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.capital_contributions.${index}.amount_withdrawn`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.capital_contributions.${index}.amount_profit_loss_dividend`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.capital_contributions.${index}.closing_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeCapitalContrib(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendCapitalContrib({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* E. Shares and Securities */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">E. Details of acquisition of shares and securities</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name of company/entity</th>
              <th className="border p-2">PAN</th>
              <th className="border p-2">Type of shares/securities</th>
              <th className="border p-2">Number of shares/securities acquired</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Whether transferred, if Yes date of transfer</th>
              <th className="border p-2">Closing balance</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sharesFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL2.shares_securities.${index}.name_of_company`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.shares_securities.${index}.pan`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.shares_securities.${index}.type_of_shares`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.shares_securities.${index}.number_of_shares`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.shares_securities.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.shares_securities.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2">
                  <div className="flex flex-col gap-1">
                    <select {...register(`scheduleAL2.shares_securities.${index}.transferred_before_end_of_year`)} className="w-full p-1 border rounded">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <input type="date" {...register(`scheduleAL2.shares_securities.${index}.date_of_transfer`)} className="w-full p-1 border rounded" />
                  </div>
                </td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.shares_securities.${index}.closing_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeShares(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendShares({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* F. Motor Vehicles */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">F. Details of motor vehicle, aircraft, yacht or other mode of transport, the actual cost of which exceeds ten lakh rupees acquired since incorporation</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Particulars of asset</th>
              <th className="border p-2">Registration number of vehicle</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Purpose for which used</th>
              <th className="border p-2">Whether transferred, if Yes date of transfer</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL2.vehicles.${index}.particulars`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.vehicles.${index}.registration_no`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.vehicles.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.vehicles.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.vehicles.${index}.purpose_of_use`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2">
                  <div className="flex flex-col gap-1">
                    <select {...register(`scheduleAL2.vehicles.${index}.transferred_before_end_of_year`)} className="w-full p-1 border rounded">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <input type="date" {...register(`scheduleAL2.vehicles.${index}.date_of_transfer`)} className="w-full p-1 border rounded" />
                  </div>
                </td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeVehicles(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendVehicles({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* G. Jewellery */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">G. Details of Jewellery acquired since incorporation</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Particulars of asset</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Purpose for which used</th>
              <th className="border p-2">Whether transferred, if Yes date of transfer</th>
              <th className="border p-2">Closing balance</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jewelleryFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL2.jewellery_art.${index}.particulars`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.jewellery_art.${index}.quantity`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.jewellery_art.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.jewellery_art.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.jewellery_art.${index}.purpose_of_use`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2">
                  <div className="flex flex-col gap-1">
                    <select {...register(`scheduleAL2.jewellery_art.${index}.transferred_before_end_of_year`)} className="w-full p-1 border rounded">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <input type="date" {...register(`scheduleAL2.jewellery_art.${index}.date_of_transfer`)} className="w-full p-1 border rounded" />
                  </div>
                </td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.jewellery_art.${index}.closing_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeJewellery(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendJewellery({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* H. Archaeological collections */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">H. Details of archaeological collections, drawings, paintings, sculptures, any work of art or bullion acquired since incorporation</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Particulars of asset</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Cost of acquisition</th>
              <th className="border p-2">Date of acquisition</th>
              <th className="border p-2">Purpose for which used</th>
              <th className="border p-2">Whether transferred, if Yes date of transfer</th>
              <th className="border p-2">Closing balance</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {archaeologicalFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL2.archaeological_collections.${index}.particulars`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.archaeological_collections.${index}.quantity`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.archaeological_collections.${index}.cost_of_acquisition`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="date" {...register(`scheduleAL2.archaeological_collections.${index}.date_of_acquisition`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.archaeological_collections.${index}.purpose_of_use`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2">
                  <div className="flex flex-col gap-1">
                    <select {...register(`scheduleAL2.archaeological_collections.${index}.transferred_before_end_of_year`)} className="w-full p-1 border rounded">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <input type="date" {...register(`scheduleAL2.archaeological_collections.${index}.date_of_transfer`)} className="w-full p-1 border rounded" />
                  </div>
                </td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.archaeological_collections.${index}.closing_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2 text-center"><button type="button" onClick={() => removeArchaeological(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => appendArchaeological({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
      </div>

      {/* I. Liabilities */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">I. Details of liabilities</h3>
        <h4 className="font-medium mb-2 text-sm">Details of loans, deposits and advances taken from a person other than financial institution</h4>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name of person</th>
              <th className="border p-2">PAN</th>
              <th className="border p-2">Opening Balance</th>
              <th className="border p-2">Amount received</th>
              <th className="border p-2">Amount paid</th>
              <th className="border p-2">Interest debited, if any</th>
              <th className="border p-2">Closing balance</th>
              <th className="border p-2">Rate of interest (%)</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {liabilitiesFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2"><input {...register(`scheduleAL2.liabilities.${index}.name_of_person`)} className="w-full p-1 border rounded" /></td>
                <td className="border p-2"><input {...register(`scheduleAL2.liabilities.${index}.pan`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.liabilities.${index}.opening_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.liabilities.${index}.amount_received`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.liabilities.${index}.amount_paid`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.liabilities.${index}.interest_debited`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.liabilities.${index}.closing_balance`)} className="w-full p-1 border rounded text-right" /></td>
                <td className="border p-2"><input type="number" {...register(`scheduleAL2.liabilities.${index}.rate_of_interest`)} className="w-full p-1 border rounded text-right" /></td>
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

export default Itr7ScheduleAL2;
