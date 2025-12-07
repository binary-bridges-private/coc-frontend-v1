import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportITR4ToPDF = (data: any) => {
  const doc: any = new jsPDF();

  const primaryColor = [33, 150, 243]; // Blue for ITR-4
  const secondaryColor = [200, 230, 255];
  const textColor = [40, 40, 40];

  let finalY = 20;

  // --- Header ---
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.text("ITR-4 SUGAM Report", 14, finalY);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 160, finalY);

  finalY += 10;
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(14, finalY, 196, finalY);
  finalY += 10;

  // --- Personal Information ---
  if (data.partAGeneral) {
    doc.setFontSize(14);
    doc.setTextColor(...textColor);
    doc.text("Part A - General Information", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Field", "Value"]],
      body: [
        [
          "Name",
          `${data.partAGeneral.firstName} ${data.partAGeneral.lastName}`,
        ],
        ["PAN", data.partAGeneral.pan],
        ["DOB", data.partAGeneral.dateOfBirth],
        [
          "Address",
          `${data.partAGeneral.townCityDistrict}, ${data.partAGeneral.state}`,
        ],
        ["Status", data.partAGeneral.status],
        [
          "Tax Regime",
          data.partAGeneral.taxRegimeOption === "yes-exercised"
            ? "Old Regime"
            : "New Regime u/s 115BAC",
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: primaryColor as any },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Gross Total Income (Part B) ---
  if (data.partBGTI) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Part B - Gross Total Income", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Income from Business (Schedule BP)",
          (Number(data.partBGTI.b1_incomeFromBusiness) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          "Income from Salary",
          (Number(data.partBGTI.b2_incomeFromSalary) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          "Income from House Property",
          (
            Number(data.partBGTI.b3_incomeFromHouseProperty) || 0
          ).toLocaleString("en-IN"),
        ],
        [
          "Income from Other Sources",
          (Number(data.partBGTI.b4_incomeFromOtherSources) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          { content: "Gross Total Income", styles: { fontStyle: "bold" } },
          {
            content: (
              Number(data.partBGTI.b5_grossTotalIncome) || 0
            ).toLocaleString("en-IN"),
            styles: { fontStyle: "bold" },
          },
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [76, 175, 80] }, // Green
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Deductions (Part C) ---
  if (data.partCDeductions) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Part C - Deductions", 14, finalY);

    const deductionsBody = [];
    if (Number(data.partCDeductions.c1_80c) > 0)
      deductionsBody.push([
        "80C",
        Number(data.partCDeductions.c1_80c).toLocaleString("en-IN"),
      ]);
    if (Number(data.partCDeductions.c6_80d) > 0)
      deductionsBody.push([
        "80D",
        Number(data.partCDeductions.c6_80d).toLocaleString("en-IN"),
      ]);

    deductionsBody.push([
      { content: "Total Deductions", styles: { fontStyle: "bold" } },
      {
        content: (
          Number(data.partCDeductions.c19_totalDeductions) || 0
        ).toLocaleString("en-IN"),
        styles: { fontStyle: "bold" },
      },
    ]);
    deductionsBody.push([
      { content: "Taxable Total Income", styles: { fontStyle: "bold" } },
      {
        content: (
          Number(data.partCDeductions.c20_taxableTotalIncome) || 0
        ).toLocaleString("en-IN"),
        styles: { fontStyle: "bold" },
      },
    ]);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: deductionsBody as any,
      theme: "striped",
      headStyles: { fillColor: [156, 39, 176] }, // Purple
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Tax Computation (Part D) ---
  if (data.partDTaxComputations) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Part D - Tax Computation", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Tax Payable on Total Income",
          (
            Number(data.partDTaxComputations.d1_taxPayableOnTotalIncome) || 0
          ).toLocaleString("en-IN"),
        ],
        [
          "Rebate u/s 87A",
          (Number(data.partDTaxComputations.d2_rebate87A) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          "Tax Payable after Rebate",
          (
            Number(data.partDTaxComputations.d3_taxPayableAfterRebate) || 0
          ).toLocaleString("en-IN"),
        ],
        [
          "Health & Education Cess",
          (
            Number(data.partDTaxComputations.d4_healthAndEducationCess) || 0
          ).toLocaleString("en-IN"),
        ],
        [
          { content: "Total Tax & Cess", styles: { fontStyle: "bold" } },
          {
            content: (
              Number(data.partDTaxComputations.d5_totalTaxAndCess) || 0
            ).toLocaleString("en-IN"),
            styles: { fontStyle: "bold" },
          },
        ],
        [
          { content: "Amount Payable / Refund", styles: { fontStyle: "bold" } },
          {
            content: (
              Number(data.partDTaxComputations.d14_amountPayableOrRefund) || 0
            ).toLocaleString("en-IN"),
            styles: { fontStyle: "bold" },
          },
        ],
      ] as any,
      theme: "striped",
      headStyles: { fillColor: [244, 67, 54] }, // Red
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Footer ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
    doc.text("Generated by ClearTax Clone", 14, 290);
  }

  doc.save(
    `ITR-4_${data.partAGeneral?.pan || "Draft"}_${new Date().getFullYear()}.pdf`
  );
};
