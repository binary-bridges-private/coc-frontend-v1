import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7ScheduleSIData } from './itr-7-schedule-si.types.ts';

export interface Itr7ScheduleSIProps {
    form: UseFormReturn<ITR7ScheduleSIData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleSIData>;
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

const CheckboxInput: React.FC<{
    checked?: boolean;
    disabled?: boolean;
}> = ({ checked, disabled }) => (
    <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        readOnly
    />
);

const FIXED_ROWS = [
    { id: '1a', desc: '111A or section 115AD(1)(b)(ii)- Proviso (STCG on shares/equity oriented MF on which STT paid) [where transfer was before 23rd July 2024 as applicable]', rate: '15', section_code: '111A_15' },
    { id: '1b', desc: '111A or section 115AD(1)(b)(ii)- Proviso (STCG on shares units on which STT paid) [ where transfer was on or after 23rd July 2024 as applicable]', rate: '20', section_code: '111A_20' },
    { id: '2', desc: '115AD (STCG for FIIs on securities where STT not paid)', rate: '30', section_code: '115AD_30' },
    { id: '3a', desc: 'Proviso 112(1) (LTCG on listed securities/ units with indexation) [where transfer was before 23rd July 2024 as applicable and tax thereon after taking into account Sl. no. B4(f) of Schedule CG, if any.]', rate: '20 (as reduced by B4(f) of Schedule CG, if any)', section_code: '112_1_20' },
    { id: '3b', desc: '112(1) (LTCG on listed securities/ units) [where transfer was on or after 23rd July 2024 as applicable]', rate: '12.5', section_code: '112_1_12_5' },
    { id: '4a', desc: '112(1)(c)(iii) (LTCG for non-resident on unlisted securities) [where transfer was before 23rd July 2024 as applicable]', rate: '10', section_code: '112_1_c_iii_10' },
    { id: '4b', desc: '112(1)(c)(iii) (LTCG for non-resident on unlisted securities or other than Listed Debentures) [where transfer was on or after 23rd July 2024 as applicable]', rate: '12.5', section_code: '112_1_c_iii_12_5' },
    { id: '5a', desc: '115AB (LTCG for non-resident on units referred in section115AB) [where transfer was before 23rd July 2024 as applicable]', rate: '10', section_code: '115AB_10' },
    { id: '5b', desc: '115AB (LTCG for non-resident on units referred in section115AB) where transfer was on or after 23rd July 2024 as applicable]', rate: '12.5', section_code: '115AB_12_5' },
    { id: '6a', desc: '115AC (LTCG for non-resident on bonds/GDR) [where transfer was before 23rd July 2024 as applicable]', rate: '10', section_code: '115AC_10' },
    { id: '6b', desc: '115AC (LTCG for non-resident on bonds/GDR) [where transfer was on or after 23rd July 2024 as applicable]', rate: '12.5', section_code: '115AC_12_5' },
    { id: '7', desc: '115AD (LTCG for FII on securities)', rate: '10', section_code: '115AD_10' },
    { id: '8a', desc: '112 (LTCG on others) [where transfer was before 23rd July 2024 as applicable]', rate: '20', section_code: '112_others_20' },
    { id: '8b', desc: '112 (LTCG on others) [where transfer was on or after 23rd July 2024 as applicable]', rate: '12.5', section_code: '112_others_12_5' },
    { id: '9a', desc: '112A (LTCG on sale of shares or units on which STT is paid) or section 115AD(1)(b)(iii)-Proviso [where transfer was before 23rd July 2024 as applicable]', rate: '10', section_code: '112A_10' },
    { id: '9b', desc: '112A (LTCG on sale of shares or units on which STT is paid) or section 115AD(1)(b)(iii)-Proviso [where transfer was on or after 23rd July 2024 as applicable]', rate: '12.5', section_code: '112A_12_5' },
    { id: '10', desc: 'STCG chargeable at special rates in India as per DTAA', rate: 'checkbox', section_code: 'STCG_DTAA' },
    { id: '11', desc: 'LTCG Chargeable at special rates in India as per DTAA', rate: 'checkbox', section_code: 'LTCG_DTAA' },
    { id: '12', desc: '115B (Profits and gains of life insurance business)', rate: '12.50', section_code: '115B' },
    { id: '13a', desc: '115AC ((Income by way of interest received by non-resident from bonds purchased in foreign currency)', rate: '10', section_code: '115AC_interest' },
    { id: '13b', desc: '115AC (Income by way of Dividend received by non-resident on GDR purchased in foreign currency)', rate: '10', section_code: '115AC_dividend' },
    { id: '14', desc: '115BB (Winnings from lotteries, puzzles, races, games etc.)', rate: '30', section_code: '115BB' },
    { id: '15', desc: '115BBJ (Winnings from online games)', rate: '30', section_code: '115BBJ' },
    { id: '16', desc: '115BBH- Tax on Income from Virtual Digital asset', rate: '30', section_code: '115BBH' },
    { id: '16A', desc: 'A Income under head business or profession', rate: '30', section_code: '115BBH_BP' },
    { id: '16B', desc: 'B Income under head Capital Gain', rate: '30', section_code: '115BBH_CG' },
    { id: '17', desc: '115BBE (Income under section 68, 69, 69A, 69B, 69C or 69D)', rate: '60', section_code: '115BBE' },
    { id: '18', desc: '115A(1)(b)(A) & 115A(1)(b)(B)(Income of a foreign company from Royalty & Fees for Technical Services )', rate: '10', section_code: '115A_1_b' },
    { id: '19', desc: '115BBF ( Income from patent)', rate: '', section_code: '115BBF' },
    { id: '19a', desc: 'a Income under head business or profession', rate: '10', section_code: '115BBF_BP' },
    { id: '19b', desc: 'b Income under head other sources', rate: '10', section_code: '115BBF_OS' },
    { id: '20', desc: '115BBG (Income from transfer of carbon credits)', rate: '10', section_code: '115BBG' },
    { id: '21', desc: 'Income from other sources chargeable at special rates in India as per DTAA', rate: 'checkbox', section_code: 'OS_DTAA' },
    { id: '22a', desc: 'Pass Through Income in the nature of Short Term Capital Gain chargeable @ 15%', rate: '15', section_code: 'PTI_STCG_15' },
    { id: '22b', desc: 'Pass Through Income in the nature of Short Term Capital Gain chargeable @ 20%', rate: '20', section_code: 'PTI_STCG_20' },
    { id: '23', desc: 'Pass Through Income in the nature of Short Term Capital Gain chargeable @ 30%', rate: '30', section_code: 'PTI_STCG_30' },
    { id: '24a', desc: 'Pass Through Income in the nature of Long Term Capital Gain chargeable @ 10% u/s 112A', rate: '10', section_code: 'PTI_LTCG_112A_10' },
    { id: '24b', desc: 'Pass Through Income in the nature of Long Term Capital Gain chargeable @ 12.5% u/s 112A', rate: '12.5', section_code: 'PTI_LTCG_112A_12_5' },
    { id: '25', desc: 'Pass Through Income in the nature of Long Term Capital Gain chargeable @ 20%', rate: '20', section_code: 'PTI_LTCG_20' },
    { id: '26a', desc: 'Pass Through Income in the nature of Long Term Capital Gain chargeable @ 10% other than section 112A', rate: '10', section_code: 'PTI_LTCG_other_10' },
    { id: '26b', desc: 'Pass Through Income in the nature of Long Term Capital Gain chargeable @ 12.5% other than section 112A', rate: '12.5', section_code: 'PTI_LTCG_other_12_5' },
    { id: '27', desc: 'Pass through income in the nature of income from other source chargeable at special rates (Drop down to be provided in e-filing utility)', rate: 'checkbox', section_code: 'PTI_OS_Special' },
    { id: '28', desc: 'Income received in respect of units purchased in foreign currency by an off-shore fund-115AB(1)', rate: '10', section_code: '115AB_1' },
    { id: '29', desc: 'Income from royalty where agreement entered between 31.3.1961 to 31.3.1976 and income from fees for technical services where agreement entered between 29.2.1964 and 31.3.1976, and agreement is approved by the Central Government. Paragraph EII of Part I of first schedule of Finance Act', rate: '50', section_code: 'Royalty_Old' },
    { id: '30', desc: 'Any other income chargeable at special rate (Drop down to be provided in e-filing utility)', rate: 'checkbox', section_code: 'Any_Other_Special' },
];

const Itr7ScheduleSI: React.FC<Itr7ScheduleSIProps> = ({ form }) => {
    const { fields, replace } = useFieldArray({
        control: form.control,
        name: 'scheduleSI.items',
    });

    const scheduleData = useWatch({ control: form.control, name: 'scheduleSI' });

    useEffect(() => {
        if (fields.length === 0) {
            replace(FIXED_ROWS.map(row => ({
                section_code: row.section_code,
                special_rate: row.rate,
                income: 0,
                tax_thereon: 0
            })));
        }
    }, [fields.length, replace]);

    useEffect(() => {
        if (!scheduleData?.items) return;

        let totalIncome = 0;
        let totalTax = 0;

        scheduleData.items.forEach(item => {
            totalIncome += Number(item.income) || 0;
            totalTax += Number(item.tax_thereon) || 0;
        });

        form.setValue('scheduleSI.total_income', totalIncome);
        form.setValue('scheduleSI.total_tax', totalTax);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule SI</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Income chargeable to tax at special rates [Please see instructions) for section and rate of tax]
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]">Sl No</th>
                                <th className="px-2 py-2 border min-w-[400px]">Section/Description</th>
                                <th className="px-2 py-2 border min-w-[100px] text-center">Special rate (%)</th>
                                <th className="px-2 py-2 border min-w-[150px] text-center">Income (i)</th>
                                <th className="px-2 py-2 border min-w-[150px] text-center">Tax thereon (ii)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FIXED_ROWS.map((row, index) => (
                                <tr key={row.section_code} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-2 border text-center font-medium">{row.id}</td>
                                    <td className="px-2 py-2 border">{row.desc}</td>
                                    <td className="px-2 py-2 border text-center">
                                        {row.rate === 'checkbox' ? <CheckboxInput checked disabled /> : row.rate}
                                    </td>
                                    <td className="px-2 py-2 border">
                                        {row.rate !== '' && <NumberInput name={`scheduleSI.items.${index}.income`} form={form} />}
                                    </td>
                                    <td className="px-2 py-2 border">
                                        {row.rate !== '' && <NumberInput name={`scheduleSI.items.${index}.tax_thereon`} form={form} />}
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border text-right">Total</td>
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleSI.total_income" form={form} disabled /></td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleSI.total_tax" form={form} disabled /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleSI;
