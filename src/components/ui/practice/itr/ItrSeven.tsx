import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Itr7FormData {
  // Step 1: Personal Information (Enhanced)
  name: string;
  pan: string;
  formationDate: string;
  flatNo: string;
  building: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  
  // Step 2: Entity Status & Exemption Details  
  entityStatus: string; // Trust, Society, etc.
  entitySubStatus: string;
  exemptionSection: string; // 11, 10(23C), 10(46)
  exemptionClaimedUnder: string;
  lei: string; // Legal Entity Identifier
  firstReturn: boolean;
  changesInObjectives: boolean;
  objectiveChanges: string;
  
  // Step 3: Filing Status (Enhanced)
  sectionFiled: string;
  receiptNumber: string;
  originalFilingDate: string;
  din: string;
  dinDate: string;
  filingType: string; // Original, Revised, Defective
  acknowledgementNumber: string;
  noticeNumber: string;
  respondingToNotice: boolean;
  
  // Step 4: Registration Details (Enhanced)
  regSection: string;
  regDate: string;
  urn: string;
  authority: string;
  effectiveFrom: string;
  regSection10_23C: boolean;
  regSection12A_12AB: boolean;
  regFCRA: boolean;
  regSEBI: boolean;
  regDARPAN: boolean;
  regSection35: boolean;
  regOtherActs: string;
  
  // Step 5: Projects & Activities
  hasProject: boolean;
  projectName: string;
  projectNature: string; // religious/educational, etc.
  activityNature: string;
  classification: string;
  commercialActivityPercent: number;
  commercialReceipts: number;
  activitiesUnderSection2_15: string;
  
  // Step 6: Representative & Residential Status
  residentialStatus: string;
  foreignTaxRelief: boolean;
  dtaaCountry: string;
  hasRepresentative: boolean;
  repName: string;
  repPAN: string;
  repAddress: string;
  
  // Step 7: Audit Information (Enhanced)
  auditUnderITAct: boolean;
  auditSection: string;
  auditFirm: string;
  auditPAN: string;
  auditMembershipNo: string;
  auditDate: string;
  auditUDIN: string;
  auditUnderOtherLaws: boolean;
  otherAuditDetails: string;
  
  // Step 8: Partners & Equity Details
  firmPartnerDetails: boolean;
  firmPAN: string;
  hasUnlistedShares: boolean;
  companyName: string;
  companyPAN: string;
  sharesHeld: string;
  sharesFaceValue: number;
  costOfAcquisition: string;
  sharesTransferred: string;
  
  // Step 9: Trustees/Founders/Beneficiaries
  authorName: string;
  relation: string;
  identificationType: string;
  identificationNo: string;
  mobile: string;
  email: string;
  contributorAddress: string;
  sharePercentage: number;
  
  // Step 10: Balance Sheet - Sources of Funds
  bs_corpusFund: number;
  bs_corpusFundAdditions: number;
  bs_reservesAndSurplus: number;
  bs_securedLoans: number;
  bs_unsecuredLoans: number;
  bs_deferredTaxLiabilities: number;
  bs_otherLiabilities: number;
  bs_totalSourcesOfFunds: number;
  
  // Step 11: Balance Sheet - Application of Funds
  bs_fixedAssets: number;
  bs_investments: number;
  bs_loansAndAdvances: number;
  bs_cashAndBankBalances: number;
  bs_otherCurrentAssets: number;
  bs_totalApplicationOfFunds: number;
  bs_depositsUnder11_5: number;
  
  // Step 12: Income & Expenditure - Income
  ie_grants: number;
  ie_donations: number;
  ie_donationsCorpus: number;
  ie_donationsGeneral: number;
  ie_donationsSpecific: number;
  ie_interestIncome: number;
  ie_rentalIncome: number;
  ie_feesSubscriptions: number;
  ie_foreignContributions: number;
  ie_otherIncome: number;
  ie_totalIncome: number;
  
  // Step 13: Income & Expenditure - Expenditure  
  ie_administrativeExpenses: number;
  ie_establishmentExpenses: number;
  ie_educationalExpenses: number;
  ie_religiousExpenses: number;
  ie_salariesWages: number;
  ie_professionalCharges: number;
  ie_repairsMaintenance: number;
  ie_travelExpenses: number;
  ie_capitalExpenses: number;
  ie_otherExpenses: number;
  ie_totalExpenditure: number;
  
  // Step 14: Schedule VC - Voluntary Contributions
  vc_domesticDonations: number;
  vc_foreignDonations: number;
  vc_corpusDonations: number;
  vc_generalDonations: number;
  vc_specificDonations: number;
  vc_totalVoluntaryContributions: number;
  
  // Step 15: Schedule AI - Income Not from Voluntary Contributions
  ai_rentalIncome: number;
  ai_interestIncome: number;
  ai_investmentIncome: number;
  ai_businessIncome: number;
  ai_otherIncome: number;
  ai_totalNonVoluntaryIncome: number;
  
  // Step 16: Schedule ER - Revenue Expenditure
  er_salaries: number;
  er_administration: number;
  er_professionalCharges: number;
  er_repairs: number;
  er_travel: number;
  er_utilities: number;
  er_otherRevenue: number;
  er_totalRevenueExpenditure: number;
  
  // Step 17: Schedule EC - Capital Expenditure
  ec_landBuilding: number;
  ec_equipment: number;
  ec_furniture: number;
  ec_vehicles: number;
  ec_computers: number;
  ec_otherCapital: number;
  ec_totalCapitalExpenditure: number;
  
  // Step 18: Schedule 10 - Exempt Income
  s10_section10_21: number;
  s10_section10_23C: number;
  s10_section10_46: number;
  s10_otherExemptions: number;
  s10_totalExemptIncome: number;
  
  // Step 19: Schedule J - Investments
  sj_modeOfInvestment: string;
  sj_deposits: number;
  sj_loans: number;
  sj_cashHoldings: number;
  sj_otherInvestments: number;
  sj_totalInvestments: number;
  
  // Step 20: Schedule R - Reconciliation of Corpus
  sr_openingCorpus: number;
  sr_additionsToCorpus: number;
  sr_utilizationFromCorpus: number;
  sr_closingCorpus: number;
  
  // Step 21: Schedule TDS/TCS/IT/TDI
  tds_tdsFrom26AS: number;
  tds_advanceTax: number;
  tds_selfAssessmentTax: number;
  tds_interestOnRefund: number;
  tds_tdsCredited: number;
  tds_totalTaxPayments: number;
  
  // Step 22: Schedule FSI - Foreign Source Income
  fsi_hasSourceIncome: boolean;
  fsi_country: string;
  fsi_incomeAmount: number;
  fsi_taxesPaid: number;
  fsi_taxRelief: number;
  
  // Step 23: Schedule TR - Tax Relief
  tr_incomeUnderDTAA: number;
  tr_taxReliefClaimed: number;
  tr_unilateralRelief: number;
  tr_totalTaxRelief: number;
  
  // Step 24: Schedule FA - Foreign Assets
  fa_hasForeignAssets: boolean;
  fa_bankAccountDetails: string;
  fa_financialInterests: string;
  fa_immovableProperty: string;
  fa_trustsOutsideIndia: string;
  
  // Step 25: Schedule SH - Shareholding Details  
  sh_hasShareholding: boolean;
  sh_companyName: string;
  sh_companyPAN: string;
  sh_shareType: string;
  sh_sharesCost: number;
  sh_sharesFaceValue: number;
  
  // Step 26: Schedule AL - Assets & Liabilities
  al_applicable: boolean; // if total income > ₹50 lakh
  al_totalAssets: number;
  al_totalLiabilities: number;
  al_netWorth: number;
  
  // Step 27: PART B-TI - Computation of Total Income
  ti_voluntaryContributions: number;
  ti_otherIncome: number;
  ti_exemptIncome: number;
  ti_accumulationUnder11_2: number;
  ti_incomeAppliedForCharity: number;
  ti_deemedIncome: number;
  ti_anonymousDonations: number;
  ti_netTotalIncome: number;
  
  // Step 28: PART B-TTI - Tax Computation
  tti_taxPayable: number;
  tti_rebate: number;
  tti_surcharge: number;
  tti_healthEducationCess: number;
  tti_interestSection234A: number;
  tti_interestSection234B: number;
  tti_interestSection234C: number;
  tti_feeSection234F: number;
  tti_reliefSection90_90A_91: number;
  tti_totalTaxPaid: number;
  tti_refundDue: number;
  tti_taxPayableBalance: number;
  
  // Step 29: Enhanced Verification
  verification_declarantName: string;
  verification_capacity: string;
  verification_declarantPAN: string;
  verification_declarantAadhaar: string;
  verification_place: string;
  verification_date: string;
  verification_digitalSignature: boolean;
  verification_dsc: string;
  verification_otp: string;
}

interface Itr7FormErrors {
  [key: string]: string;
}

const ItrSeven = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr7-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Itr7FormData>(() => {
    const savedFormData = localStorage.getItem('itr7-form-data');
    return savedFormData ? JSON.parse(savedFormData) : {
      // Step 1: Personal Information (Enhanced)
      name: '',
      pan: '',
      formationDate: '',
      flatNo: '',
      building: '',
      street: '',
      area: '',
      city: '',
      state: '',
      pinCode: '',
      country: '',
      phone1: '',
      phone2: '',
      email1: '',
      email2: '',
      
      // Step 2: Entity Status & Exemption Details  
      entityStatus: '',
      entitySubStatus: '',
      exemptionSection: '',
      exemptionClaimedUnder: '',
      lei: '',
      firstReturn: false,
      changesInObjectives: false,
      objectiveChanges: '',
      
      // Step 3: Filing Status (Enhanced)
      sectionFiled: '',
      receiptNumber: '',
      originalFilingDate: '',
      din: '',
      dinDate: '',
      filingType: '',
      acknowledgementNumber: '',
      noticeNumber: '',
      respondingToNotice: false,
      
      // Step 4: Registration Details (Enhanced)
      regSection: '',
      regDate: '',
      urn: '',
      authority: '',
      effectiveFrom: '',
      regSection10_23C: false,
      regSection12A_12AB: false,
      regFCRA: false,
      regSEBI: false,
      regDARPAN: false,
      regSection35: false,
      regOtherActs: '',
      
      // Step 5: Projects & Activities
      hasProject: false,
      projectName: '',
      projectNature: '',
      activityNature: '',
      classification: '',
      commercialActivityPercent: 0,
      commercialReceipts: 0,
      activitiesUnderSection2_15: '',
      
      // Step 6: Representative & Residential Status
      residentialStatus: '',
      foreignTaxRelief: false,
      dtaaCountry: '',
      hasRepresentative: false,
      repName: '',
      repPAN: '',
      repAddress: '',
      
      // Step 7: Audit Information (Enhanced)
      auditUnderITAct: false,
      auditSection: '',
      auditFirm: '',
      auditPAN: '',
      auditMembershipNo: '',
      auditDate: '',
      auditUDIN: '',
      auditUnderOtherLaws: false,
      otherAuditDetails: '',
      
      // Step 8: Partners & Equity Details
      firmPartnerDetails: false,
      firmPAN: '',
      hasUnlistedShares: false,
      companyName: '',
      companyPAN: '',
      sharesHeld: '',
      sharesFaceValue: 0,
      costOfAcquisition: '',
      sharesTransferred: '',
      
      // Step 9: Trustees/Founders/Beneficiaries
      authorName: '',
      relation: '',
      identificationType: '',
      identificationNo: '',
      mobile: '',
      email: '',
      contributorAddress: '',
      sharePercentage: 0,
      
      // Step 10: Balance Sheet - Sources of Funds
      bs_corpusFund: 0,
      bs_corpusFundAdditions: 0,
      bs_reservesAndSurplus: 0,
      bs_securedLoans: 0,
      bs_unsecuredLoans: 0,
      bs_deferredTaxLiabilities: 0,
      bs_otherLiabilities: 0,
      bs_totalSourcesOfFunds: 0,
      
      // Step 11: Balance Sheet - Application of Funds
      bs_fixedAssets: 0,
      bs_investments: 0,
      bs_loansAndAdvances: 0,
      bs_cashAndBankBalances: 0,
      bs_otherCurrentAssets: 0,
      bs_totalApplicationOfFunds: 0,
      bs_depositsUnder11_5: 0,
      
      // Step 12: Income & Expenditure - Income
      ie_grants: 0,
      ie_donations: 0,
      ie_donationsCorpus: 0,
      ie_donationsGeneral: 0,
      ie_donationsSpecific: 0,
      ie_interestIncome: 0,
      ie_rentalIncome: 0,
      ie_feesSubscriptions: 0,
      ie_foreignContributions: 0,
      ie_otherIncome: 0,
      ie_totalIncome: 0,
      
      // Step 13: Income & Expenditure - Expenditure  
      ie_administrativeExpenses: 0,
      ie_establishmentExpenses: 0,
      ie_educationalExpenses: 0,
      ie_religiousExpenses: 0,
      ie_salariesWages: 0,
      ie_professionalCharges: 0,
      ie_repairsMaintenance: 0,
      ie_travelExpenses: 0,
      ie_capitalExpenses: 0,
      ie_otherExpenses: 0,
      ie_totalExpenditure: 0,
      
      // Step 14: Schedule VC - Voluntary Contributions
      vc_domesticDonations: 0,
      vc_foreignDonations: 0,
      vc_corpusDonations: 0,
      vc_generalDonations: 0,
      vc_specificDonations: 0,
      vc_totalVoluntaryContributions: 0,
      
      // Step 15: Schedule AI - Income Not from Voluntary Contributions
      ai_rentalIncome: 0,
      ai_interestIncome: 0,
      ai_investmentIncome: 0,
      ai_businessIncome: 0,
      ai_otherIncome: 0,
      ai_totalNonVoluntaryIncome: 0,
      
      // Step 16: Schedule ER - Revenue Expenditure
      er_salaries: 0,
      er_administration: 0,
      er_professionalCharges: 0,
      er_repairs: 0,
      er_travel: 0,
      er_utilities: 0,
      er_otherRevenue: 0,
      er_totalRevenueExpenditure: 0,
      
      // Step 17: Schedule EC - Capital Expenditure
      ec_landBuilding: 0,
      ec_equipment: 0,
      ec_furniture: 0,
      ec_vehicles: 0,
      ec_computers: 0,
      ec_otherCapital: 0,
      ec_totalCapitalExpenditure: 0,
      
      // Step 18: Schedule 10 - Exempt Income
      s10_section10_21: 0,
      s10_section10_23C: 0,
      s10_section10_46: 0,
      s10_otherExemptions: 0,
      s10_totalExemptIncome: 0,
      
      // Step 19: Schedule J - Investments
      sj_modeOfInvestment: '',
      sj_deposits: 0,
      sj_loans: 0,
      sj_cashHoldings: 0,
      sj_otherInvestments: 0,
      sj_totalInvestments: 0,
      
      // Step 20: Schedule R - Reconciliation of Corpus
      sr_openingCorpus: 0,
      sr_additionsToCorpus: 0,
      sr_utilizationFromCorpus: 0,
      sr_closingCorpus: 0,
      
      // Step 21: Schedule TDS/TCS/IT/TDI
      tds_tdsFrom26AS: 0,
      tds_advanceTax: 0,
      tds_selfAssessmentTax: 0,
      tds_interestOnRefund: 0,
      tds_tdsCredited: 0,
      tds_totalTaxPayments: 0,
      
      // Step 22: Schedule FSI - Foreign Source Income
      fsi_hasSourceIncome: false,
      fsi_country: '',
      fsi_incomeAmount: 0,
      fsi_taxesPaid: 0,
      fsi_taxRelief: 0,
      
      // Step 23: Schedule TR - Tax Relief
      tr_incomeUnderDTAA: 0,
      tr_taxReliefClaimed: 0,
      tr_unilateralRelief: 0,
      tr_totalTaxRelief: 0,
      
      // Step 24: Schedule FA - Foreign Assets
      fa_hasForeignAssets: false,
      fa_bankAccountDetails: '',
      fa_financialInterests: '',
      fa_immovableProperty: '',
      fa_trustsOutsideIndia: '',
      
      // Step 25: Schedule SH - Shareholding Details  
      sh_hasShareholding: false,
      sh_companyName: '',
      sh_companyPAN: '',
      sh_shareType: '',
      sh_sharesCost: 0,
      sh_sharesFaceValue: 0,
      
      // Step 26: Schedule AL - Assets & Liabilities
      al_applicable: false,
      al_totalAssets: 0,
      al_totalLiabilities: 0,
      al_netWorth: 0,
      
      // Step 27: PART B-TI - Computation of Total Income
      ti_voluntaryContributions: 0,
      ti_otherIncome: 0,
      ti_exemptIncome: 0,
      ti_accumulationUnder11_2: 0,
      ti_incomeAppliedForCharity: 0,
      ti_deemedIncome: 0,
      ti_anonymousDonations: 0,
      ti_netTotalIncome: 0,
      
      // Step 28: PART B-TTI - Tax Computation
      tti_taxPayable: 0,
      tti_rebate: 0,
      tti_surcharge: 0,
      tti_healthEducationCess: 0,
      tti_interestSection234A: 0,
      tti_interestSection234B: 0,
      tti_interestSection234C: 0,
      tti_feeSection234F: 0,
      tti_reliefSection90_90A_91: 0,
      tti_totalTaxPaid: 0,
      tti_refundDue: 0,
      tti_taxPayableBalance: 0,
      
      // Step 29: Enhanced Verification
      verification_declarantName: '',
      verification_capacity: '',
      verification_declarantPAN: '',
      verification_declarantAadhaar: '',
      verification_place: '',
      verification_date: '',
      verification_digitalSignature: false,
      verification_dsc: '',
      verification_otp: '',
    };
  });
  const [errors, setErrors] = useState<Itr7FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newData = { ...prev, [name]: checked };
        localStorage.setItem('itr7-form-data', JSON.stringify(newData));
        return newData;
      });
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        localStorage.setItem('itr7-form-data', JSON.stringify(newData));
        return newData;
      });
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validatePan = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateAadhar = (aadhar: string) => {
    const aadharRegex = /^[0-9]{12}$/;
    return aadharRegex.test(aadhar);
  };

  // Auto-calculation functions
  const calculateBalanceSheetTotals = () => {
    const sourcesTotal = formData.bs_corpusFund + formData.bs_corpusFundAdditions + 
                        formData.bs_reservesAndSurplus + formData.bs_securedLoans + 
                        formData.bs_unsecuredLoans + formData.bs_deferredTaxLiabilities + 
                        formData.bs_otherLiabilities;

    const applicationTotal = formData.bs_fixedAssets + formData.bs_investments + 
                           formData.bs_loansAndAdvances + formData.bs_cashAndBankBalances + 
                           formData.bs_otherCurrentAssets;

    setFormData(prev => ({ 
      ...prev, 
      bs_totalSourcesOfFunds: sourcesTotal,
      bs_totalApplicationOfFunds: applicationTotal 
    }));
  };

  const calculateIncomeExpenditureTotals = () => {
    const totalIncome = formData.ie_grants + formData.ie_donations + formData.ie_donationsCorpus + 
                       formData.ie_donationsGeneral + formData.ie_donationsSpecific + 
                       formData.ie_interestIncome + formData.ie_rentalIncome + 
                       formData.ie_feesSubscriptions + formData.ie_foreignContributions + 
                       formData.ie_otherIncome;

    const totalExpenditure = formData.ie_administrativeExpenses + formData.ie_establishmentExpenses + 
                           formData.ie_educationalExpenses + formData.ie_religiousExpenses + 
                           formData.ie_salariesWages + formData.ie_professionalCharges + 
                           formData.ie_repairsMaintenance + formData.ie_travelExpenses + 
                           formData.ie_capitalExpenses + formData.ie_otherExpenses;

    setFormData(prev => ({ 
      ...prev, 
      ie_totalIncome: totalIncome,
      ie_totalExpenditure: totalExpenditure 
    }));
  };

  const calculateScheduleTotals = () => {
    // Schedule VC totals
    const vcTotal = formData.vc_domesticDonations + formData.vc_foreignDonations + 
                   formData.vc_corpusDonations + formData.vc_generalDonations + 
                   formData.vc_specificDonations;

    // Schedule AI totals
    const aiTotal = formData.ai_rentalIncome + formData.ai_interestIncome + 
                   formData.ai_investmentIncome + formData.ai_businessIncome + 
                   formData.ai_otherIncome;

    // Schedule ER totals
    const erTotal = formData.er_salaries + formData.er_administration + 
                   formData.er_professionalCharges + formData.er_repairs + 
                   formData.er_travel + formData.er_utilities + formData.er_otherRevenue;

    // Schedule EC totals
    const ecTotal = formData.ec_landBuilding + formData.ec_equipment + 
                   formData.ec_furniture + formData.ec_vehicles + 
                   formData.ec_computers + formData.ec_otherCapital;

    // Schedule 10 totals
    const s10Total = formData.s10_section10_21 + formData.s10_section10_23C + 
                    formData.s10_section10_46 + formData.s10_otherExemptions;

    // Schedule J totals
    const sjTotal = formData.sj_deposits + formData.sj_loans + 
                   formData.sj_cashHoldings + formData.sj_otherInvestments;

    // TDS totals
    const tdsTotal = formData.tds_tdsFrom26AS + formData.tds_advanceTax + 
                    formData.tds_selfAssessmentTax + formData.tds_interestOnRefund + 
                    formData.tds_tdsCredited;

    // Tax Relief totals
    const trTotal = formData.tr_incomeUnderDTAA + formData.tr_taxReliefClaimed + 
                   formData.tr_unilateralRelief;

    setFormData(prev => ({ 
      ...prev, 
      vc_totalVoluntaryContributions: vcTotal,
      ai_totalNonVoluntaryIncome: aiTotal,
      er_totalRevenueExpenditure: erTotal,
      ec_totalCapitalExpenditure: ecTotal,
      s10_totalExemptIncome: s10Total,
      sj_totalInvestments: sjTotal,
      tds_totalTaxPayments: tdsTotal,
      tr_totalTaxRelief: trTotal
    }));
  };

  const calculateTotalIncomeAndTax = () => {
    // Calculate Total Income
    const netTotalIncome = formData.ti_voluntaryContributions + formData.ti_otherIncome - 
                          formData.ti_exemptIncome - formData.ti_accumulationUnder11_2 - 
                          formData.ti_incomeAppliedForCharity + formData.ti_deemedIncome + 
                          formData.ti_anonymousDonations;

    // Calculate Total Tax
    const totalTax = formData.tti_taxPayable + formData.tti_surcharge + 
                    formData.tti_healthEducationCess + formData.tti_interestSection234A + 
                    formData.tti_interestSection234B + formData.tti_interestSection234C + 
                    formData.tti_feeSection234F - formData.tti_rebate - 
                    formData.tti_reliefSection90_90A_91;

    const balanceAmount = totalTax - formData.tti_totalTaxPaid;

    setFormData(prev => ({ 
      ...prev, 
      ti_netTotalIncome: netTotalIncome,
      tti_refundDue: balanceAmount < 0 ? Math.abs(balanceAmount) : 0,
      tti_taxPayableBalance: balanceAmount > 0 ? balanceAmount : 0
    }));
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Itr7FormErrors = {};
    let isValid = true;

    switch (stepNumber) {
      case 1: // Personal Information
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
          isValid = false;
        }
        if (!formData.pan.trim()) {
          newErrors.pan = 'PAN is required';
          isValid = false;
        } else if (!validatePan(formData.pan)) {
          newErrors.pan = 'Please enter a valid PAN number';
          isValid = false;
        }
        if (!formData.formationDate) {
          newErrors.formationDate = 'Formation date is required';
          isValid = false;
        }
        if (!formData.state) {
          newErrors.state = 'State is required';
          isValid = false;
        }
        if (!formData.pinCode) {
          newErrors.pinCode = 'PIN code is required';
          isValid = false;
        }
        if (!formData.country) {
          newErrors.country = 'Country is required';
          isValid = false;
        }
        if (!formData.email1) {
          newErrors.email1 = 'Email address is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email1)) {
          newErrors.email1 = 'Please enter a valid email address';
          isValid = false;
        }
        if (!formData.mobile) {
          newErrors.mobile = 'Mobile number is required';
          isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
          newErrors.mobile = 'Please enter a valid 10-digit mobile number';
          isValid = false;
        }
        break;
      case 2: // Entity Status & Exemption Details
        if (!formData.entityStatus) {
          newErrors.entityStatus = 'Entity status is required';
          isValid = false;
        }
        break;
      case 3: // Filing Status
        if (!formData.sectionFiled) {
          newErrors.sectionFiled = 'Section filed is required';
          isValid = false;
        }
        break;
      case 4: // Registration Details
        if (!formData.regSection) {
          newErrors.regSection = 'Section of registration is required';
          isValid = false;
        }
        if (!formData.regDate) {
          newErrors.regDate = 'Registration date is required';
          isValid = false;
        }
        break;
      case 5: // Projects & Activities - Optional validation
        if (formData.hasProject && !formData.projectName) {
          newErrors.projectName = 'Project name is required';
          isValid = false;
        }
        break;
      case 6: // Representative & Residential Status
        if (!formData.residentialStatus) {
          newErrors.residentialStatus = 'Residential status is required';
          isValid = false;
        }
        if (formData.hasRepresentative) {
          if (!formData.repName) {
            newErrors.repName = 'Representative name is required';
            isValid = false;
          }
          if (!formData.repPAN) {
            newErrors.repPAN = 'Representative PAN is required';
            isValid = false;
          }
        }
        break;
      case 7: // Audit Information - Optional
        break;
      case 8: // Partners & Equity Details - Optional
        if (formData.hasUnlistedShares) {
          if (!formData.companyName) {
            newErrors.companyName = 'Company name is required';
            isValid = false;
          }
          if (!formData.companyPAN) {
            newErrors.companyPAN = 'Company PAN is required';
            isValid = false;
          }
        }
        break;
      case 9: // Trustees/Founders/Beneficiaries
        if (!formData.authorName) {
          newErrors.authorName = 'Author/Founder name is required';
          isValid = false;
        }
        if (!formData.mobile) {
          newErrors.mobile = 'Mobile number is required';
          isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
          newErrors.mobile = 'Please enter a valid 10-digit mobile number';
          isValid = false;
        }
        if (!formData.email) {
          newErrors.email = 'Email address is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        }
        break;
      case 10: // Balance Sheet - Sources of Funds - Optional
      case 11: // Balance Sheet - Application of Funds - Optional
      case 12: // Income & Expenditure - Income - Optional
      case 13: // Income & Expenditure - Expenditure - Optional
      case 14: // Schedule VC - Optional
      case 15: // Schedule AI - Optional
      case 16: // Schedule ER - Optional
      case 17: // Schedule EC - Optional
      case 18: // Schedule 10 - Optional
      case 19: // Schedule J - Optional
      case 20: // Schedule R - Optional
      case 21: // Schedule TDS/TCS/IT/TDI - Optional
      case 22: // Schedule FSI - Optional
      case 23: // Schedule TR - Optional
      case 24: // Schedule FA - Optional
      case 25: // Schedule SH - Optional
      case 26: // Schedule AL - Optional
      case 27: // PART B-TI - Optional
      case 28: // PART B-TTI - Optional
        break;
      case 29: // Enhanced Verification
        if (!formData.verification_declarantName) {
          newErrors.verification_declarantName = 'Declarant name is required';
          isValid = false;
        }
        if (!formData.verification_capacity) {
          newErrors.verification_capacity = 'Capacity is required';
          isValid = false;
        }
        if (!formData.verification_place) {
          newErrors.verification_place = 'Place is required';
          isValid = false;
        }
        if (!formData.verification_date) {
          newErrors.verification_date = 'Date is required';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 29) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          localStorage.removeItem('itr7-current-step');
          localStorage.removeItem('itr7-form-data');
          navigate("/practice/itr/success");
        } catch (error) {
          setSaveError("Failed to save ITR-7. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        const nextStep = step + 1;
        setStep(nextStep);
        localStorage.setItem('itr7-current-step', nextStep.toString());
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    localStorage.setItem('itr7-current-step', prevStep.toString());
  };

  const getStepTitle = (stepNumber: number) => {
    const titles: Record<number, string> = {
      1: 'Personal Information',
      2: 'Entity Status & Exemption Details',
      3: 'Filing Status',
      4: 'Registration Details',
      5: 'Projects & Activities',
      6: 'Representative & Residential Status',
      7: 'Audit Information',
      8: 'Partners & Equity Details',
      9: 'Trustees/Founders/Beneficiaries',
      10: 'Balance Sheet - Sources of Funds',
      11: 'Balance Sheet - Application of Funds',
      12: 'Income & Expenditure - Income',
      13: 'Income & Expenditure - Expenditure',
      14: 'Schedule VC - Voluntary Contributions',
      15: 'Schedule AI - Income Not from Voluntary Contributions',
      16: 'Schedule ER - Revenue Expenditure',
      17: 'Schedule EC - Capital Expenditure',
      18: 'Schedule 10 - Exempt Income',
      19: 'Schedule J - Investments',
      20: 'Schedule R - Reconciliation of Corpus',
      21: 'Schedule TDS/TCS/IT/TDI',
      22: 'Schedule FSI - Foreign Source Income',
      23: 'Schedule TR - Tax Relief',
      24: 'Schedule FA - Foreign Assets',
      25: 'Schedule SH - Shareholding Details',
      26: 'Schedule AL - Assets & Liabilities',
      27: 'PART B-TI - Computation of Total Income',
      28: 'PART B-TTI - Tax Computation',
      29: 'Enhanced Verification',
    };
    return titles[stepNumber] || '';
  };

  return (
    <>
      <div className="w-[60%] mt-20 p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200">
        <ul className="flex items-center space-x-4 text-lg font-semibold text-gray-700">
          <li
            className="flex items-center transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice")}
          >
            <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6m-6 6l6-6"></path>
            </svg>
            Practice
          </li>
          <span className="text-gray-400">›</span>
          <li
            className="transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice/itr")}
          >
            ITR
          </li>
          <span className="text-gray-400">›</span>
          <li className="text-gray-500">ITR-7</li>
        </ul>
      </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          {`Step ${step} of 29: ${step === 1 ? "PART A: Personal Information" : 
                                step === 2 ? "PART B: Entity Status & Exemption Details" : 
                                step === 3 ? "PART C: Filing Status" : 
                                step === 4 ? "PART D: Registration Details" :
                                step === 5 ? "PART E: Projects & Activities" :
                                step === 6 ? "PART F: Representative & Residential Status" :
                                step === 7 ? "PART G: Audit Information" :
                                step === 8 ? "PART H: Partners & Equity Details" :
                                step === 9 ? "PART I: Trustees/Founders/Beneficiaries" :
                                step === 10 ? "PART J: Balance Sheet - Sources of Funds" :
                                step === 11 ? "PART K: Balance Sheet - Application of Funds" :
                                step === 12 ? "PART L: Income & Expenditure - Income" :
                                step === 13 ? "PART M: Income & Expenditure - Expenditure" :
                                step === 14 ? "PART N: Schedule VC - Voluntary Contributions" :
                                step === 15 ? "PART O: Schedule AI - Income Not from Voluntary Contributions" :
                                step === 16 ? "PART P: Schedule ER - Revenue Expenditure" :
                                step === 17 ? "PART Q: Schedule EC - Capital Expenditure" :
                                step === 18 ? "PART R: Schedule 10 - Exempt Income" :
                                step === 19 ? "PART S: Schedule J - Investments" :
                                step === 20 ? "PART T: Schedule R - Reconciliation of Corpus" :
                                step === 21 ? "PART U: Schedule TDS/TCS/IT/TDI" :
                                step === 22 ? "PART V: Schedule FSI - Foreign Source Income" :
                                step === 23 ? "PART W: Schedule TR - Tax Relief" :
                                step === 24 ? "PART X: Schedule FA - Foreign Assets" :
                                step === 25 ? "PART Y: Schedule SH - Shareholding Details" :
                                step === 26 ? "PART Z: Schedule AL - Assets & Liabilities" :
                                step === 27 ? "PART AA: PART B-TI - Computation of Total Income" :
                                step === 28 ? "PART AB: PART B-TTI - Tax Computation" :
                                "PART AC: Enhanced Verification"}`
          }
        </h2>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART A: Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Name (as per Deed/Formation) <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name as per deed/formation" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`} />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN <span className="text-red-500">*</span></label>
                <input type="text" name="pan" value={formData.pan} onChange={handleChange} placeholder="Enter PAN number" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pan ? "border-red-500" : "border-gray-300"}`} />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Formation Date <span className="text-red-500">*</span></label>
                <input type="date" name="formationDate" value={formData.formationDate} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.formationDate ? "border-red-500" : "border-gray-300"}`} />
                {errors.formationDate && <p className="mt-1 text-sm text-red-500">{errors.formationDate}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Flat/Door/Block No.</label>
                <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange} placeholder="Enter flat/door/block number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Building/Village</label>
                <input type="text" name="building" value={formData.building} onChange={handleChange} placeholder="Enter building/village name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Street/Post Office</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Enter street/post office" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Area/Locality</label>
                <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Enter area/locality" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Town/City/District</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter town/city/district" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-500" : "border-gray-300"}`} />
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PIN/ZIP Code <span className="text-red-500">*</span></label>
                <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Enter PIN/ZIP code" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pinCode ? "border-red-500" : "border-gray-300"}`} />
                {errors.pinCode && <p className="mt-1 text-sm text-red-500">{errors.pinCode}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Enter country" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.country ? "border-red-500" : "border-gray-300"}`} />
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 1</label>
                <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} placeholder="Enter phone number 1" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 2</label>
                <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} placeholder="Enter phone number 2" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address 1 <span className="text-red-500">*</span></label>
                <input type="email" name="email1" value={formData.email1} onChange={handleChange} placeholder="Enter email address 1" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email1 ? "border-red-500" : "border-gray-300"}`} />
                {errors.email1 && <p className="mt-1 text-sm text-red-500">{errors.email1}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address 2</label>
                <input type="email" name="email2" value={formData.email2} onChange={handleChange} placeholder="Enter email address 2" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Entity Status & Exemption Details */}
        {step === 2 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART B: Entity Status & Exemption Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Entity Status <span className="text-red-500">*</span></label>
                <select name="entityStatus" value={formData.entityStatus} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.entityStatus ? "border-red-500" : "border-gray-300"}`}>
                  <option value="">Select entity status</option>
                  <option value="Trust">Trust</option>
                  <option value="Society">Society</option>
                  <option value="Political Party">Political Party</option>
                  <option value="Association of Persons">Association of Persons</option>
                  <option value="Body of Individuals">Body of Individuals</option>
                </select>
                {errors.entityStatus && <p className="mt-1 text-sm text-red-500">{errors.entityStatus}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Sub-Status</label>
                <input type="text" name="entitySubStatus" value={formData.entitySubStatus} onChange={handleChange} placeholder="Enter sub-status" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Exemption Section</label>
                <select name="exemptionSection" value={formData.exemptionSection} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select exemption section</option>
                  <option value="11">Section 11</option>
                  <option value="10(23C)">Section 10(23C)</option>
                  <option value="10(46)">Section 10(46)</option>
                  <option value="10(21)">Section 10(21)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Exemption Claimed Under</label>
                <input type="text" name="exemptionClaimedUnder" value={formData.exemptionClaimedUnder} onChange={handleChange} placeholder="Enter exemption details" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Legal Entity Identifier (LEI)</label>
                <input type="text" name="lei" value={formData.lei} onChange={handleChange} placeholder="Enter LEI if applicable" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input type="checkbox" name="firstReturn" checked={formData.firstReturn} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">First Return?</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="changesInObjectives" checked={formData.changesInObjectives} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Changes in Objectives?</label>
                </div>
              </div>
              {formData.changesInObjectives && (
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Details of Changes in Objectives</label>
                  <textarea name="objectiveChanges" value={formData.objectiveChanges} onChange={handleChange} placeholder="Enter details of changes in objectives" rows={3} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Filing Status (Enhanced) */}
        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART C: Filing Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Section Filed <span className="text-red-500">*</span></label>
                <select name="sectionFiled" value={formData.sectionFiled} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.sectionFiled ? "border-red-500" : "border-gray-300"}`}>
                  <option value="">Select section</option>
                  <option value="139(4A)">139(4A)</option>
                  <option value="139(4C)">139(4C)</option>
                  <option value="139(1)">139(1)</option>
                  <option value="139(4)">139(4)</option>
                  <option value="139(5)">139(5)</option>
                  <option value="92CD">92CD</option>
                  <option value="119(2)(b)">119(2)(b)</option>
                </select>
                {errors.sectionFiled && <p className="mt-1 text-sm text-red-500">{errors.sectionFiled}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Filing Type</label>
                <select name="filingType" value={formData.filingType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select filing type</option>
                  <option value="Original">Original</option>
                  <option value="Revised">Revised</option>
                  <option value="Defective">Defective</option>
                  <option value="Updated">Updated</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Receipt No. (if revised)</label>
                <input type="text" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} placeholder="Enter receipt number if revised" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Original Filing Date</label>
                <input type="date" name="originalFilingDate" value={formData.originalFilingDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Acknowledgement Number</label>
                <input type="text" name="acknowledgementNumber" value={formData.acknowledgementNumber} onChange={handleChange} placeholder="Enter acknowledgement number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="respondingToNotice" checked={formData.respondingToNotice} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Responding to Notice?</label>
              </div>
              {formData.respondingToNotice && (
                <>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Notice Number</label>
                    <input type="text" name="noticeNumber" value={formData.noticeNumber} onChange={handleChange} placeholder="Enter notice number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">DIN / Unique Number</label>
                <input type="text" name="din" value={formData.din} onChange={handleChange} placeholder="Enter DIN/Unique number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">DIN Date</label>
                <input type="date" name="dinDate" value={formData.dinDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Residential & Legal Info */}
        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART C: Residential & Legal Info</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Residential Status <span className="text-red-500">*</span></label>
                <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.residentialStatus ? "border-red-500" : "border-gray-300"}`}>
                  <option value="">Select residential status</option>
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                </select>
                {errors.residentialStatus && <p className="mt-1 text-sm text-red-500">{errors.residentialStatus}</p>}
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="hasProject" checked={formData.hasProject} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Has Project</label>
              </div>
              {formData.hasProject && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Project/Institution Name</label>
                  <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Enter project/institution name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.projectName ? "border-red-500" : "border-gray-300"}`} />
                  {errors.projectName && <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>}
                </div>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Nature of Activity</label>
                <input type="text" name="activityNature" value={formData.activityNature} onChange={handleChange} placeholder="Enter nature of activity" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Classification</label>
                <input type="text" name="classification" value={formData.classification} onChange={handleChange} placeholder="Enter classification" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Registration Details */}
        {step === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART D: Registration Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Section of Registration <span className="text-red-500">*</span></label>
                <input type="text" name="regSection" value={formData.regSection} onChange={handleChange} placeholder="Enter section of registration" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.regSection ? "border-red-500" : "border-gray-300"}`} />
                {errors.regSection && <p className="mt-1 text-sm text-red-500">{errors.regSection}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Registration Date <span className="text-red-500">*</span></label>
                <input type="date" name="regDate" value={formData.regDate} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.regDate ? "border-red-500" : "border-gray-300"}`} />
                {errors.regDate && <p className="mt-1 text-sm text-red-500">{errors.regDate}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">URN / Approval No.</label>
                <input type="text" name="urn" value={formData.urn} onChange={handleChange} placeholder="Enter URN/Approval number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Approving Authority</label>
                <input type="text" name="authority" value={formData.authority} onChange={handleChange} placeholder="Enter approving authority" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Effective Date</label>
                <input type="date" name="effectiveFrom" value={formData.effectiveFrom} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Representative / Legal / Audit */}
        {step === 5 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART E: Representative / Legal / Audit</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="hasRepresentative" checked={formData.hasRepresentative} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Has Representative</label>
              </div>
              {formData.hasRepresentative && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Representative Name</label>
                    <input type="text" name="repName" value={formData.repName} onChange={handleChange} placeholder="Enter representative name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.repName ? "border-red-500" : "border-gray-300"}`} />
                    {errors.repName && <p className="mt-1 text-sm text-red-500">{errors.repName}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">PAN / Aadhaar</label>
                    <input type="text" name="repPAN" value={formData.repPAN} onChange={handleChange} placeholder="Enter PAN/Aadhaar" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.repPAN ? "border-red-500" : "border-gray-300"}`} />
                    {errors.repPAN && <p className="mt-1 text-sm text-red-500">{errors.repPAN}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                    <input type="text" name="repAddress" value={formData.repAddress} onChange={handleChange} placeholder="Enter representative address" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Audit Firm Name</label>
                  <input type="text" name="auditFirm" value={formData.auditFirm} onChange={handleChange} placeholder="Enter audit firm name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Audit Firm PAN</label>
                  <input type="text" name="auditPAN" value={formData.auditPAN} onChange={handleChange} placeholder="Enter audit firm PAN" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Audit Date</label>
                  <input type="date" name="auditDate" value={formData.auditDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">UDIN</label>
                  <input type="text" name="auditUDIN" value={formData.auditUDIN} onChange={handleChange} placeholder="Enter UDIN" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Representative & Residential Status */}
        {step === 6 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART F: Representative & Residential Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Residential Status <span className="text-red-500">*</span></label>
                <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.residentialStatus ? "border-red-500" : "border-gray-300"}`}>
                  <option value="">Select residential status</option>
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                </select>
                {errors.residentialStatus && <p className="mt-1 text-sm text-red-500">{errors.residentialStatus}</p>}
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="foreignTaxRelief" checked={formData.foreignTaxRelief} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Income offered under foreign tax relief (DTAA)?</label>
              </div>
              {formData.foreignTaxRelief && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">DTAA Country</label>
                  <input type="text" name="dtaaCountry" value={formData.dtaaCountry} onChange={handleChange} placeholder="Enter DTAA country" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              )}
              <div className="flex items-center">
                <input type="checkbox" name="hasRepresentative" checked={formData.hasRepresentative} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Has Representative Assessee</label>
              </div>
              {formData.hasRepresentative && (
                <>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Representative Name</label>
                    <input type="text" name="repName" value={formData.repName} onChange={handleChange} placeholder="Enter representative name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.repName ? "border-red-500" : "border-gray-300"}`} />
                    {errors.repName && <p className="mt-1 text-sm text-red-500">{errors.repName}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Representative PAN</label>
                    <input type="text" name="repPAN" value={formData.repPAN} onChange={handleChange} placeholder="Enter representative PAN" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.repPAN ? "border-red-500" : "border-gray-300"}`} />
                    {errors.repPAN && <p className="mt-1 text-sm text-red-500">{errors.repPAN}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Representative Address</label>
                    <textarea name="repAddress" value={formData.repAddress} onChange={handleChange} placeholder="Enter representative address" rows={3} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                </>
              )}
              <div className="flex items-center">
                <input type="checkbox" name="firmPartnerDetails" checked={formData.firmPartnerDetails} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Firm Partner Details</label>
              </div>
              {formData.firmPartnerDetails && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Firm PAN</label>
                  <input type="text" name="firmPAN" value={formData.firmPAN} onChange={handleChange} placeholder="Enter firm PAN" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 7: Audit Information */}
        {step === 7 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART G: Audit Information</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="auditUnderITAct" checked={formData.auditUnderITAct} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Audit under IT Act</label>
              </div>
              {formData.auditUnderITAct && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Audit Section</label>
                    <input type="text" name="auditSection" value={formData.auditSection} onChange={handleChange} placeholder="Enter audit section" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Auditor Name</label>
                    <input type="text" name="auditFirm" value={formData.auditFirm} onChange={handleChange} placeholder="Enter auditor name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Auditor PAN</label>
                    <input type="text" name="auditPAN" value={formData.auditPAN} onChange={handleChange} placeholder="Enter auditor PAN" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Membership Number</label>
                    <input type="text" name="auditMembershipNo" value={formData.auditMembershipNo} onChange={handleChange} placeholder="Enter membership number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Audit Date</label>
                    <input type="date" name="auditDate" value={formData.auditDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">UDIN</label>
                    <input type="text" name="auditUDIN" value={formData.auditUDIN} onChange={handleChange} placeholder="Enter UDIN" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <input type="checkbox" name="auditUnderOtherLaws" checked={formData.auditUnderOtherLaws} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Audit under Other Laws</label>
              </div>
              {formData.auditUnderOtherLaws && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Other Audit Details</label>
                  <textarea name="otherAuditDetails" value={formData.otherAuditDetails} onChange={handleChange} placeholder="Enter details of audit under other laws" rows={3} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 8: Partners & Equity Details */}
        {step === 8 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART H: Partners & Equity Details</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="hasUnlistedShares" checked={formData.hasUnlistedShares} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Has Unlisted Equity Shareholding</label>
              </div>
              {formData.hasUnlistedShares && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter company name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.companyName ? "border-red-500" : "border-gray-300"}`} />
                    {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Company PAN</label>
                    <input type="text" name="companyPAN" value={formData.companyPAN} onChange={handleChange} placeholder="Enter company PAN" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.companyPAN ? "border-red-500" : "border-gray-300"}`} />
                    {errors.companyPAN && <p className="mt-1 text-sm text-red-500">{errors.companyPAN}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">No. of Shares</label>
                    <input type="text" name="sharesHeld" value={formData.sharesHeld} onChange={handleChange} placeholder="Enter number of shares" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Cost of Acquisition (₹)</label>
                    <input type="text" name="costOfAcquisition" value={formData.costOfAcquisition} onChange={handleChange} placeholder="Enter cost of acquisition" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Face Value (₹)</label>
                    <input type="number" name="sharesFaceValue" value={formData.sharesFaceValue} onChange={handleChange} placeholder="Enter face value per share" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Shares Transferred</label>
                    <input type="text" name="sharesTransferred" value={formData.sharesTransferred} onChange={handleChange} placeholder="Enter shares transferred" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 9: Trustees/Founders/Beneficiaries */}
        {step === 9 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART I: Trustees/Founders/Beneficiaries/Substantial Contributors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} placeholder="Enter name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.authorName ? "border-red-500" : "border-gray-300"}`} />
                {errors.authorName && <p className="mt-1 text-sm text-red-500">{errors.authorName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Relation</label>
                <select name="relation" value={formData.relation} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select relation</option>
                  <option value="Trustee">Trustee</option>
                  <option value="Founder">Founder</option>
                  <option value="Beneficiary">Beneficiary</option>
                  <option value="Substantial Contributor">Substantial Contributor</option>
                  <option value="Secretary">Secretary</option>
                  <option value="President">President</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN/Aadhaar</label>
                <input type="text" name="identificationNo" value={formData.identificationNo} onChange={handleChange} placeholder="Enter PAN or Aadhaar" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter mobile number" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.mobile ? "border-red-500" : "border-gray-300"}`} />
                {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`} />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Share/Contribution Percentage (%)</label>
                <input type="number" name="sharePercentage" value={formData.sharePercentage} onChange={handleChange} min="0" max="100" placeholder="Enter percentage" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                <textarea name="contributorAddress" value={formData.contributorAddress} onChange={handleChange} placeholder="Enter complete address" rows={3} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Step 12: Income & Expenditure - Income */}
        {step === 12 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART L: Income & Expenditure - Income</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Grants (₹)</label>
                <input type="number" name="ie_grants" value={formData.ie_grants} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter grants received" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Donations (₹)</label>
                <input type="number" name="ie_donations" value={formData.ie_donations} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter donations received" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Donations - Corpus (₹)</label>
                <input type="number" name="ie_donationsCorpus" value={formData.ie_donationsCorpus} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter corpus donations" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Donations - General (₹)</label>
                <input type="number" name="ie_donationsGeneral" value={formData.ie_donationsGeneral} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter general donations" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Donations - Specific (₹)</label>
                <input type="number" name="ie_donationsSpecific" value={formData.ie_donationsSpecific} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter specific donations" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Interest Income (₹)</label>
                <input type="number" name="ie_interestIncome" value={formData.ie_interestIncome} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter interest income" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Rental Income (₹)</label>
                <input type="number" name="ie_rentalIncome" value={formData.ie_rentalIncome} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter rental income" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Fees/Subscriptions (₹)</label>
                <input type="number" name="ie_feesSubscriptions" value={formData.ie_feesSubscriptions} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter fees and subscriptions" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Contributions (₹)</label>
                <input type="number" name="ie_foreignContributions" value={formData.ie_foreignContributions} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter foreign contributions" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Income (₹)</label>
                <input type="number" name="ie_otherIncome" value={formData.ie_otherIncome} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter other income" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <label className="block mb-2 text-sm font-semibold text-green-700">Total Income (₹)</label>
              <div className="text-2xl font-bold text-green-800">₹ {formData.ie_totalIncome.toLocaleString('en-IN')}</div>
            </div>
          </div>
        )}

        {/* Step 13: Income & Expenditure - Expenditure */}
        {step === 13 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART M: Income & Expenditure - Expenditure</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Administrative Expenses (₹)</label>
                <input type="number" name="ie_administrativeExpenses" value={formData.ie_administrativeExpenses} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter administrative expenses" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Establishment Expenses (₹)</label>
                <input type="number" name="ie_establishmentExpenses" value={formData.ie_establishmentExpenses} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter establishment expenses" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Educational Expenses (₹)</label>
                <input type="number" name="ie_educationalExpenses" value={formData.ie_educationalExpenses} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter educational expenses" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Religious Expenses (₹)</label>
                <input type="number" name="ie_religiousExpenses" value={formData.ie_religiousExpenses} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter religious expenses" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Salaries & Wages (₹)</label>
                <input type="number" name="ie_salariesWages" value={formData.ie_salariesWages} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter salaries and wages" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Professional Charges (₹)</label>
                <input type="number" name="ie_professionalCharges" value={formData.ie_professionalCharges} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter professional charges" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Repairs & Maintenance (₹)</label>
                <input type="number" name="ie_repairsMaintenance" value={formData.ie_repairsMaintenance} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter repairs and maintenance" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Travel Expenses (₹)</label>
                <input type="number" name="ie_travelExpenses" value={formData.ie_travelExpenses} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter travel expenses" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Capital Expenses (₹)</label>
                <input type="number" name="ie_capitalExpenses" value={formData.ie_capitalExpenses} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter capital expenses" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Expenses (₹)</label>
                <input type="number" name="ie_otherExpenses" value={formData.ie_otherExpenses} onChange={handleChange} onBlur={calculateIncomeExpenditureTotals} placeholder="Enter other expenses" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <label className="block mb-2 text-sm font-semibold text-red-700">Total Expenditure (₹)</label>
              <div className="text-2xl font-bold text-red-800">₹ {formData.ie_totalExpenditure.toLocaleString('en-IN')}</div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <label className="block mb-2 text-sm font-semibold text-blue-700">Net Surplus/(Deficit) (₹)</label>
              <div className={`text-xl font-bold ${(formData.ie_totalIncome - formData.ie_totalExpenditure) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹ {(formData.ie_totalIncome - formData.ie_totalExpenditure).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        )}

        {/* Step 14: Schedule VC - Voluntary Contributions */}
        {step === 14 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART N: Schedule VC - Voluntary Contributions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Domestic Donations (₹)</label>
                <input type="number" name="vc_domesticDonations" value={formData.vc_domesticDonations} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter domestic donations" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Donations (₹)</label>
                <input type="number" name="vc_foreignDonations" value={formData.vc_foreignDonations} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter foreign donations" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Corpus Donations (₹)</label>
                <input type="number" name="vc_corpusDonations" value={formData.vc_corpusDonations} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter corpus donations" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">General Donations (₹)</label>
                <input type="number" name="vc_generalDonations" value={formData.vc_generalDonations} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter general donations" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Specific Donations (₹)</label>
                <input type="number" name="vc_specificDonations" value={formData.vc_specificDonations} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter specific donations" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <label className="block mb-2 text-sm font-semibold text-purple-700">Total Voluntary Contributions (₹)</label>
              <div className="text-2xl font-bold text-purple-800">₹ {formData.vc_totalVoluntaryContributions.toLocaleString('en-IN')}</div>
            </div>
          </div>
        )}

        {/* Step 21: Schedule TDS/TCS/IT/TDI */}
        {step === 21 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART U: Schedule TDS/TCS/IT/TDI</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">TDS from 26AS (₹)</label>
                <input type="number" name="tds_tdsFrom26AS" value={formData.tds_tdsFrom26AS} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter TDS from 26AS" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Advance Tax (₹)</label>
                <input type="number" name="tds_advanceTax" value={formData.tds_advanceTax} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter advance tax paid" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Self-Assessment Tax (₹)</label>
                <input type="number" name="tds_selfAssessmentTax" value={formData.tds_selfAssessmentTax} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter self-assessment tax" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Interest on Refund (₹)</label>
                <input type="number" name="tds_interestOnRefund" value={formData.tds_interestOnRefund} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter interest on refund" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">TDS Credit Claimed (₹)</label>
                <input type="number" name="tds_tdsCredited" value={formData.tds_tdsCredited} onChange={handleChange} onBlur={calculateScheduleTotals} placeholder="Enter TDS credit claimed" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <label className="block mb-2 text-sm font-semibold text-emerald-700">Total Tax Payments (₹)</label>
              <div className="text-2xl font-bold text-emerald-800">₹ {formData.tds_totalTaxPayments.toLocaleString('en-IN')}</div>
            </div>
          </div>
        )}

        {/* Step 10: Balance Sheet - Sources of Funds */}
        {step === 10 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART J: Balance Sheet - Sources of Funds (as on 31st March)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Corpus Fund (₹)</label>
                <input type="number" name="bs_corpusFund" value={formData.bs_corpusFund} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter corpus fund amount" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Corpus Fund Additions (₹)</label>
                <input type="number" name="bs_corpusFundAdditions" value={formData.bs_corpusFundAdditions} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter additions to corpus fund" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Reserves and Surplus (₹)</label>
                <input type="number" name="bs_reservesAndSurplus" value={formData.bs_reservesAndSurplus} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter reserves and surplus" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Secured Loans (₹)</label>
                <input type="number" name="bs_securedLoans" value={formData.bs_securedLoans} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter secured loans" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Unsecured Loans (₹)</label>
                <input type="number" name="bs_unsecuredLoans" value={formData.bs_unsecuredLoans} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter unsecured loans" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Deferred Tax Liabilities (₹)</label>
                <input type="number" name="bs_deferredTaxLiabilities" value={formData.bs_deferredTaxLiabilities} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter deferred tax liabilities" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Liabilities (₹)</label>
                <input type="number" name="bs_otherLiabilities" value={formData.bs_otherLiabilities} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter other liabilities" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Deposits under 11(5) (₹)</label>
                <input type="number" name="bs_depositsUnder11_5" value={formData.bs_depositsUnder11_5} onChange={handleChange} placeholder="Enter deposits under section 11(5)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <label className="block mb-2 text-sm font-semibold text-blue-700">Total Sources of Funds (₹)</label>
              <div className="text-2xl font-bold text-blue-800">₹ {formData.bs_totalSourcesOfFunds.toLocaleString('en-IN')}</div>
            </div>
          </div>
        )}

        {/* Step 11: Balance Sheet - Application of Funds */}
        {step === 11 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART K: Balance Sheet - Application of Funds (as on 31st March)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Fixed Assets (₹)</label>
                <input type="number" name="bs_fixedAssets" value={formData.bs_fixedAssets} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter fixed assets" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Investments (₹)</label>
                <input type="number" name="bs_investments" value={formData.bs_investments} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter investments" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Loans and Advances (₹)</label>
                <input type="number" name="bs_loansAndAdvances" value={formData.bs_loansAndAdvances} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter loans and advances" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Cash and Bank Balances (₹)</label>
                <input type="number" name="bs_cashAndBankBalances" value={formData.bs_cashAndBankBalances} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter cash and bank balances" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Current Assets (₹)</label>
                <input type="number" name="bs_otherCurrentAssets" value={formData.bs_otherCurrentAssets} onChange={handleChange} onBlur={calculateBalanceSheetTotals} placeholder="Enter other current assets" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <label className="block mb-2 text-sm font-semibold text-green-700">Total Application of Funds (₹)</label>
              <div className="text-2xl font-bold text-green-800">₹ {formData.bs_totalApplicationOfFunds.toLocaleString('en-IN')}</div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <label className="block mb-2 text-sm font-semibold text-yellow-700">Balance Sheet Difference</label>
              <div className={`text-lg font-bold ${formData.bs_totalSourcesOfFunds === formData.bs_totalApplicationOfFunds ? 'text-green-600' : 'text-red-600'}`}>
                ₹ {Math.abs(formData.bs_totalSourcesOfFunds - formData.bs_totalApplicationOfFunds).toLocaleString('en-IN')}
                {formData.bs_totalSourcesOfFunds === formData.bs_totalApplicationOfFunds ? ' (Balanced)' : ' (Unbalanced)'}
              </div>
            </div>
          </div>
        )}

        {/* Step 27: PART B-TI - Computation of Total Income */}
        {step === 27 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART AA: PART B-TI - Computation of Total Income</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Voluntary Contributions (₹)</label>
                <input type="number" name="ti_voluntaryContributions" value={formData.ti_voluntaryContributions} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter voluntary contributions" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Income (₹)</label>
                <input type="number" name="ti_otherIncome" value={formData.ti_otherIncome} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter other income" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Less: Exempt Income (₹)</label>
                <input type="number" name="ti_exemptIncome" value={formData.ti_exemptIncome} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter exempt income" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Less: Accumulation u/s 11(2) (₹)</label>
                <input type="number" name="ti_accumulationUnder11_2" value={formData.ti_accumulationUnder11_2} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter accumulation under 11(2)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Less: Income Applied for Charity (₹)</label>
                <input type="number" name="ti_incomeAppliedForCharity" value={formData.ti_incomeAppliedForCharity} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter income applied for charity" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Add: Deemed Income (₹)</label>
                <input type="number" name="ti_deemedIncome" value={formData.ti_deemedIncome} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter deemed income" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Add: Anonymous Donations (₹)</label>
                <input type="number" name="ti_anonymousDonations" value={formData.ti_anonymousDonations} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter anonymous donations" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <label className="block mb-2 text-sm font-semibold text-purple-700">Net Total Income (₹)</label>
              <div className="text-2xl font-bold text-purple-800">₹ {formData.ti_netTotalIncome.toLocaleString('en-IN')}</div>
            </div>
          </div>
        )}

        {/* Step 28: PART B-TTI - Tax Computation */}
        {step === 28 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART AB: PART B-TTI - Tax Computation and Payment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Tax Payable (₹)</label>
                <input type="number" name="tti_taxPayable" value={formData.tti_taxPayable} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter tax payable" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Rebate (₹)</label>
                <input type="number" name="tti_rebate" value={formData.tti_rebate} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter rebate" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Surcharge (₹)</label>
                <input type="number" name="tti_surcharge" value={formData.tti_surcharge} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter surcharge" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Health & Education Cess (₹)</label>
                <input type="number" name="tti_healthEducationCess" value={formData.tti_healthEducationCess} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter health & education cess" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Interest u/s 234A (₹)</label>
                <input type="number" name="tti_interestSection234A" value={formData.tti_interestSection234A} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter interest 234A" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Interest u/s 234B (₹)</label>
                <input type="number" name="tti_interestSection234B" value={formData.tti_interestSection234B} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter interest 234B" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Interest u/s 234C (₹)</label>
                <input type="number" name="tti_interestSection234C" value={formData.tti_interestSection234C} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter interest 234C" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Fee u/s 234F (₹)</label>
                <input type="number" name="tti_feeSection234F" value={formData.tti_feeSection234F} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter fee 234F" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Relief u/s 90/90A/91 (₹)</label>
                <input type="number" name="tti_reliefSection90_90A_91" value={formData.tti_reliefSection90_90A_91} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter relief" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Tax Paid (₹)</label>
                <input type="number" name="tti_totalTaxPaid" value={formData.tti_totalTaxPaid} onChange={handleChange} onBlur={calculateTotalIncomeAndTax} placeholder="Enter total tax paid" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <label className="block mb-2 text-sm font-semibold text-green-700">Refund Due (₹)</label>
                <div className="text-xl font-bold text-green-800">₹ {formData.tti_refundDue.toLocaleString('en-IN')}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <label className="block mb-2 text-sm font-semibold text-red-700">Tax Payable Balance (₹)</label>
                <div className="text-xl font-bold text-red-800">₹ {formData.tti_taxPayableBalance.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 29: Enhanced Verification */}
        {step === 29 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART AC: Enhanced Verification</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Declarant Name <span className="text-red-500">*</span></label>
                <input type="text" name="verification_declarantName" value={formData.verification_declarantName} onChange={handleChange} placeholder="Enter declarant name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.verification_declarantName ? "border-red-500" : "border-gray-300"}`} />
                {errors.verification_declarantName && <p className="mt-1 text-sm text-red-500">{errors.verification_declarantName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Capacity <span className="text-red-500">*</span></label>
                <select name="verification_capacity" value={formData.verification_capacity} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.verification_capacity ? "border-red-500" : "border-gray-300"}`}>
                  <option value="">Select capacity</option>
                  <option value="Trustee">Trustee</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Chairman">Chairman</option>
                  <option value="President">President</option>
                  <option value="Authorized Representative">Authorized Representative</option>
                </select>
                {errors.verification_capacity && <p className="mt-1 text-sm text-red-500">{errors.verification_capacity}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Declarant PAN</label>
                <input type="text" name="verification_declarantPAN" value={formData.verification_declarantPAN} onChange={handleChange} placeholder="Enter declarant PAN" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Declarant Aadhaar</label>
                <input type="text" name="verification_declarantAadhaar" value={formData.verification_declarantAadhaar} onChange={handleChange} placeholder="Enter declarant Aadhaar" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Place <span className="text-red-500">*</span></label>
                <input type="text" name="verification_place" value={formData.verification_place} onChange={handleChange} placeholder="Enter place" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.verification_place ? "border-red-500" : "border-gray-300"}`} />
                {errors.verification_place && <p className="mt-1 text-sm text-red-500">{errors.verification_place}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Date <span className="text-red-500">*</span></label>
                <input type="date" name="verification_date" value={formData.verification_date} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.verification_date ? "border-red-500" : "border-gray-300"}`} />
                {errors.verification_date && <p className="mt-1 text-sm text-red-500">{errors.verification_date}</p>}
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <input type="checkbox" name="verification_digitalSignature" checked={formData.verification_digitalSignature} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Digital Signature / DSC</label>
              </div>
              {formData.verification_digitalSignature && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">DSC Details</label>
                    <input type="text" name="verification_dsc" value={formData.verification_dsc} onChange={handleChange} placeholder="Enter DSC details" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">OTP</label>
                    <input type="text" name="verification_otp" value={formData.verification_otp} onChange={handleChange} placeholder="Enter OTP" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Verification Declaration</h4>
              <p className="text-sm text-yellow-700">
                I verify that the information given above is true and correct and that the income declared does not include any income which does not belong to the assessee or which is exempt from tax. The return is verified on the basis of the books of account and other documents as required to be maintained under the Income-tax Act, 1961.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={handleNextStep}
            disabled={isLoading}
            className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : step === 29 ? (
              "Submit"
            ) : (
              "Next"
            )}
          </button>
        </div>
        {saveError && (
          <div className="mt-2 text-sm text-red-500">{saveError}</div>
        )}
      </div>
    </>
  );
};

export default ItrSeven;