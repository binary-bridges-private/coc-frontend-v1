import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportITR3ToPDF = (data: any) => {
  const doc: any = new jsPDF();

  const primaryColor = [255, 122, 0]; // Orange for ITR-3
  const secondaryColor = [255, 230, 200];
  const textColor = [40, 40, 40];

  let finalY = 20;

  // --- Header ---
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.text("ITR-3 Form Report", 14, finalY);

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
          `${data.partAGeneral.a1_firstName} ${data.partAGeneral.a3_lastName}`,
        ],
        ["PAN", data.partAGeneral.a4_pan],
        ["DOB", data.partAGeneral.a8_dateOfBirth],
        [
          "Address",
          `${data.partAGeneral.a10_townCityDistrict}, ${data.partAGeneral.a11_state}`,
        ],
        ["Status", data.partAGeneral.a14_status],
        [
          "Tax Regime",
          data.partAGeneral.a19b_taxRegimeOption === "Yes"
            ? "New Regime u/s 115BAC"
            : "Old Regime",
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: primaryColor as any },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Salary Income (Schedule S) ---
  if (data.scheduleS) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Schedule S - Income from Salaries", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Gross Salary",
          (Number(data.scheduleS.grossSalary) || 0).toLocaleString("en-IN"),
        ],
        [
          "Allowances Exempt",
          (Number(data.scheduleS.allowancesExempt) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          "Net Salary",
          (Number(data.scheduleS.netSalary) || 0).toLocaleString("en-IN"),
        ],
        [
          "Deductions u/s 16",
          (Number(data.scheduleS.deductionsUs16) || 0).toLocaleString("en-IN"),
        ],
        [
          {
            content: "Income Chargeable under Salaries",
            styles: { fontStyle: "bold" },
          },
          {
            content: (
              Number(data.scheduleS.incomeChargeableUnderSalaries) || 0
            ).toLocaleString("en-IN"),
            styles: { fontStyle: "bold" },
          },
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [0, 150, 136] }, // Teal
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- House Property (Schedule HP) ---
  if (data.scheduleHP) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Schedule HP - Income from House Property", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Annual Value",
          (Number(data.scheduleHP.annualValue) || 0).toLocaleString("en-IN"),
        ],
        [
          "Standard Deduction (30%)",
          (Number(data.scheduleHP.stdDeduction) || 0).toLocaleString("en-IN"),
        ],
        [
          "Interest on Borrowed Capital",
          (Number(data.scheduleHP.interestPayable) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          {
            content: "Income from House Property",
            styles: { fontStyle: "bold" },
          },
          {
            content: (
              Number(data.scheduleHP.annualValueCalculated) || 0
            ).toLocaleString("en-IN"),
            styles: { fontStyle: "bold" },
          },
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [63, 81, 181] }, // Indigo
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Business Income (Schedule BP) ---
  if (data.scheduleBP) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Schedule BP - Profits and Gains from Business", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Income from Business/Profession",
          (
            Number(data.scheduleBP.incomeFromBusinessProfession) || 0
          ).toLocaleString("en-IN"),
        ],
        [
          "Speculative Business Income",
          (
            Number(data.scheduleBP.speculativeBusinessIncome) || 0
          ).toLocaleString("en-IN"),
        ],
        [
          "Specified Business Income",
          (Number(data.scheduleBP.specifiedBusinessIncome) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          { content: "Total Business Income", styles: { fontStyle: "bold" } },
          {
            content: (
              Number(data.scheduleBP.totalBusinessIncome) || 0
            ).toLocaleString("en-IN"),
            styles: { fontStyle: "bold" },
          },
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [156, 39, 176] }, // Purple
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Capital Gains (Schedule CG & 112A) ---
  if (data.scheduleCG || data.schedule112A || data.scheduleVDA) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Capital Gains", 14, finalY);

    const cgBody = [];
    if (data.scheduleCG?.stcg) {
      cgBody.push([
        "Short Term Capital Gains",
        (Number(data.scheduleCG.stcg.totalSTCG) || 0).toLocaleString("en-IN"),
      ]);
    }
    if (data.scheduleCG?.ltcg) {
      cgBody.push([
        "Long Term Capital Gains",
        (Number(data.scheduleCG.ltcg.totalLTCG) || 0).toLocaleString("en-IN"),
      ]);
    }
    if (data.schedule112A) {
      cgBody.push([
        "LTCG u/s 112A (Equity)",
        (Number(data.schedule112A.totalLTCG) || 0).toLocaleString("en-IN"),
      ]);
    }
    if (data.scheduleVDA) {
      cgBody.push([
        "Income from VDA (Crypto)",
        (Number(data.scheduleVDA.totalIncomeFromVDA) || 0).toLocaleString(
          "en-IN"
        ),
      ]);
    }

    if (cgBody.length > 0) {
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Description", "Amount (Rs.)"]],
        body: cgBody,
        theme: "striped",
        headStyles: { fillColor: [255, 87, 34] }, // Deep Orange
        columnStyles: { 1: { halign: "right" } },
      });
      finalY = doc.lastAutoTable.finalY + 10;
    } else {
      finalY += 10;
    }
  }

  // --- Other Sources (Schedule OS) ---
  if (data.scheduleOS) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Schedule OS - Income from Other Sources", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Interest (Savings/Deposits)",
          (Number(data.scheduleOS.grossInterest) || 0).toLocaleString("en-IN"),
        ],
        [
          "Dividend Income",
          (Number(data.scheduleOS.dividendIncome) || 0).toLocaleString("en-IN"),
        ],
        [
          "Other Income",
          (Number(data.scheduleOS.anyOtherIncome) || 0).toLocaleString("en-IN"),
        ],
        [
          { content: "Total OS Income", styles: { fontStyle: "bold" } },
          {
            content: (
              Number(data.scheduleOS.totalIncomeFromOS) || 0
            ).toLocaleString("en-IN"),
            styles: { fontStyle: "bold" },
          },
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [233, 30, 99] }, // Pink
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Deductions (Part B) ---
  if (data.schedulePartB) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Part B - Deductions under Chapter VI-A", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Section", "Amount (Rs.)"]],
      body: [
        [
          "80C (Life Insurance etc.)",
          (
            Number(data.schedulePartB.medicalInsurancePremium) || 0
          ).toLocaleString("en-IN"),
        ], // Mapping might need adjustment based on real field names
        [
          "80D (Health Insurance)",
          (
            Number(data.schedulePartB.seniorCitizenHealthInsurance) || 0
          ).toLocaleString("en-IN"),
        ],
        [
          "80CCD(2) (NPS Employer)",
          (Number(data.schedulePartB.npsContribution) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          { content: "Total Deductions", styles: { fontStyle: "bold" } },
          {
            content: (
              Number(data.schedulePartB.totalDeductionPartB) || 0
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

  // --- Footer ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
    doc.text("Generated by ClearTax Clone", 14, 290);
  }

  doc.save(
    `ITR-3_${
      data.partAGeneral?.a4_pan || "Draft"
    }_${new Date().getFullYear()}.pdf`
  );
};
