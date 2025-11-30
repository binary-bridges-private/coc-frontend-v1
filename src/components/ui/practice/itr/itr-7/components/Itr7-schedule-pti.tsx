import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { ITR7SchedulePTIData } from './itr-7-schedule-pti.types.ts';

export interface Itr7SchedulePTIProps {
    form: UseFormReturn<ITR7SchedulePTIData>;
}

const TextInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7SchedulePTIData>;
    className?: string;
    placeholder?: string;
}> = ({ name, form, className, placeholder }) => (
    <input
        type="text"
        placeholder={placeholder}
        className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
        {...form.register(name)}
    />
);

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7SchedulePTIData>;
    className?: string;
    disabled?: boolean;
}> = ({ name, form, className, disabled }) => (
    <input
        type="number"
        disabled={disabled}
        className={`w-full border rounded px-2 py-1 text-sm ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
        {...form.register(name, { valueAsNumber: true })}
    />
);

const Itr7SchedulePTI: React.FC<Itr7SchedulePTIProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'schedulePTI.investments',
    });

    const scheduleData = useWatch({ control: form.control, name: 'schedulePTI' });

    // Helper to calculate Net Income = Current Year Income - Share of Loss
    const calculateNet = (current: number, loss: number) => {
        return (Number(current) || 0) - (Number(loss) || 0);
    };

    useEffect(() => {
        if (!scheduleData?.investments) return;

        scheduleData.investments.forEach((inv, index) => {
            // House Property
            const hp = inv.heads_of_income?.house_property;
            if (hp) {
                const net = calculateNet(hp.current_year_income, hp.share_of_loss);
                if (net !== hp.net_income) form.setValue(`schedulePTI.investments.${index}.heads_of_income.house_property.net_income`, net);
            }

            // Capital Gains - Short Term
            const st111a = inv.heads_of_income?.capital_gains?.short_term?.section_111a;
            if (st111a) {
                const net = calculateNet(st111a.current_year_income, st111a.share_of_loss);
                if (net !== st111a.net_income) form.setValue(`schedulePTI.investments.${index}.heads_of_income.capital_gains.short_term.section_111a.net_income`, net);
            }
            const stOthers = inv.heads_of_income?.capital_gains?.short_term?.others;
            if (stOthers) {
                const net = calculateNet(stOthers.current_year_income, stOthers.share_of_loss);
                if (net !== stOthers.net_income) form.setValue(`schedulePTI.investments.${index}.heads_of_income.capital_gains.short_term.others.net_income`, net);
            }

            // Capital Gains - Long Term
            const lt112a = inv.heads_of_income?.capital_gains?.long_term?.section_112a;
            if (lt112a) {
                const net = calculateNet(lt112a.current_year_income, lt112a.share_of_loss);
                if (net !== lt112a.net_income) form.setValue(`schedulePTI.investments.${index}.heads_of_income.capital_gains.long_term.section_112a.net_income`, net);
            }
            const ltOthers = inv.heads_of_income?.capital_gains?.long_term?.other_than_112a;
            if (ltOthers) {
                const net = calculateNet(ltOthers.current_year_income, ltOthers.share_of_loss);
                if (net !== ltOthers.net_income) form.setValue(`schedulePTI.investments.${index}.heads_of_income.capital_gains.long_term.other_than_112a.net_income`, net);
            }

            // Other Sources
            const osDiv = inv.heads_of_income?.other_sources?.dividend;
            if (osDiv) {
                const net = calculateNet(osDiv.current_year_income, osDiv.share_of_loss);
                if (net !== osDiv.net_income) form.setValue(`schedulePTI.investments.${index}.heads_of_income.other_sources.dividend.net_income`, net);
            }
            const osOthers = inv.heads_of_income?.other_sources?.others;
            if (osOthers) {
                const net = calculateNet(osOthers.current_year_income, osOthers.share_of_loss);
                if (net !== osOthers.net_income) form.setValue(`schedulePTI.investments.${index}.heads_of_income.other_sources.others.net_income`, net);
            }

            // Exempt Income
            const ex23fbb = inv.heads_of_income?.income_claimed_exempt?.u_s_10_23fbb;
            if (ex23fbb) {
                const net = calculateNet(ex23fbb.current_year_income, ex23fbb.share_of_loss);
                if (net !== ex23fbb.net_income) form.setValue(`schedulePTI.investments.${index}.heads_of_income.income_claimed_exempt.u_s_10_23fbb.net_income`, net);
            }
            const exOther = inv.heads_of_income?.income_claimed_exempt?.other_exempt;
            if (exOther) {
                const net = calculateNet(exOther.current_year_income, exOther.share_of_loss);
                if (net !== exOther.net_income) form.setValue(`schedulePTI.investments.${index}.heads_of_income.income_claimed_exempt.other_exempt.net_income`, net);
            }

        });
    }, [scheduleData, form]);

    const renderRow = (label: string, subLabel: string, path: string, index: number, isHeader = false) => (
        <tr className="bg-white border-b">
            {isHeader && (
                <>
                    <td className="px-2 py-2 border text-center font-bold" rowSpan={10}>{index + 1}</td>
                    <td className="px-2 py-2 border" rowSpan={10}>
                        <TextInput name={`schedulePTI.investments.${index}.section`} form={form} className="mb-2" placeholder="Section" />
                        <TextInput name={`schedulePTI.investments.${index}.name_of_business_trust`} form={form} className="mb-2" placeholder="Name of business trust" />
                        <TextInput name={`schedulePTI.investments.${index}.pan_of_business_trust`} form={form} placeholder="PAN" />
                    </td>
                </>
            )}
            <td className="px-2 py-2 border font-medium">{label}</td>
            <td className="px-2 py-2 border">{subLabel}</td>
            <td className="px-2 py-2 border"><NumberInput name={`schedulePTI.investments.${index}.heads_of_income.${path}.current_year_income`} form={form} /></td>
            <td className="px-2 py-2 border"><NumberInput name={`schedulePTI.investments.${index}.heads_of_income.${path}.share_of_loss`} form={form} /></td>
            <td className="px-2 py-2 border"><NumberInput name={`schedulePTI.investments.${index}.heads_of_income.${path}.net_income`} form={form} disabled /></td>
            <td className="px-2 py-2 border"><NumberInput name={`schedulePTI.investments.${index}.heads_of_income.${path}.tds`} form={form} /></td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule PTI</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Pass Through Income details from business trust or investment fund as per section 115U, 115UA and 115UB
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border text-center">S.No</th>
                                <th className="px-2 py-2 border text-center w-[200px]">Invested in section 115U/115UA/115UB</th>
                                <th className="px-2 py-2 border text-center" colSpan={2}>Head of income</th>
                                <th className="px-2 py-2 border text-center">Current year income</th>
                                <th className="px-2 py-2 border text-center">Share of Current year loss distributed by Investment fund</th>
                                <th className="px-2 py-2 border text-center">Net Income / Loss 9=7-8</th>
                                <th className="px-2 py-2 border text-center">TDS on such amount</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-2 border text-center">(1)</th>
                                <th className="px-2 py-2 border text-center">(2)</th>
                                <th className="px-2 py-2 border text-center">(3)</th>
                                <th className="px-2 py-2 border text-center">(4)</th>
                                <th className="px-2 py-2 border text-center">(6)</th>
                                <th className="px-2 py-2 border text-center">(7)</th>
                                <th className="px-2 py-2 border text-center">(8)</th>
                                <th className="px-2 py-2 border text-center">(9)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <React.Fragment key={field.id}>
                                    {renderRow('i', 'House property', 'house_property', index, true)}
                                    {renderRow('ii', 'Capital Gains - Short term - Section 111A', 'capital_gains.short_term.section_111a', index)}
                                    {renderRow('', 'Capital Gains - Short term - Others', 'capital_gains.short_term.others', index)}
                                    {renderRow('', 'Capital Gains - Long term - Section 112A', 'capital_gains.long_term.section_112a', index)}
                                    {renderRow('', 'Capital Gains - Long term - Other than 112A', 'capital_gains.long_term.other_than_112a', index)}
                                    {renderRow('iii', 'Other Sources - Dividend', 'other_sources.dividend', index)}
                                    {renderRow('', 'Other Sources - Others', 'other_sources.others', index)}
                                    {renderRow('iv', 'Income claimed to be exempt - u/s 10(23FBB)', 'income_claimed_exempt.u_s_10_23fbb', index)}
                                    {renderRow('', 'Income claimed to be exempt - Other', 'income_claimed_exempt.other_exempt', index)}
                                    <tr className="bg-gray-50 border-b">
                                        <td colSpan={8} className="px-2 py-2 text-right">
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-600 hover:text-red-800 flex items-center justify-end w-full"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" /> Remove Investment
                                            </button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border" colSpan={8}>
                                    <button
                                        type="button"
                                        onClick={() => append({
                                            section: '', name_of_business_trust: '', pan_of_business_trust: '',
                                            heads_of_income: {} as any
                                        })}
                                        className="flex items-center text-blue-600 hover:text-blue-800"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add Investment
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7SchedulePTI;
