export type SectionStatus = "completed" | "in-progress" | "pending" | "skipped";

export interface ItrTwoSection {
	id: string;
	title: string;
	description: string;
	status: SectionStatus;
	weight: number;
	statusText?: string;
	amountLabel?: string;
	amountValue?: string;
}

export interface ProgressBarProps {
	percentage: number;
	currentSection: string;
	totalSections: number;
	completedSections: number;
}

export interface Schedule115ADRow {
	slNo: number;
	shareUnitAcquired: string;
	shareUnitTransferred: string;
	isinCode: string;
	nameOfShare: string;
	numberOfShares: number;
	salePrice: number;
	fullValueConsideration: number;
	costOfAcquisitionWithIndexation: number;
	costOfAcquisitionWithoutIndexation: number;
	ifLowerOf6And11: number;
	fairMarketValue: number;
	totalFairMarketValue: number;
	expenditureWhollyExclusively: number;
	totalDeduction: number;
	balanceCapitalGains: number;
	ltcgScheduleOf115AD: number;
}

export interface Schedule115ADFormData {
	rows: Schedule115ADRow[];
	totalCol14BeforeTransfer: number;
	totalCol14OnOrAfterTransfer: number;
	totalLTCG115AD: number;
}

export interface ScheduleVDARow {
	slNo: number;
	dateOfAcquisition: string;
	dateOfTransfer: string;
	headUnderWhichIncomeToBeTaxed: string;
	costOfAcquisition: number;
	considerationReceived: number;
	incomeFromTransferOfVDA: number;
}

export interface ScheduleVDAFormData {
	rows: ScheduleVDARow[];
	totalIncomeFromVDA: number;
}
