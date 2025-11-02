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
