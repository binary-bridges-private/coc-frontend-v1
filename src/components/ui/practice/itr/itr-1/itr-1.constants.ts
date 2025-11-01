import { ItrStep, ItrSummarySection } from "./itr-1.types";

export const ITR_ONE_PROGRESS_STEPS: ItrStep[] = [
	{ id: 1, title: "Personal Information", caption: "Aadhaar, PAN & Contact" },
	{ id: 2, title: "Gross Total Income" },
	{ id: 3, title: "Total Deductions" },
];

export const ITR_ONE_SUMMARY_SECTIONS: ItrSummarySection[] = [
	{
		id: "personal",
		title: "Personal Information",
		description: "Includes your Aadhaar, PAN, Contact and Bank details",
		statusText: "Provide your confirmation",
		status: "in-progress",
	},
	{
		id: "gross-income",
		title: "Gross Total Income",
		description:
			"Includes your income details like Salary, House Property, Income from other sources such as Bank Interests, etc.",
		amountLabel: "Rs.",
		amountValue: "2,61,527",
		statusText: "Provide your confirmation",
		status: "pending",
	},
	{
		id: "deductions",
		title: "Total Deductions",
		description:
			"Includes tax saving deductions or payment towards life insurance, medical premium, pension funds, provident fund, etc.",
		amountLabel: "Rs.",
		amountValue: "24,898",
		statusText: "Provide your confirmation",
		status: "pending",
	},
];
