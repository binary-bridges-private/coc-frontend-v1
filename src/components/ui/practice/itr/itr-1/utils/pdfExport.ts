import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ITR1ExportData } from "./csvExport.ts";

export const exportITR1ToPDF = (data: ITR1ExportData) => {
  const doc: any = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 100);
  doc.text("ITR-1 (SAHAJ) - Assessment Year 2025-26", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 26);
  doc.text(`PAN: ${data.pan || "N/A"}`, 150, 26);

  let finalY = 30;

  // --- Personal Information Section ---
  autoTable(doc, {
    startY: finalY + 5,
    head: [["Field", "Value"]],
    body: [
      [
        "Full Name",
        `${data.firstName || ""} ${data.middleName || ""} ${
          data.lastName || ""
        }`.trim(),
      ],
      ["PAN", data.pan || ""],
      ["Aadhaar Number", data.aadhar || ""],
      ["Date of Birth", data.dateOfBirth || ""],
      ["Gender", data.gender || ""],
      ["Email", data.email || ""],
      ["Mobile", data.mobileNumber || ""],
      [
        "Address",
        `${data.flatDoorBlockNo || ""} ${data.nameOfPremises || ""} ${
          data.roadStreetPostOffice || ""
        } ${data.areaLocality || ""} ${data.city || ""} ${data.state || ""} ${
          data.pincode || ""
        }`.trim(),
      ],
      ["Nature of Employment", data.natureOfEmployment || ""],
      ["Tax Regime", data.taxRegime || ""],
      ["Filing Status", data.filingStatus || ""],
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 133, 244] },
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 80 } },
  });

  finalY = (doc as any).lastAutoTable.finalY + 10;

  // --- Gross Total Income ---
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("Gross Total Income", 14, finalY);

  autoTable(doc, {
    startY: finalY + 5,
    head: [["Description", "Amount (Rs.)"]],
    body: [
      ["Gross Salary", (data.grossSalaryIncome || 0).toLocaleString("en-IN")],
      [
        "Less: Exempt Allowances",
        (data.exemptAllowances || 0).toLocaleString("en-IN"),
      ],
      [
        "Less: Standard Deduction",
        (data.standardDeduction16 || 0).toLocaleString("en-IN"),
      ],
      [
        "Less: Processional Tax / Ent. Allow",
        (
          (data.professionalTax || 0) + (data.entertainmentAllowance || 0)
        ).toLocaleString("en-IN"),
      ],
      ["Net Salary", (data.netSalaryIncome || 0).toLocaleString("en-IN")],
      [
        "Income from House Property",
        (data.housePropertyIncome || 0).toLocaleString("en-IN"),
      ],
      [
        "Income from Other Sources",
        (data.otherSourcesIncome || 0).toLocaleString("en-IN"),
      ],
      [
        "Gross Total Income",
        (data.grossTotalIncome || 0).toLocaleString("en-IN"),
      ],
    ],
    theme: "striped",
    headStyles: { fillColor: [40, 167, 69] }, // Green
    columnStyles: { 1: { halign: "right" } },
  });

  finalY = (doc as any).lastAutoTable.finalY + 10;

  // --- Deductions ---
  doc.setFontSize(14);
  doc.text("Deductions & Taxable Income", 14, finalY);

  autoTable(doc, {
    startY: finalY + 5,
    head: [["Section", "Amount (Rs.)"]],
    body: [
      ["80C (LIC, PPF, etc.)", (data.section80C || 0).toLocaleString("en-IN")],
      [
        "80D (Health Insurance)",
        (data.section80D || 0).toLocaleString("en-IN"),
      ],
      ["80CCD(1B) (NPS)", (data.section80CCD1B || 0).toLocaleString("en-IN")],
      [
        "80CCD(2) (Employer NPS)",
        (data.section80CCD2 || 0).toLocaleString("en-IN"),
      ],
      [
        "80TTA/TTB (Interest)",
        ((data.section80TTA || 0) + (data.section80TTB || 0)).toLocaleString(
          "en-IN"
        ),
      ],
      [
        "Other Deductions",
        (
          (data.totalDeductions || 0) -
          (data.section80C || 0) -
          (data.section80D || 0) -
          (data.section80CCD1B || 0) -
          (data.section80CCD2 || 0) -
          (data.section80TTA || 0) -
          (data.section80TTB || 0)
        ).toLocaleString("en-IN"),
      ],
      [
        { content: "Total Deductions", styles: { fontStyle: "bold" } },
        {
          content: (data.totalDeductions || 0).toLocaleString("en-IN"),
          styles: { fontStyle: "bold" },
        },
      ],
      [
        {
          content: "Total Taxable Income",
          styles: { fontStyle: "bold", fillColor: [240, 240, 240] },
        },
        {
          content: (data.totalIncome || 0).toLocaleString("en-IN"),
          styles: { fontStyle: "bold", fillColor: [240, 240, 240] },
        },
      ],
    ],
    theme: "striped",
    headStyles: { fillColor: [255, 193, 7] }, // Yellow/Orange
    columnStyles: { 1: { halign: "right" } },
  });

  finalY = (doc as any).lastAutoTable.finalY + 10;

  // --- Tax Computation ---
  // Check if we need a new page
  if (finalY > 250) {
    doc.addPage();
    finalY = 20;
  }

  doc.setFontSize(14);
  doc.text("Tax Computation", 14, finalY);

  autoTable(doc, {
    startY: finalY + 5,
    head: [["Description", "Amount (Rs.)"]],
    body: [
      [
        "Tax Payable on Total Income",
        (data.taxPayableOnTotalIncome || 0).toLocaleString("en-IN"),
      ],
      ["Rebate u/s 87A", (data.rebate87A || 0).toLocaleString("en-IN")],
      [
        "Tax Payable after Rebate",
        (data.taxPayableAfterRebate || 0).toLocaleString("en-IN"),
      ],
      [
        "Health and Education Cess",
        (data.healthAndEducationCess || 0).toLocaleString("en-IN"),
      ],
      [
        "Total Tax and Cess",
        (data.totalTaxAndCess || 0).toLocaleString("en-IN"),
      ],
      ["Relief u/s 89", (data.relief89 || 0).toLocaleString("en-IN")],
      [
        { content: "Balance Tax Payable", styles: { fontStyle: "bold" } },
        {
          content: (data.balanceTaxAfterRelief || 0).toLocaleString("en-IN"),
          styles: { fontStyle: "bold" },
        },
      ],
      ["Interest & Fees", (data.totalInterestFee || 0).toLocaleString("en-IN")],
      [
        {
          content: "Total Tax, Fee & Interest",
          styles: { fontStyle: "bold", fontSize: 11 },
        },
        {
          content: (data.totalTaxFeeInterest || 0).toLocaleString("en-IN"),
          styles: { fontStyle: "bold", fontSize: 11 },
        },
      ],
    ],
    theme: "striped",
    headStyles: { fillColor: [220, 53, 69] }, // Red
    columnStyles: { 1: { halign: "right" } },
  });

  finalY = (doc as any).lastAutoTable.finalY + 20;

  // Footer / Verification
  doc.setFontSize(10);
  doc.setTextColor(50);
  const text = `I, ${data.firstName || ""} ${
    data.lastName || ""
  }, son/daughter of ${
    data.middleName || "___________"
  }, solemnly declare that to the best of my knowledge and belief, the information given in the return and the schedules thereto is correct and complete and is in accordance with the provisions of the Income-tax Act, 1961.`;

  const splitText = doc.splitTextToSize(text, 180);
  doc.text(splitText, 14, finalY);

  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, finalY + 20);
  doc.text(`Place: ${data.city || "___________"}`, 100, finalY + 20);

  doc.save(`ITR-1_${data.pan || "Draft"}_${new Date().getFullYear()}.pdf`);
};
