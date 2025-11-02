import React from 'react';
import { ProgressBarProps } from '../itr-two.types.ts';

const ItrTwoProgress: React.FC<ProgressBarProps> = ({
	percentage,
	currentSection,
	totalSections,
	completedSections,
}) => {
	return (
		<div className="w-full space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg font-semibold text-gray-900">ITR-2 Filing Progress</h3>
					<p className="text-sm text-gray-600">
						{completedSections} of {totalSections} sections completed
					</p>
				</div>
				<div className="text-right">
					<div className="text-3xl font-bold text-blue-600">{percentage}%</div>
					<p className="text-xs text-gray-500">Complete</p>
				</div>
			</div>

			
			<div className="relative">
				<div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
					<div
						className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
						style={{ width: `${percentage}%` }}
					>
						<div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
					</div>
				</div>
				
				<div className="absolute top-0 flex w-full justify-between">
					{[0, 25, 50, 75, 100].map((milestone) => (
						<div
							key={milestone}
							className={`flex flex-col items-center ${
								milestone === 0 || milestone === 100 ? 'translate-x-0' : '-translate-x-1/2'
							}`}
							style={{ left: milestone === 0 ? '0%' : milestone === 100 ? '100%' : `${milestone}%` }}
						>
							<div
								className={`h-3 w-0.5 ${
									percentage >= milestone ? 'bg-blue-600' : 'bg-gray-300'
								}`}
							></div>
							<span
								className={`mt-1 text-xs font-medium ${
									percentage >= milestone ? 'text-blue-600' : 'text-gray-400'
								}`}
							>
								{milestone}%
							</span>
						</div>
					))}
				</div>
			</div>

		</div>
	);
};

export default ItrTwoProgress;
