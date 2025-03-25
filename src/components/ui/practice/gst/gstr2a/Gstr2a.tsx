import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Invoice {
  supplierGSTIN: string;
  invoiceNo: string;
  invoiceDate: string;
  taxableAmount: string;
  igst?: string;
  cgst?: string;
  sgst?: string;
  totalInvoiceValue: string;
}

const Gstr2a: React.FC = () => {

  const navigate = useNavigate();

  const invoiceData: Invoice[] = [
    {
      supplierGSTIN: '09AAACC1234A1Z5',
      invoiceNo: '001/2025',
      invoiceDate: '10-Mar-2025',
      taxableAmount: '₹50,000',
      igst: '₹9,000',
      totalInvoiceValue: '₹59,000'
    },
    {
      supplierGSTIN: '07BBBCC5678B1Z4',
      invoiceNo: 'INV-456',
      invoiceDate: '05-Mar-2025',
      taxableAmount: '₹1,20,000',
      cgst: '₹10,800',
      sgst: '₹10,800',
      totalInvoiceValue: '₹1,41,600'
    },
    {
      supplierGSTIN: '06XYZCD8901X1Z9',
      invoiceNo: '1008',
      invoiceDate: '02-Mar-2025',
      taxableAmount: '₹30,000',
      igst: '₹5,400',
      totalInvoiceValue: '₹35,400'
    },
    {
      supplierGSTIN: '27POQWE2345R1Z3',
      invoiceNo: '789/2025',
      invoiceDate: '28-Feb-2025',
      taxableAmount: '₹75,000',
      cgst: '₹6,750',
      sgst: '₹6,750',
      totalInvoiceValue: '₹88,500'
    },
    {
      supplierGSTIN: '10LMNXY1234P1Z7',
      invoiceNo: '1509',
      invoiceDate: '01-Mar-2025',
      taxableAmount: '₹90,000',
      igst: '₹16,200',
      totalInvoiceValue: '₹1,06,200'
    },
    {
      supplierGSTIN: '29QRSTU6789Q1Z6',
      invoiceNo: '3221',
      invoiceDate: '26-Feb-2025',
      taxableAmount: '₹40,000',
      cgst: '₹3,600',
      sgst: '₹3,600',
      totalInvoiceValue: '₹47,200'
    },
    {
      supplierGSTIN: '21ABCDE2345L1Z8',
      invoiceNo: '550',
      invoiceDate: '15-Feb-2025',
      taxableAmount: '₹60,000',
      igst: '₹10,800',
      totalInvoiceValue: '₹70,800'
    },
    {
      supplierGSTIN: '19XYZFF8765K1Z9',
      invoiceNo: '9876',
      invoiceDate: '12-Feb-2025',
      taxableAmount: '₹25,000',
      cgst: '₹2,250',
      sgst: '₹2,250',
      totalInvoiceValue: '₹29,500'
    },
    {
      supplierGSTIN: '24PQREZ4321D1Z4',
      invoiceNo: 'INV-999',
      invoiceDate: '20-Feb-2025',
      taxableAmount: '₹85,000',
      igst: '₹15,300',
      totalInvoiceValue: '₹1,00,300'
    },
    {
      supplierGSTIN: '23ABCFG5678N1Z2',
      invoiceNo: '1102',
      invoiceDate: '25-Mar-2025',
      taxableAmount: '₹1,00,000',
      cgst: '₹9,000',
      sgst: '₹9,000',
      totalInvoiceValue: '₹1,18,000'
    }
  ];

  return (
    <>
      <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg  breadcrumbs">
        <ul>
          <li className="cursor-pointer" onClick={() => navigate("/practice")}>Practice</li>
          <li className="cursor-pointer" onClick={() => navigate("/practice/gst")}>Gst</li>
          <li>Gstr-2a</li>
        </ul>
      </div>
      <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">GSTR-2A Invoice Details</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 font-semibold text-left text-gray-700 border-b">Supplier GSTIN</th>
                <th className="p-3 font-semibold text-left text-gray-700 border-b">Invoice No</th>
                <th className="p-3 font-semibold text-left text-gray-700 border-b">Invoice Date</th>
                <th className="p-3 font-semibold text-right text-gray-700 border-b">Taxable Amount</th>
                <th className="p-3 font-semibold text-right text-gray-700 border-b">IGST</th>
                <th className="p-3 font-semibold text-right text-gray-700 border-b">CGST</th>
                <th className="p-3 font-semibold text-right text-gray-700 border-b">SGST</th>
                <th className="p-3 font-semibold text-right text-gray-700 border-b">Total Invoice Value</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((invoice, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 text-left text-gray-700 border-b">{invoice.supplierGSTIN}</td>
                  <td className="p-3 text-left text-gray-700 border-b">{invoice.invoiceNo}</td>
                  <td className="p-3 text-left text-gray-700 border-b">{invoice.invoiceDate}</td>
                  <td className="p-3 text-right text-gray-700 border-b">{invoice.taxableAmount}</td>
                  <td className="p-3 text-right text-gray-700 border-b">{invoice.igst || '-'}</td>
                  <td className="p-3 text-right text-gray-700 border-b">{invoice.cgst || '-'}</td>
                  <td className="p-3 text-right text-gray-700 border-b">{invoice.sgst || '-'}</td>
                  <td className="p-3 font-medium text-right text-gray-800 border-b">{invoice.totalInvoiceValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {invoiceData.length} invoices
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gstr2a;