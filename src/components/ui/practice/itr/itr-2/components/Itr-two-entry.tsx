import React from 'react';
import { ItrTwoSection } from '../itr-two.types.ts';

interface ItrTwoEntryProps {
	sections: ItrTwoSection[];
	activeSectionId: string;
	onSectionSelect: (sectionId: string) => void;
}

const ItrTwoEntry: React.FC<ItrTwoEntryProps> = ({
	sections,
	activeSectionId,
	onSectionSelect,
}) => {
	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'completed':
				return (
					<svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case 'in-progress':
				return (
					<svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case 'skipped':
				return (
					<svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
				);
			default:
				return (
					<div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white"></div>
				);
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'completed':
				return (
					<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
						Completed
					</span>
				);
			case 'in-progress':
				return (
					<span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
						In Progress
					</span>
				);
			case 'skipped':
				return (
					<span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
						Skipped
					</span>
				);
			default:
				return (
					<span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
						Not Started
					</span>
				);
		}
	};

	return (
		<div className="space-y-3">
			{sections.map((section, index) => {
				const isActive = section.id === activeSectionId;
				const isClickable = section.status !== 'pending' || index === 0;

				return (
					<button
						key={section.id}
						onClick={() => isClickable && onSectionSelect(section.id)}
						disabled={!isClickable}
						className={`w-full rounded-xl border p-4 text-left transition-all ${
							isActive
								? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
								: section.status === 'completed'
								? 'border-green-200 bg-green-50 hover:shadow-md'
								: section.status === 'in-progress'
								? 'border-blue-200 bg-blue-50 hover:shadow-md'
								: section.status === 'skipped'
								? 'border-gray-200 bg-gray-50'
								: 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
						} ${!isClickable ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
					>
						<div className="flex items-start gap-4">
							
							<div className="flex-shrink-0 pt-1">{getStatusIcon(section.status)}</div>

							
							<div className="flex-1">
								<div className="flex items-start justify-between gap-3">
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900">{section.title}</h3>
										<p className="mt-1 text-sm text-gray-600">{section.description}</p>
									</div>
									<div className="flex-shrink-0">{getStatusBadge(section.status)}</div>
								</div>

								
								{section.amountValue && (
									<div className="mt-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2">
										<span className="text-xs text-gray-500">{section.amountLabel}</span>
										<span className="font-semibold text-gray-900">
											{section.amountValue}
										</span>
									</div>
								)}
							</div>

							
							{isClickable && (
								<div className="flex-shrink-0 pt-1">
									<svg
										className={`h-5 w-5 transition-transform ${
											isActive ? 'text-blue-600' : 'text-gray-400'
										}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							)}
						</div>
					</button>
				);
			})}
		</div>
	);
};

export default ItrTwoEntry;
