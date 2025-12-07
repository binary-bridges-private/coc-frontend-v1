import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportITR2ToPDF = (data: any) => {
  const doc: any = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 100);
  doc.text("ITR-2 - Assessment Year 2025-26", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 26);
  doc.text(`PAN: ${data.personalInfo?.pan || "N/A"}`, 150, 26);

  let finalY = 30;

  // --- Personal Information Section ---
  const personalInfo = data.personalInfo || {};
  autoTable(doc, {
    startY: finalY + 5,
    head: [["Field", "Value"]],
    body: [
      [
        "Full Name",
        `${personalInfo.firstName || ""} ${personalInfo.middleName || ""} ${
          personalInfo.lastName || ""
        }`.trim(),
      ],
      ["PAN", personalInfo.pan || ""],
      ["Aadhaar Number", personalInfo.aadhar || ""],
      ["Date of Birth", personalInfo.dateOfBirth || ""],
      ["Gender", personalInfo.gender || ""],
      ["Email", personalInfo.email || ""],
      ["Mobile", personalInfo.mobileNumber || ""],
      [
        "Address",
        `${personalInfo.flatDoorBlockNo || ""} ${
          personalInfo.nameOfPremises || ""
        } ${personalInfo.roadStreetPostOffice || ""} ${
          personalInfo.areaLocality || ""
        } ${personalInfo.city || ""} ${personalInfo.state || ""} ${
          personalInfo.pincode || ""
        }`.trim(),
      ],
      ["Tax Regime", personalInfo.taxRegime || "Old Tax Regime"],
      ["Filing Status", personalInfo.filingStatus || ""],
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 133, 244] },
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 80 } },
  });

  finalY = doc.lastAutoTable.finalY + 10;

  // --- Salary Income ---
  if (data.salaryIncome) {
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Salary Income", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Gross Salary",
          (Number(data.salaryIncome.grossSalary) || 0).toLocaleString("en-IN"),
        ],
        [
          "Allowances Exempt",
          (Number(data.salaryIncome.exemptAllowances) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          "Net Salary",
          (Number(data.salaryIncome.netSalary) || 0).toLocaleString("en-IN"),
        ],
        [
          "Standard Deduction",
          (Number(data.salaryIncome.standardDeduction) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          "Income Chargeable under Salaries",
          (
            Number(data.salaryIncome.incomeChargeableUnderSalaries) || 0
          ).toLocaleString("en-IN"),
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [40, 167, 69] },
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- House Property ---
  if (data.houseProperty) {
    doc.setFontSize(14);
    doc.text("House Property", 14, finalY);
    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Total Income from HP",
          (Number(data.houseProperty.totalIncomeFromHP) || 0).toLocaleString(
            "en-IN"
          ),
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [108, 117, 125] },
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Capital Gains ---
  if (data.capitalGains || data.schedule112A || data.scheduleVDA) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Capital Gains", 14, finalY);

    const cgBody = [];
    if (data.capitalGains?.sectionA) {
      cgBody.push([
        {
          content: "Short Term Capital Gains (STCG)",
          colSpan: 2,
          styles: { fontStyle: "bold", fillColor: [240, 240, 240] },
        },
      ] as any);
      cgBody.push([
        "STCG (Section A)",
        (Number(data.capitalGains.sectionA.stcgTotal) || 0).toLocaleString(
          "en-IN"
        ),
      ]);
    }
    if (data.capitalGains?.sectionB) {
      cgBody.push([
        {
          content: "Long Term Capital Gains (LTCG)",
          colSpan: 2,
          styles: { fontStyle: "bold", fillColor: [240, 240, 240] },
        },
      ] as any);
      cgBody.push([
        "LTCG (Section B)",
        (Number(data.capitalGains.sectionB.ltcgTotal) || 0).toLocaleString(
          "en-IN"
        ),
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
        headStyles: { fillColor: [255, 87, 34] },
        columnStyles: { 1: { halign: "right" } },
      });
      finalY = doc.lastAutoTable.finalY + 10;
    } else {
      finalY += 10;
    }
  }

  // --- Other Sources ---
  if (data.scheduleOS) {
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(14);
    doc.text("Income from Other Sources", 14, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Interest - Savings Bank",
          (Number(data.scheduleOS.interestSavings) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          "Interest - Deposits",
          (Number(data.scheduleOS.interestDeposits) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          "Dividend Income",
          (Number(data.scheduleOS.dividendIncome) || 0).toLocaleString("en-IN"),
        ],
        [
          "Family Pension",
          (Number(data.scheduleOS.familyPension) || 0).toLocaleString("en-IN"),
        ],
        [
          "Income Tax Refund",
          (Number(data.scheduleOS.incomeTaxRefund) || 0).toLocaleString(
            "en-IN"
          ),
        ],
        [
          "Any Other Income",
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
        ] as any,
      ],
      theme: "striped",
      headStyles: { fillColor: [156, 39, 176] },
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Deductions ---
  if (data.scheduleVIA) {
    doc.setFontSize(14);
    doc.text("Deductions (Chapter VI-A)", 14, finalY);
    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "80C",
          (Number(data.scheduleVIA.deduction80C) || 0).toLocaleString("en-IN"),
        ],
        [
          "80D",
          (Number(data.scheduleVIA.deduction80D) || 0).toLocaleString("en-IN"),
        ],
        [
          "Total Deductions",
          (Number(data.scheduleVIA.totalDeductions) || 0).toLocaleString(
            "en-IN"
          ),
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [255, 193, 7] },
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 10;
  }

  // --- Tax Computation (Part 3 TTI) ---
  if (data.part3TTI) {
    if (finalY > 200) {
      doc.addPage();
      finalY = 20;
    }

    doc.setFontSize(14);
    doc.text("Tax Computation", 14, finalY);

    const tti = data.part3TTI;
    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Amount (Rs.)"]],
      body: [
        [
          "Total Income",
          (Number(tti.totalIncome) || 0).toLocaleString("en-IN"),
        ],
        [
          "Tax Payable on Total Income",
          (Number(tti.taxPayableOnTotalIncome) || 0).toLocaleString("en-IN"),
        ],
        ["Rebate 87A", (Number(tti.rebate87A) || 0).toLocaleString("en-IN")],
        [
          "Tax after Rebate",
          (Number(tti.taxPayableAfterRebate) || 0).toLocaleString("en-IN"),
        ],
        [
          "Health & Education Cess",
          (Number(tti.healthAndEducationCess) || 0).toLocaleString("en-IN"),
        ],
        [
          "Total Tax & Cess",
          (Number(tti.totalTaxAndCess) || 0).toLocaleString("en-IN"),
        ],
        [
          { content: "Net Tax Payable", styles: { fontStyle: "bold" } },
          {
            content: (Number(tti.netTaxPayable) || 0).toLocaleString("en-IN"),
            styles: { fontStyle: "bold" },
          },
        ] as any,
      ],
      theme: "striped",
      headStyles: { fillColor: [220, 53, 69] },
      columnStyles: { 1: { halign: "right" } },
    });
    finalY = doc.lastAutoTable.finalY + 20;
  }

  // Footer / Verification
  doc.setFontSize(10);
  doc.setTextColor(50);
  const text = `I, ${personalInfo.firstName || ""} ${
    personalInfo.lastName || ""
  }, solemnly declare that to the best of my knowledge and belief, the information given in the return and the schedules thereto is correct and complete.`;

  const splitText = doc.splitTextToSize(text, 180);
  doc.text(splitText, 14, finalY);

  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, finalY + 20);
  doc.text(`Place: ${personalInfo.city || "___________"}`, 100, finalY + 20);

  doc.save(
    `ITR-2_${personalInfo.pan || "Draft"}_${new Date().getFullYear()}.pdf`
  );
};
