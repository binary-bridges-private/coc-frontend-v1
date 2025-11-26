import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR8FormData } from '../itr-8.types';

interface Itr8ScheduleGstProps {
  form: UseFormReturn<ITR8FormData>;
}

/**
 * Schedule GST - Information Regarding Turnover/Gross Receipt Reported for GST
 * Mandatory for businesses registered under GST
 * Tracks GST turnover details for verification and reconciliation
 */
export const Itr8ScheduleGst: React.FC<Itr8ScheduleGstProps> = ({ form }) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg">
      <div className="bg-green-50 border-l-4 border-green-600 p-4">
        <h2 className="text-lg font-bold text-green-900">Schedule GST - GST Turnover Information</h2>
        <p className="text-sm text-green-800 mt-1">
          Information Regarding Turnover/Gross Receipt Reported for GST
        </p>
        <p className="text-xs text-green-700 mt-2">
          Mandatory for HUFs registered under GST Act, 2017. Provide information for each GSTIN separately.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded">
        <h3 className="font-semibold text-amber-900 mb-3">GST Information</h3>
        <p className="text-sm text-amber-800 mb-4">
          Please furnish the information below for each GSTIN No. separately
        </p>

        <div className="space-y-6">
          {/* GSTIN Entry 1 */}
          <div className="border rounded-lg p-4 bg-white">
            <h4 className="font-semibold mb-4">GSTIN Entry #1</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GSTIN No(s). <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={15}
                  placeholder="15-character GSTIN"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gst_gstin_1')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual value of outward supplies as per GST return(s) filed <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gst_turnover_1', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>

          {/* GSTIN Entry 2 */}
          <div className="border rounded-lg p-4 bg-white">
            <h4 className="font-semibold mb-4">GSTIN Entry #2</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GSTIN No(s).
                </label>
                <input
                  type="text"
                  maxLength={15}
                  placeholder="15-character GSTIN"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gst_gstin_2')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual value of outward supplies as per GST return(s) filed
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gst_turnover_2', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>

          {/* GSTIN Entry 3 */}
          <div className="border rounded-lg p-4 bg-white">
            <h4 className="font-semibold mb-4">GSTIN Entry #3</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GSTIN No(s).
                </label>
                <input
                  type="text"
                  maxLength={15}
                  placeholder="15-character GSTIN"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gst_gstin_3')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual value of outward supplies as per GST return(s) filed
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gst_turnover_3', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-800 mb-3">GST Reconciliation Note</h3>
        <div className="space-y-2 text-sm">
          <div className="text-gray-600 italic">
            <span>Ensure GST turnover matches income reported in return. Furnish the information above for each GSTIN No. separately</span>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
        <h4 className="font-semibold text-blue-900 mb-2">Important Notes:</h4>
        <ul className="list-disc list-inside space-y-1 text-blue-800">
          <li>This schedule is mandatory for all HUFs with GST registration</li>
          <li>GSTIN must be 15-character alphanumeric code</li>
          <li>Annual value of outward supplies should match GST return (GSTR-9/GSTR-9C)</li>
          <li>Provide separate entry for each GSTIN held during the financial year</li>
          <li>In case of variations, provide explanation/reconciliation</li>
          <li>Non-resident taxable persons should declare all GSTINs</li>
          <li>Cancelled GSTINs should also be reported for the period they were active</li>
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm">
        <h4 className="font-semibold text-amber-900 mb-2">Instructions for Filling:</h4>
        <ul className="list-disc list-inside space-y-1 text-amber-800">
          <li>Enter GSTIN exactly as registered with GST authorities</li>
          <li>Annual value should include all supplies (taxable, nil-rated, exempt)</li>
          <li>If multiple GSTINs, ensure no duplication of turnover</li>
          <li>Cross-check with GST GSTR-9 annual return before submission</li>
          <li>Update registration status if changed during the year</li>
        </ul>
      </div>
    </div>
  );
};

export default Itr8ScheduleGst;
