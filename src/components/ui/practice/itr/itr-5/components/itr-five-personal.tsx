import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ProjectInstitution {
  slNo: string;
  name: string;
  nature: string;
  classification: string;
}

export interface IncomeTaxRegistration {
  slNo: string;
  sectionUnderRegistered: string;
  dateOfRegistration: string;
  approvalNotification: string;
  approvingAuthority: string;
  dateEffective: string;
}

export interface OtherLawRegistration {
  slNo: string;
  lawPortal: string;
  caseDetails: string;
  dateOfRegistration: string;
  approvalRegistrationNo: string;
  approvingAuthority: string;
  dateEffective: string;
}

export interface Representative {
  name: string;
  capacity: string;
  address: string;
  panAadhaar: string;
}

export interface UnlistedEquityShare {
  slNo: string;
  nameOfCompany: string;
  typeOfShare: string;
  panNumber: string;
  noOfShares: string;
  costOfAcquisition: string;
  noOfSharesTransferred: string;
  isPartOfShare: string;
  reasonForPurchase: string;
  noOfShares2: string;
  closingBalance: string;
}

export interface CharitableActivity {
  slNo: string;
  projectInstitution: string;
  tradeCommerceBusiness: string;
  percentageOfActivity: string;
  applicableSection: string;
  percentageOfReceipts: string;
}

export interface ObjectActivityChange {
  dateOfChange: string;
  applicationFiled: string;
  registrationGranted: string;
}

export interface AuditDetails {
  auditorName: string;
  membershipNo: string;
  auditFirmName: string;
  panAadhaarNo: string;
  auditReportDate: string;
  furnishingDate: string;
  acknowledgementNumber: string;
  udIn: string;
}

export interface OtherAuditAct {
  actAndSection: string;
  dateOfReport: string;
  section: string;
}

export interface AoPMember {
  slNo: string;
  name: string;
  address: string;
  percentageOfShare: string;
  pan: string;
  aadhaarNumber: string;
  status: string;
}

export interface ItrFivePersonalFormData {
  // Personal Details (A1-A3)
  nameOfAssessee?: string;
  pan?: string;
  dateOfFormation?: string;

  // Address Details (A4-A10)
  flatDoorBlockNo?: string;
  premisesBuilding?: string;
  roadStreetPostOffice?: string;
  areaLocality?: string;
  townCityDistrict?: string;
  state?: string;
  pinCode?: string;
  status?: "resident" | "non-resident" | "other";
  subStatus?: string;

  // Contact Details (A13-A16)
  phoneWithSTD?: string;
  mobileNo2?: string;
  emailAddress1?: string;
  emailAddress2?: string;

  // Return Details (A17)
  returnSection?: "139(4A)" | "139(4B)" | "139(4C)" | "139(4D)" | "";
  exemptionDetails?: string;

  // Project/Institution Details (A18)
  projectsRun?: "yes" | "no";
  projectDetails?: ProjectInstitution[];

  // Unlisted Equity Shares (A2)
  unlistedEquityShares?: UnlistedEquityShare[];

  // Income Tax Registration Details (A19)
  incomeTaxRegistrations?: IncomeTaxRegistration[];

  // Other Law Registration Details (A20)
  otherLawRegistrations?: OtherLawRegistration[];

  // Charitable Activities (A23-expanded)
  hasCharitableActivities?: "yes" | "no";
  charitableActivities?: CharitableActivity[];

  // Changes to Objects/Activities (A24)
  hasObjectActivityChanges?: "yes" | "no";
  objectActivityChanges?: ObjectActivityChange[];

  // Return Filing Details (A21)
  returnFiledAsType?: "tick" | "";
  returnFiledSection?: "139(1)" | "139(4)" | "139(5)" | "119(2)(b)" | "139(9)" | "142(1)" | "148" | "153C" | "";
  receiptNo?: string;
  receiptDate?: string;
  documentIdOrURN?: string;
  isDefectiveModified?: "yes" | "no";
  receiptNoDefective?: string;
  receiptDateDefective?: string;
  documentIdDefective?: string;
  documentIdUnique?: string;
  datedUnderSection139?: "139(9)" | "142(1)" | "148" | "153C" | "";
  dateAdvancePricingAgreement?: string;
  residentialStatus?: "resident" | "non-resident" | "";
  incomeSection90to91?: "yes" | "no";
  representedByRepresentative?: "yes" | "no";
  representatives?: Representative[];

  // Partner/Firm Details (A22)
  isPartner?: "yes" | "no";
  partnerFirmName?: string;
  partnerPAN?: string;

  // Legal Entity Identifier (A23)
  legalEntityIdentifier?: string;

  // First Return (A25)
  isFirstReturn?: "yes" | "no";

  // Provisions Applicability (A26)
  hasSection10_23C?: "yes" | "no";
  provisionsApplicable?: {
    clauseA?: "yes" | "no";
    clauseBConditions?: "yes" | "no";
    clauseCConditions?: "yes" | "no";
    clauseDConditions?: "yes" | "no";
  };

  // Audit Details (A27)
  liableForAudit?: "yes" | "no";
  auditDetails?: AuditDetails;

  // Other Audit Acts (A28)
  liableForOtherAudit?: "yes" | "no";
  otherAuditActs?: OtherAuditAct[];

  // Members/Fund Particulars (A29)
  aopMembers?: AoPMember[];
}

// Zod validation schema
const projectSchema = z.object({
  slNo: z.string().optional(),
  name: z.string().min(1, "Project name required"),
  nature: z.string().min(1, "Nature of activity required"),
  classification: z.string().min(1, "Classification required"),
});

const registrationSchema = z.object({
  slNo: z.string().optional(),
  sectionUnderRegistered: z.string().optional(),
  dateOfRegistration: z.string().optional(),
  approvalNotification: z.string().optional(),
  approvingAuthority: z.string().optional(),
  dateEffective: z.string().optional(),
});

const otherRegistrationSchema = z.object({
  slNo: z.string().optional(),
  lawPortal: z.string().optional(),
  caseDetails: z.string().optional(),
  dateOfRegistration: z.string().optional(),
  approvalRegistrationNo: z.string().optional(),
  approvingAuthority: z.string().optional(),
  dateEffective: z.string().optional(),
});

const representativeSchema = z.object({
  name: z.string().optional(),
  capacity: z.string().optional(),
  address: z.string().optional(),
  panAadhaar: z.string().optional(),
});

const unlistedEquityShareSchema = z.object({
  slNo: z.string().optional(),
  nameOfCompany: z.string().optional(),
  typeOfShare: z.string().optional(),
  panNumber: z.string().optional(),
  noOfShares: z.string().optional(),
  costOfAcquisition: z.string().optional(),
  noOfSharesTransferred: z.string().optional(),
  isPartOfShare: z.string().optional(),
  reasonForPurchase: z.string().optional(),
  noOfShares2: z.string().optional(),
  closingBalance: z.string().optional(),
});

const charitableActivitySchema = z.object({
  slNo: z.string().optional(),
  projectInstitution: z.string().optional(),
  tradeCommerceBusiness: z.string().optional(),
  percentageOfActivity: z.string().optional(),
  applicableSection: z.string().optional(),
  percentageOfReceipts: z.string().optional(),
});

const objectActivityChangeSchema = z.object({
  dateOfChange: z.string().optional(),
  applicationFiled: z.string().optional(),
  registrationGranted: z.string().optional(),
});

const auditDetailsSchema = z.object({
  auditorName: z.string().optional(),
  membershipNo: z.string().optional(),
  auditFirmName: z.string().optional(),
  panAadhaarNo: z.string().optional(),
  auditReportDate: z.string().optional(),
  furnishingDate: z.string().optional(),
  acknowledgementNumber: z.string().optional(),
  udIn: z.string().optional(),
});

const otherAuditActSchema = z.object({
  actAndSection: z.string().optional(),
  dateOfReport: z.string().optional(),
  section: z.string().optional(),
});

const aoPMemberSchema = z.object({
  slNo: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  percentageOfShare: z.string().optional(),
  pan: z.string().optional(),
  aadhaarNumber: z.string().optional(),
  status: z.string().optional(),
});

const itrFivePersonalSchema = z.object({
  nameOfAssessee: z.string().min(1, "Name of assessee required"),
  pan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  dateOfFormation: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be DD/MM/YYYY"),

  flatDoorBlockNo: z.string().optional(),
  premisesBuilding: z.string().optional(),
  roadStreetPostOffice: z.string().optional(),
  areaLocality: z.string().optional(),
  townCityDistrict: z.string().optional(),
  state: z.string().optional(),
  pinCode: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{6}$/.test(val), "PIN code must be 6 digits"),
  status: z.enum(["resident", "non-resident", "other"]).optional(),
  subStatus: z.string().optional(),

  phoneWithSTD: z.string().optional(),
  mobileNo2: z.string().optional(),
  emailAddress1: z.string().email("Invalid email").optional().or(z.literal("")),
  emailAddress2: z.string().email("Invalid email").optional().or(z.literal("")),

  returnSection: z.enum(["139(4A)", "139(4B)", "139(4C)", "139(4D)", ""]).optional(),
  exemptionDetails: z.string().optional(),

  projectsRun: z.enum(["yes", "no"]).optional(),
  projectDetails: z.array(projectSchema).optional(),

  unlistedEquityShares: z.array(unlistedEquityShareSchema).optional(),

  incomeTaxRegistrations: z.array(registrationSchema).optional(),
  otherLawRegistrations: z.array(otherRegistrationSchema).optional(),

  hasCharitableActivities: z.enum(["yes", "no"]).optional(),
  charitableActivities: z.array(charitableActivitySchema).optional(),

  hasObjectActivityChanges: z.enum(["yes", "no"]).optional(),
  objectActivityChanges: z.array(objectActivityChangeSchema).optional(),

  returnFiledAsType: z.enum(["tick", ""]).optional(),
  returnFiledSection: z.enum(["139(1)", "139(4)", "139(5)", "119(2)(b)", "139(9)", "142(1)", "148", "153C", ""]).optional(),
  receiptNo: z.string().optional(),
  receiptDate: z.string().optional(),
  documentIdOrURN: z.string().optional(),
  isDefectiveModified: z.enum(["yes", "no"]).optional(),
  receiptNoDefective: z.string().optional(),
  receiptDateDefective: z.string().optional(),
  documentIdDefective: z.string().optional(),
  documentIdUnique: z.string().optional(),
  datedUnderSection139: z.enum(["139(9)", "142(1)", "148", "153C", ""]).optional(),
  dateAdvancePricingAgreement: z.string().optional(),
  residentialStatus: z.enum(["resident", "non-resident", ""]).optional(),
  incomeSection90to91: z.enum(["yes", "no"]).optional(),
  representedByRepresentative: z.enum(["yes", "no"]).optional(),
  representatives: z.array(representativeSchema).optional(),

  isPartner: z.enum(["yes", "no"]).optional(),
  partnerFirmName: z.string().optional(),
  partnerPAN: z.string().optional(),

  legalEntityIdentifier: z.string().optional(),

  isFirstReturn: z.enum(["yes", "no"]).optional(),
  hasSection10_23C: z.enum(["yes", "no"]).optional(),
  provisionsApplicable: z.object({
    clauseA: z.enum(["yes", "no"]).optional(),
    clauseBConditions: z.enum(["yes", "no"]).optional(),
    clauseCConditions: z.enum(["yes", "no"]).optional(),
    clauseDConditions: z.enum(["yes", "no"]).optional(),
  }).optional(),

  liableForAudit: z.enum(["yes", "no"]).optional(),
  auditDetails: auditDetailsSchema.optional(),

  liableForOtherAudit: z.enum(["yes", "no"]).optional(),
  otherAuditActs: z.array(otherAuditActSchema).optional(),

  aopMembers: z.array(aoPMemberSchema).optional(),
}).superRefine((data, ctx) => {
  // Validate at least one email
  if (!data.emailAddress1 && !data.emailAddress2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["emailAddress1"],
      message: "At least one email address required",
    });
  }

  // Validate projects if "yes" is selected
  if (data.projectsRun === "yes" && (!data.projectDetails || data.projectDetails.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["projectDetails"],
      message: "At least one project must be entered",
    });
  }
});

type ItrFivePersonalFormType = z.infer<typeof itrFivePersonalSchema>;

interface ItrFivePersonalProps {
  initialData?: ItrFivePersonalFormData;
  onSave: (data: ItrFivePersonalFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFivePersonal: React.FC<ItrFivePersonalProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    register,
    watch,
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFivePersonalFormType>({
    resolver: zodResolver(itrFivePersonalSchema),
    mode: "onChange",
    defaultValues: initialData || {
      nameOfAssessee: "",
      pan: "",
      dateOfFormation: "",
      status: "resident",
      projectsRun: "no",
      projectDetails: [],
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const formValues = watch();
  const [projects, setProjects] = React.useState<ProjectInstitution[]>(
    initialData?.projectDetails || []
  );
  const [incomeTaxRegs, setIncomeTaxRegs] = React.useState<IncomeTaxRegistration[]>(
    initialData?.incomeTaxRegistrations || []
  );
  const [otherLawRegs, setOtherLawRegs] = React.useState<OtherLawRegistration[]>(
    initialData?.otherLawRegistrations || []
  );
  const [representatives, setRepresentatives] = React.useState<Representative[]>(
    initialData?.representatives || []
  );
  const [unlistedEquityShares, setUnlistedEquityShares] = React.useState<UnlistedEquityShare[]>(
    initialData?.unlistedEquityShares || []
  );
  const [charitableActivities, setCharitableActivities] = React.useState<CharitableActivity[]>(
    initialData?.charitableActivities || []
  );
  const [objectActivityChanges, setObjectActivityChanges] = React.useState<ObjectActivityChange[]>(
    initialData?.objectActivityChanges || []
  );
  const [otherAuditActs, setOtherAuditActs] = React.useState<OtherAuditAct[]>(
    initialData?.otherAuditActs || []
  );
  const [aopMembers, setAoPMembers] = React.useState<AoPMember[]>(
    initialData?.aopMembers || []
  );
  const [auditDetails, setAuditDetails] = React.useState<AuditDetails>(
    initialData?.auditDetails || {
      auditorName: "",
      membershipNo: "",
      auditFirmName: "",
      panAadhaarNo: "",
      auditReportDate: "",
      furnishingDate: "",
      acknowledgementNumber: "",
      udIn: "",
    }
  );

  // Collect all errors
  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([field, error]) => {
      if (error && error.message) {
        errorList.push(`${field}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  const onSubmit = (data: ItrFivePersonalFormType) => {
    onSave({
      ...data,
      projectDetails: projects,
      unlistedEquityShares,
      incomeTaxRegistrations: incomeTaxRegs,
      otherLawRegistrations: otherLawRegs,
      charitableActivities,
      objectActivityChanges,
      otherAuditActs,
      auditDetails,
      aopMembers,
      representatives,
    });
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { slNo: String(projects.length + 1), name: "", nature: "", classification: "" },
    ]);
  };

  const removeProject = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  const updateProject = (idx: number, field: keyof ProjectInstitution, value: string) => {
    const updated = [...projects];
    updated[idx][field] = value;
    setProjects(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Part A - General Information (Personal)
          </h1>
          <p className="text-green-700">
            ITR-5: Association of Persons and Body of Individuals
          </p>
        </div>

        {/* Error Banner */}
        {allErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <h3 className="text-red-900 font-bold mb-2">
              ⚠️ Please correct {allErrors.length} error(s):
            </h3>
            <ul className="text-red-800 text-sm space-y-1 max-h-32 overflow-y-auto">
              {allErrors.map((error, idx) => (
                <li key={idx}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Personal Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-green-900 mb-4">
              Personal Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name of Assessee (as mentioned in deed of creation/establishment/incorporation/formation)
                </label>
                <input
                  {...register("nameOfAssessee")}
                  type="text"
                  placeholder="Enter name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.nameOfAssessee
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
                {errors.nameOfAssessee && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nameOfAssessee.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN
                </label>
                <input
                  {...register("pan")}
                  type="text"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.pan
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
                {errors.pan && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.pan.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Formation/Incorporation (DD/MM/YYYY)
                </label>
                <input
                  {...register("dateOfFormation")}
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.dateOfFormation
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
                {errors.dateOfFormation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfFormation.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Address Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Address Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flat/Door/Block No
                </label>
                <input
                  {...register("flatDoorBlockNo")}
                  type="text"
                  placeholder="Enter flat/door/block number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name of Premises/Building/Village
                </label>
                <input
                  {...register("premisesBuilding")}
                  type="text"
                  placeholder="Enter premises/building name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Road/Street/Post Office
                </label>
                <input
                  {...register("roadStreetPostOffice")}
                  type="text"
                  placeholder="Enter road/street/post office"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area/Locality
                </label>
                <input
                  {...register("areaLocality")}
                  type="text"
                  placeholder="Enter area/locality"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Town/City/District
                </label>
                <input
                  {...register("townCityDistrict")}
                  type="text"
                  placeholder="Enter town/city/district"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  {...register("state")}
                  type="text"
                  placeholder="Enter state"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input
                  {...register("pinCode")}
                  type="text"
                  placeholder="6-digit PIN code"
                  maxLength={6}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.pinCode
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.pinCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.pinCode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="resident">Resident</option>
                  <option value="non-resident">Non-Resident</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Status
                </label>
                <input
                  {...register("subStatus")}
                  type="text"
                  placeholder="Enter sub status if applicable"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-purple-900 mb-4">
              Contact Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone with STD Code / Mobile No. 1
                </label>
                <input
                  {...register("phoneWithSTD")}
                  type="text"
                  placeholder="Enter phone/mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile No. 2
                </label>
                <input
                  {...register("mobileNo2")}
                  type="text"
                  placeholder="Enter second mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address 1
                </label>
                <input
                  {...register("emailAddress1")}
                  type="email"
                  placeholder="Enter email address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.emailAddress1
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                {errors.emailAddress1 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emailAddress1.message}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address 2
                </label>
                <input
                  {...register("emailAddress2")}
                  type="email"
                  placeholder="Enter alternate email address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.emailAddress2
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                {errors.emailAddress2 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emailAddress2.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Return Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <h2 className="text-xl font-bold text-orange-900 mb-4">
              Return Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return furnished under section
                </label>
                <div className="space-y-2">
                  {["139(4A)", "139(4B)", "139(4C)", "139(4D)"].map((section) => (
                    <label key={section} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={section}
                        {...register("returnSection")}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exemption Details (if applicable)
                </label>
                <textarea
                  {...register("exemptionDetails")}
                  placeholder="Enter details"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Project/Institution Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-red-900 mb-4">
              Project/Institution Details
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Whether any project/institution is run by the assessee?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register("projectsRun")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register("projectsRun")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {formValues.projectsRun === "yes" && (
              <div>
                <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-red-100">
                      <tr>
                        <th className="border border-gray-300 bg-red-200 px-3 py-2 text-left font-semibold text-gray-800 w-12">
                          SL
                        </th>
                        <th className="border border-gray-300 bg-red-200 px-3 py-2 text-left font-semibold text-gray-800">
                          Name of Project/Institution
                        </th>
                        <th className="border border-gray-300 bg-red-200 px-3 py-2 text-left font-semibold text-gray-800">
                          Nature of Activity
                        </th>
                        <th className="border border-gray-300 bg-red-200 px-3 py-2 text-left font-semibold text-gray-800">
                          Classification
                        </th>
                        <th className="border border-gray-300 bg-red-200 px-3 py-2 text-center font-semibold text-gray-800">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project, idx) => (
                        <tr key={idx} className="hover:bg-red-50">
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            {idx + 1}
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) => updateProject(idx, "name", e.target.value)}
                              placeholder="Enter name"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={project.nature}
                              onChange={(e) => updateProject(idx, "nature", e.target.value)}
                              placeholder="Enter nature"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={project.classification}
                              onChange={(e) => updateProject(idx, "classification", e.target.value)}
                              placeholder="Enter classification"
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeProject(idx)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={addProject}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
                >
                  + Add Project/Institution
                </button>
              </div>
            )}
          </div>

          {/* Section 6: Income Tax Registration Details (A19) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">
              Income Tax Registration Details (A19)
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Details of registration/provisional registration or approval under the Income-tax Act
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="border border-gray-300 bg-indigo-200 px-3 py-2 text-left font-semibold text-gray-800 w-8">
                      SL
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Section under which registered
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Date of Registration
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Approval/Notification URN
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Approving Authority
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Date Effective
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-3 py-2 text-center font-semibold text-gray-800">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {incomeTaxRegs.map((reg, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50">
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">{idx + 1}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.sectionUnderRegistered}
                          onChange={(e) => {
                            const updated = [...incomeTaxRegs];
                            updated[idx].sectionUnderRegistered = e.target.value;
                            setIncomeTaxRegs(updated);
                          }}
                          placeholder="e.g., 12AA"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.dateOfRegistration}
                          onChange={(e) => {
                            const updated = [...incomeTaxRegs];
                            updated[idx].dateOfRegistration = e.target.value;
                            setIncomeTaxRegs(updated);
                          }}
                          placeholder="DD/MM/YYYY"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.approvalNotification}
                          onChange={(e) => {
                            const updated = [...incomeTaxRegs];
                            updated[idx].approvalNotification = e.target.value;
                            setIncomeTaxRegs(updated);
                          }}
                          placeholder="Notification/URN"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.approvingAuthority}
                          onChange={(e) => {
                            const updated = [...incomeTaxRegs];
                            updated[idx].approvingAuthority = e.target.value;
                            setIncomeTaxRegs(updated);
                          }}
                          placeholder="Approving Authority"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.dateEffective}
                          onChange={(e) => {
                            const updated = [...incomeTaxRegs];
                            updated[idx].dateEffective = e.target.value;
                            setIncomeTaxRegs(updated);
                          }}
                          placeholder="Date Effective"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => setIncomeTaxRegs(incomeTaxRegs.filter((_, i) => i !== idx))}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={() =>
                setIncomeTaxRegs([
                  ...incomeTaxRegs,
                  { slNo: String(incomeTaxRegs.length + 1), sectionUnderRegistered: "", dateOfRegistration: "", approvalNotification: "", approvingAuthority: "", dateEffective: "" },
                ])
              }
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              + Add Registration
            </button>
          </div>

          {/* Section 7: Other Law Registration Details (A20) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-cyan-500">
            <h2 className="text-xl font-bold text-cyan-900 mb-4">
              Registration under Other Laws (A20)
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Details of registration under Foreign Law, DARPAN, SEBI, or other authorities
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-cyan-100">
                  <tr>
                    <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-left font-semibold text-gray-800 w-8">
                      SL
                    </th>
                    <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Law/Portal on which registered
                    </th>
                    <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Specify case details
                    </th>
                    <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Date of Registration
                    </th>
                    <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Approval/Registration No.
                    </th>
                    <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Approving Authority
                    </th>
                    <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-left font-semibold text-gray-800">
                      Date Effective
                    </th>
                    <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-center font-semibold text-gray-800">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {otherLawRegs.map((reg, idx) => (
                    <tr key={idx} className="hover:bg-cyan-50">
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">{idx + 1}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.lawPortal}
                          onChange={(e) => {
                            const updated = [...otherLawRegs];
                            updated[idx].lawPortal = e.target.value;
                            setOtherLawRegs(updated);
                          }}
                          placeholder="e.g., DARPAN, SEBI"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.caseDetails}
                          onChange={(e) => {
                            const updated = [...otherLawRegs];
                            updated[idx].caseDetails = e.target.value;
                            setOtherLawRegs(updated);
                          }}
                          placeholder="Specify case details"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.dateOfRegistration}
                          onChange={(e) => {
                            const updated = [...otherLawRegs];
                            updated[idx].dateOfRegistration = e.target.value;
                            setOtherLawRegs(updated);
                          }}
                          placeholder="DD/MM/YYYY"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.approvalRegistrationNo}
                          onChange={(e) => {
                            const updated = [...otherLawRegs];
                            updated[idx].approvalRegistrationNo = e.target.value;
                            setOtherLawRegs(updated);
                          }}
                          placeholder="Registration No."
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.approvingAuthority}
                          onChange={(e) => {
                            const updated = [...otherLawRegs];
                            updated[idx].approvingAuthority = e.target.value;
                            setOtherLawRegs(updated);
                          }}
                          placeholder="Approving Authority"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={reg.dateEffective}
                          onChange={(e) => {
                            const updated = [...otherLawRegs];
                            updated[idx].dateEffective = e.target.value;
                            setOtherLawRegs(updated);
                          }}
                          placeholder="Date Effective"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => setOtherLawRegs(otherLawRegs.filter((_, i) => i !== idx))}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={() =>
                setOtherLawRegs([
                  ...otherLawRegs,
                  { slNo: String(otherLawRegs.length + 1), lawPortal: "", caseDetails: "", dateOfRegistration: "", approvalRegistrationNo: "", approvingAuthority: "", dateEffective: "" },
                ])
              }
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 transition"
            >
              + Add Registration
            </button>
          </div>

          {/* Section 7b: Unlisted Equity Shares (A2) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-fuchsia-500">
            <h2 className="text-xl font-bold text-fuchsia-900 mb-4">
              Unlisted Equity Shares (A2)
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Details of unlisted equity shares held during the previous year
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-fuchsia-100">
                  <tr>
                    <th className="border border-gray-300 bg-fuchsia-200 px-2 py-2 text-left font-semibold text-gray-800 w-8">SL</th>
                    <th className="border border-gray-300 bg-fuchsia-200 px-2 py-2 text-left font-semibold text-gray-800">Name of Company</th>
                    <th className="border border-gray-300 bg-fuchsia-200 px-2 py-2 text-left font-semibold text-gray-800">Type of Share</th>
                    <th className="border border-gray-300 bg-fuchsia-200 px-2 py-2 text-left font-semibold text-gray-800">PAN</th>
                    <th className="border border-gray-300 bg-fuchsia-200 px-2 py-2 text-center font-semibold text-gray-800">Opening Bal.</th>
                    <th className="border border-gray-300 bg-fuchsia-200 px-2 py-2 text-center font-semibold text-gray-800">Cost of Acq.</th>
                    <th className="border border-gray-300 bg-fuchsia-200 px-2 py-2 text-center font-semibold text-gray-800">No. Trans.</th>
                    <th className="border border-gray-300 bg-fuchsia-200 px-2 py-2 text-center font-semibold text-gray-800">Closing Bal.</th>
                    <th className="border border-gray-300 bg-fuchsia-200 px-2 py-2 text-center font-semibold text-gray-800">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {unlistedEquityShares.map((share, idx) => (
                    <tr key={idx} className="hover:bg-fuchsia-50">
                      <td className="border border-gray-300 px-2 py-2 text-center text-xs">{idx + 1}</td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={share.nameOfCompany}
                          onChange={(e) => {
                            const updated = [...unlistedEquityShares];
                            updated[idx].nameOfCompany = e.target.value;
                            setUnlistedEquityShares(updated);
                          }}
                          placeholder="Company name"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={share.typeOfShare}
                          onChange={(e) => {
                            const updated = [...unlistedEquityShares];
                            updated[idx].typeOfShare = e.target.value;
                            setUnlistedEquityShares(updated);
                          }}
                          placeholder="Type"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={share.panNumber}
                          onChange={(e) => {
                            const updated = [...unlistedEquityShares];
                            updated[idx].panNumber = e.target.value;
                            setUnlistedEquityShares(updated);
                          }}
                          placeholder="PAN"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={share.noOfShares}
                          onChange={(e) => {
                            const updated = [...unlistedEquityShares];
                            updated[idx].noOfShares = e.target.value;
                            setUnlistedEquityShares(updated);
                          }}
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={share.costOfAcquisition}
                          onChange={(e) => {
                            const updated = [...unlistedEquityShares];
                            updated[idx].costOfAcquisition = e.target.value;
                            setUnlistedEquityShares(updated);
                          }}
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={share.noOfSharesTransferred}
                          onChange={(e) => {
                            const updated = [...unlistedEquityShares];
                            updated[idx].noOfSharesTransferred = e.target.value;
                            setUnlistedEquityShares(updated);
                          }}
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={share.closingBalance}
                          onChange={(e) => {
                            const updated = [...unlistedEquityShares];
                            updated[idx].closingBalance = e.target.value;
                            setUnlistedEquityShares(updated);
                          }}
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => setUnlistedEquityShares(unlistedEquityShares.filter((_, i) => i !== idx))}
                          className="text-red-600 hover:text-red-800 font-medium text-xs"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={() =>
                setUnlistedEquityShares([
                  ...unlistedEquityShares,
                  { slNo: String(unlistedEquityShares.length + 1), nameOfCompany: "", typeOfShare: "", panNumber: "", noOfShares: "", costOfAcquisition: "", noOfSharesTransferred: "", isPartOfShare: "", reasonForPurchase: "", noOfShares2: "", closingBalance: "" },
                ])
              }
              className="rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-700 transition"
            >
              + Add Share Holding
            </button>
          </div>

          {/* Section 7c: Charitable Activities (A23-expanded) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-rose-500">
            <h2 className="text-xl font-bold text-rose-900 mb-4">
              Charitable Purposes & Related Activities (A23)
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Whether any of the projects/institutions run for charitable purposes is advancement of any other object of general public utility?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register("hasCharitableActivities")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register("hasCharitableActivities")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {formValues.hasCharitableActivities === "yes" && (
              <div>
                <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-rose-100">
                      <tr>
                        <th className="border border-gray-300 bg-rose-200 px-3 py-2 text-left font-semibold text-gray-800 w-8">SL</th>
                        <th className="border border-gray-300 bg-rose-200 px-3 py-2 text-left font-semibold text-gray-800">Name of Project/Institution</th>
                        <th className="border border-gray-300 bg-rose-200 px-3 py-2 text-left font-semibold text-gray-800">Trade/Commerce/Business Activity?</th>
                        <th className="border border-gray-300 bg-rose-200 px-3 py-2 text-center font-semibold text-gray-800">% of Activity</th>
                        <th className="border border-gray-300 bg-rose-200 px-3 py-2 text-left font-semibold text-gray-800">Applicable Section 2(15)?</th>
                        <th className="border border-gray-300 bg-rose-200 px-3 py-2 text-center font-semibold text-gray-800">% of Receipts</th>
                        <th className="border border-gray-300 bg-rose-200 px-3 py-2 text-center font-semibold text-gray-800">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {charitableActivities.map((activity, idx) => (
                        <tr key={idx} className="hover:bg-rose-50">
                          <td className="border border-gray-300 px-3 py-2 text-center text-sm">{idx + 1}</td>
                          <td className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={activity.projectInstitution}
                              onChange={(e) => {
                                const updated = [...charitableActivities];
                                updated[idx].projectInstitution = e.target.value;
                                setCharitableActivities(updated);
                              }}
                              placeholder="Project/Institution name"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <select
                              value={activity.tradeCommerceBusiness}
                              onChange={(e) => {
                                const updated = [...charitableActivities];
                                updated[idx].tradeCommerceBusiness = e.target.value;
                                setCharitableActivities(updated);
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="">Select...</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={activity.percentageOfActivity}
                              onChange={(e) => {
                                const updated = [...charitableActivities];
                                updated[idx].percentageOfActivity = e.target.value;
                                setCharitableActivities(updated);
                              }}
                              placeholder="0%"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-right"
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <select
                              value={activity.applicableSection}
                              onChange={(e) => {
                                const updated = [...charitableActivities];
                                updated[idx].applicableSection = e.target.value;
                                setCharitableActivities(updated);
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="">Select...</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={activity.percentageOfReceipts}
                              onChange={(e) => {
                                const updated = [...charitableActivities];
                                updated[idx].percentageOfReceipts = e.target.value;
                                setCharitableActivities(updated);
                              }}
                              placeholder="0%"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-right"
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => setCharitableActivities(charitableActivities.filter((_, i) => i !== idx))}
                              className="text-red-600 hover:text-red-800 font-medium text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCharitableActivities([
                      ...charitableActivities,
                      { slNo: String(charitableActivities.length + 1), projectInstitution: "", tradeCommerceBusiness: "", percentageOfActivity: "", applicableSection: "", percentageOfReceipts: "" },
                    ])
                  }
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 transition"
                >
                  + Add Activity
                </button>
              </div>
            )}
          </div>

          {/* Section 7d: Changes to Objects/Activities (A24) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-sky-500">
            <h2 className="text-xl font-bold text-sky-900 mb-4">
              Changes to Objects/Activities (A24)
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is there any change in the objects/activities during the Year on the basis of which approval/registration/provisional registration was granted?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register("hasObjectActivityChanges")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register("hasObjectActivityChanges")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {formValues.hasObjectActivityChanges === "yes" && (
              <div>
                <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-sky-100">
                      <tr>
                        <th className="border border-gray-300 bg-sky-200 px-3 py-2 text-left font-semibold text-gray-800">Date of Change (DD/MM/YYYY)</th>
                        <th className="border border-gray-300 bg-sky-200 px-3 py-2 text-left font-semibold text-gray-800">Application for Fresh Registration Filed?</th>
                        <th className="border border-gray-300 bg-sky-200 px-3 py-2 text-left font-semibold text-gray-800">Fresh Registration Granted u/s 12AB?</th>
                        <th className="border border-gray-300 bg-sky-200 px-3 py-2 text-center font-semibold text-gray-800">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {objectActivityChanges.map((change, idx) => (
                        <tr key={idx} className="hover:bg-sky-50">
                          <td className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={change.dateOfChange}
                              onChange={(e) => {
                                const updated = [...objectActivityChanges];
                                updated[idx].dateOfChange = e.target.value;
                                setObjectActivityChanges(updated);
                              }}
                              placeholder="DD/MM/YYYY"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <select
                              value={change.applicationFiled}
                              onChange={(e) => {
                                const updated = [...objectActivityChanges];
                                updated[idx].applicationFiled = e.target.value;
                                setObjectActivityChanges(updated);
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="">Select...</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <select
                              value={change.registrationGranted}
                              onChange={(e) => {
                                const updated = [...objectActivityChanges];
                                updated[idx].registrationGranted = e.target.value;
                                setObjectActivityChanges(updated);
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="">Select...</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => setObjectActivityChanges(objectActivityChanges.filter((_, i) => i !== idx))}
                              className="text-red-600 hover:text-red-800 font-medium text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setObjectActivityChanges([
                      ...objectActivityChanges,
                      { dateOfChange: "", applicationFiled: "", registrationGranted: "" },
                    ])
                  }
                  className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 transition"
                >
                  + Add Change
                </button>
              </div>
            )}
          </div>

          {/* Section 8: Return Filing Details (A21) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
            <h2 className="text-xl font-bold text-yellow-900 mb-4">
              Return Filing Details (A21)
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return filed u/s (Tick):
                </label>
                <div className="space-y-2">
                  {["139(1)", "139(4)", "139(5)", "119(2)(b)", "139(9)", "142(1)", "148", "153C"].map((section) => (
                    <label key={section} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("returnFiledSection")}
                        value={section}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Receipt No.
                </label>
                <input
                  {...register("receiptNo")}
                  type="text"
                  placeholder="Enter receipt number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Receipt Date
                </label>
                <input
                  {...register("receiptDate")}
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If received defective/Modified, then enter Receipt No. and Date of filing original return
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    {...register("receiptNoDefective")}
                    type="text"
                    placeholder="Receipt No. (defective)"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                  />
                  <input
                    {...register("receiptDateDefective")}
                    type="text"
                    placeholder="Receipt Date (DD/MM/YYYY)"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                  />
                  <input
                    {...register("documentIdDefective")}
                    type="text"
                    placeholder="Document ID"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  If filed in response to notice u/s 139(9)/142(1)/148/153C, enter Document ID and date
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    {...register("documentIdUnique")}
                    type="text"
                    placeholder="Unique Document Identification Number (DIN)"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                  />
                  <input
                    {...register("datedUnderSection139")}
                    type="text"
                    placeholder="Date of notice (DD/MM/YYYY)"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  If filed u/s 92CD, enter date of advance pricing agreement
                </label>
                <input
                  {...register("dateAdvancePricingAgreement")}
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Residential Status
                </label>
                <select
                  {...register("residentialStatus")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select...</option>
                  <option value="resident">Resident</option>
                  <option value="non-resident">Non-Resident</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Income under section 90/91?
                </label>
                <select
                  {...register("incomeSection90to91")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Whether this return is being filed by a representative assessee?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="yes"
                      {...register("representedByRepresentative")}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="no"
                      {...register("representedByRepresentative")}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {formValues.representedByRepresentative === "yes" && (
                <div className="col-span-2">
                  <div className="rounded-lg border border-gray-200 p-4 space-y-3 mb-4">
                    {representatives.map((rep, idx) => (
                      <div key={idx} className="pb-3 border-b last:border-b-0">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={rep.name}
                            onChange={(e) => {
                              const updated = [...representatives];
                              updated[idx].name = e.target.value;
                              setRepresentatives(updated);
                            }}
                            placeholder="Name of representative"
                            className="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="text"
                            value={rep.capacity}
                            onChange={(e) => {
                              const updated = [...representatives];
                              updated[idx].capacity = e.target.value;
                              setRepresentatives(updated);
                            }}
                            placeholder="Capacity"
                            className="px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="text"
                            value={rep.panAadhaar}
                            onChange={(e) => {
                              const updated = [...representatives];
                              updated[idx].panAadhaar = e.target.value;
                              setRepresentatives(updated);
                            }}
                            placeholder="PAN/Aadhaar"
                            className="px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                          <textarea
                            value={rep.address}
                            onChange={(e) => {
                              const updated = [...representatives];
                              updated[idx].address = e.target.value;
                              setRepresentatives(updated);
                            }}
                            placeholder="Address"
                            rows={2}
                            className="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setRepresentatives(representatives.filter((_, i) => i !== idx))}
                            className="col-span-2 text-red-600 hover:text-red-800 font-medium text-sm"
                          >
                            Remove Representative
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setRepresentatives([...representatives, { name: "", capacity: "", address: "", panAadhaar: "" }])}
                    className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 transition"
                  >
                    + Add Representative
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section 8a: First Return (A25) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-500">
            <h2 className="text-xl font-bold text-teal-900 mb-4">
              First Return (A25)
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is this your first return?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="yes"
                      {...register("isFirstReturn")}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="no"
                      {...register("isFirstReturn")}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8b: Provisions Applicability (A26) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-violet-500">
            <h2 className="text-xl font-bold text-violet-900 mb-4">
              Provisions Applicability (A26)
            </h2>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("hasSection10_23C")}
                    value="yes"
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Whether provisions of section 10(23C) or Section 13(10) are applicable?
                  </span>
                </label>
              </div>

              {formValues.hasSection10_23C === "yes" && (
                <div className="space-y-3 pl-4 border-l-2 border-violet-300">
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("provisionsApplicable.clauseA")}
                        value="yes"
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Provisions of proviso to clause (15) of section 2 are applicable
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("provisionsApplicable.clauseBConditions")}
                        value="yes"
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Conditions specified in clause (a) of tenth proviso to 10 (23C) have been violated
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("provisionsApplicable.clauseCConditions")}
                        value="yes"
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Conditions specified in clause (b) of tenth proviso to 10 (23C) have been violated
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("provisionsApplicable.clauseDConditions")}
                        value="yes"
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Conditions specified in twentieth proviso to 10(23C) clause (ha) have been violated
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 8c: Audit Information (A27) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-500">
            <h2 className="text-xl font-bold text-amber-900 mb-4">
              Audit Information (A27)
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you liable for audit under the Income-tax Act?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register("liableForAudit")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register("liableForAudit")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {formValues.liableForAudit === "yes" && (
              <div className="space-y-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name of the auditor signing the tax audit report
                  </label>
                  <input
                    type="text"
                    placeholder="Enter auditor name"
                    value={auditDetails.auditorName}
                    onChange={(e) => setAuditDetails({ ...auditDetails, auditorName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Membership No. of the auditor
                    </label>
                    <input
                      type="text"
                      placeholder="Membership number"
                      value={auditDetails.membershipNo}
                      onChange={(e) => setAuditDetails({ ...auditDetails, membershipNo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name of the auditor (Proprietorship/Firm)
                    </label>
                    <input
                      type="text"
                      placeholder="Firm/proprietor name"
                      value={auditDetails.auditFirmName}
                      onChange={(e) => setAuditDetails({ ...auditDetails, auditFirmName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN/Aadhaar No. of the proprietorship/firm
                  </label>
                  <input
                    type="text"
                    placeholder="PAN or Aadhaar number"
                    value={auditDetails.panAadhaarNo}
                    onChange={(e) => setAuditDetails({ ...auditDetails, panAadhaarNo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of audit report (DD/MM/YYYY)
                    </label>
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={auditDetails.auditReportDate}
                      onChange={(e) => setAuditDetails({ ...auditDetails, auditReportDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of furnishing of the audit report (DD/MM/YYYY)
                    </label>
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={auditDetails.furnishingDate}
                      onChange={(e) => setAuditDetails({ ...auditDetails, furnishingDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Acknowledgement number of the audit report
                    </label>
                    <input
                      type="text"
                      placeholder="Acknowledgement number"
                      value={auditDetails.acknowledgementNumber}
                      onChange={(e) => setAuditDetails({ ...auditDetails, acknowledgementNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unique Document Identification Number (UDIN)
                    </label>
                    <input
                      type="text"
                      placeholder="UDIN"
                      value={auditDetails.udIn}
                      onChange={(e) => setAuditDetails({ ...auditDetails, udIn: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 8d: Other Audit Acts (A28) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <h2 className="text-xl font-bold text-orange-900 mb-4">
              Audit under Other Acts (A28)
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                If liable to audit under any Act other than the Income-tax Act, mention the Act, section and date of furnishing of the audit report
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register("liableForOtherAudit")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register("liableForOtherAudit")}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {formValues.liableForOtherAudit === "yes" && (
              <div>
                <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-orange-100">
                      <tr>
                        <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-left font-semibold text-gray-800">Act and Section</th>
                        <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-left font-semibold text-gray-800">Date of Report (DD/MM/YYYY)</th>
                        <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-center font-semibold text-gray-800">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {otherAuditActs.map((audit, idx) => (
                        <tr key={idx} className="hover:bg-orange-50">
                          <td className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={audit.actAndSection}
                              onChange={(e) => {
                                const updated = [...otherAuditActs];
                                updated[idx].actAndSection = e.target.value;
                                setOtherAuditActs(updated);
                              }}
                              placeholder="e.g., Customs Act, Section 28"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            <input
                              type="text"
                              value={audit.dateOfReport}
                              onChange={(e) => {
                                const updated = [...otherAuditActs];
                                updated[idx].dateOfReport = e.target.value;
                                setOtherAuditActs(updated);
                              }}
                              placeholder="DD/MM/YYYY"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => setOtherAuditActs(otherAuditActs.filter((_, i) => i !== idx))}
                              className="text-red-600 hover:text-red-800 font-medium text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={() => setOtherAuditActs([...otherAuditActs, { actAndSection: "", dateOfReport: "", section: "" }])}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition"
                >
                  + Add Audit Act
                </button>
              </div>
            )}
          </div>

          {/* Section 8e: AoP Members (A29) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-red-900 mb-4">
              Members of AoP - Fund Details (A29)
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Particulars of persons who were members in the AoP on 31st day of March
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-red-100">
                  <tr>
                    <th className="border border-gray-300 bg-red-200 px-3 py-2 text-left font-semibold text-gray-800 w-8">SL</th>
                    <th className="border border-gray-300 bg-red-200 px-3 py-2 text-left font-semibold text-gray-800">Name and Address</th>
                    <th className="border border-gray-300 bg-red-200 px-3 py-2 text-center font-semibold text-gray-800">% of Share</th>
                    <th className="border border-gray-300 bg-red-200 px-3 py-2 text-left font-semibold text-gray-800">PAN</th>
                    <th className="border border-gray-300 bg-red-200 px-3 py-2 text-left font-semibold text-gray-800">Aadhaar Number</th>
                    <th className="border border-gray-300 bg-red-200 px-3 py-2 text-left font-semibold text-gray-800">Status</th>
                    <th className="border border-gray-300 bg-red-200 px-3 py-2 text-center font-semibold text-gray-800">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {aopMembers.map((member, idx) => (
                    <tr key={idx} className="hover:bg-red-50">
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">{idx + 1}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <textarea
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...aopMembers];
                            updated[idx].name = e.target.value;
                            setAoPMembers(updated);
                          }}
                          placeholder="Name and address"
                          rows={2}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={member.percentageOfShare}
                          onChange={(e) => {
                            const updated = [...aopMembers];
                            updated[idx].percentageOfShare = e.target.value;
                            setAoPMembers(updated);
                          }}
                          placeholder="0%"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={member.pan}
                          onChange={(e) => {
                            const updated = [...aopMembers];
                            updated[idx].pan = e.target.value;
                            setAoPMembers(updated);
                          }}
                          placeholder="PAN"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={member.aadhaarNumber}
                          onChange={(e) => {
                            const updated = [...aopMembers];
                            updated[idx].aadhaarNumber = e.target.value;
                            setAoPMembers(updated);
                          }}
                          placeholder="Aadhaar number"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={member.status}
                          onChange={(e) => {
                            const updated = [...aopMembers];
                            updated[idx].status = e.target.value;
                            setAoPMembers(updated);
                          }}
                          placeholder="Status (Individual/HUF/etc)"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => setAoPMembers(aopMembers.filter((_, i) => i !== idx))}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={() =>
                setAoPMembers([...aopMembers, { slNo: String(aopMembers.length + 1), name: "", address: "", percentageOfShare: "", pan: "", aadhaarNumber: "", status: "" }])
              }
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              + Add Member
            </button>
          </div>

          {/* Section 9: Partner/Firm Details (A22) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500">
            <h2 className="text-xl font-bold text-pink-900 mb-4">
              Partner/Firm Details (A22)
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Whether you are Partner in a firm?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="yes"
                      {...register("isPartner")}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="no"
                      {...register("isPartner")}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {formValues.isPartner === "yes" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name of Firm
                    </label>
                    <input
                      {...register("partnerFirmName")}
                      type="text"
                      placeholder="Enter firm name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PAN of Firm
                    </label>
                    <input
                      {...register("partnerPAN")}
                      type="text"
                      placeholder="ABCDE1234F"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section 10: Legal Entity Identifier (A23) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-lime-500">
            <h2 className="text-xl font-bold text-lime-900 mb-4">
              Legal Entity Identifier (A23)
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Legal Entity Identifier (LEI) - Mandatory if refund is 50 crores or more
              </label>
              <input
                {...register("legalEntityIdentifier")}
                type="text"
                placeholder="Enter LEI (20-character code)"
                maxLength={20}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                LEI is a 20-character unique identifier assigned to legal entities by accredited providers
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid
                  ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!isValid}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid
                  ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFivePersonal;
