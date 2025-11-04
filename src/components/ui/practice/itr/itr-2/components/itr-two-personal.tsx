import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, PersonalInfoFormData } from '../itr-two.validation.ts';
import FilingStatusAdvanced from './FilingStatusAdvanced.tsx';

interface ItrTwoPersonalProps {
	onComplete: (data: PersonalInfoFormData) => void;
	onCancel: () => void;
	initialData?: Partial<PersonalInfoFormData>;
}

const ItrTwoPersonal: React.FC<ItrTwoPersonalProps> = ({ onComplete, onCancel, initialData }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<PersonalInfoFormData>({
		resolver: zodResolver(personalInfoSchema) as any,
		mode: 'onBlur',
		defaultValues: {
			country: 'India',
			filingStatus: 'Individual',
			residentialStatus: 'Resident',
			middleName: '',
			premisesName: '',
			stdCode: '',
			mobileNumber2: '',
			emailAddress2: '',
			filedUnderSection: undefined,
			optingOutNewRegime: undefined,
			filingUnderSeventhProviso: undefined,
			depositedAmountExceeds1Crore: undefined,
			incurredExpenditureExceeds2Lakhs: undefined,
			electricityExpenditureExceeds1Lakh: undefined,
			otherConditionsApplicable: undefined,
			representativeAssessee: undefined,
			wasDirector: undefined,
			heldUnlistedEquity: undefined,
			section115HBenefit: undefined,
			portugueseCivilCode: undefined,
			fpiYesNo: undefined,
			...initialData,
		},
	});

	const filingStatus = watch('filingStatus');
	const wasDirector = watch('wasDirector');
	const heldUnlistedEquity = watch('heldUnlistedEquity');
	const representativeAssessee = watch('representativeAssessee');

	const onSubmit = (data: PersonalInfoFormData) => {
		console.log('Form submitted successfully:', data);
		onComplete(data);
	};

	const onError = (errors: any) => {
		console.error('❌ Form validation errors:', errors);
		console.log('📋 Total errors:', Object.keys(errors).length);
		console.table(
			Object.entries(errors).map(([field, error]: [string, any]) => ({
				Field: field,
				Message: error.message,
			}))
		);
		
		const firstErrorField = Object.keys(errors)[0];
		const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
		if (errorElement) {
			errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
			(errorElement as HTMLElement).focus();
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
			{Object.keys(errors).length > 0 && (
				<div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
					<div className="flex items-start">
						<svg
							className="mr-3 h-5 w-5 flex-shrink-0 text-red-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clipRule="evenodd"
							/>
						</svg>
						<div className="flex-1">
							<h3 className="text-sm font-semibold text-red-800">
								Please fix the following errors ({Object.keys(errors).length})
							</h3>
							<ul className="mt-2 space-y-1 text-xs text-red-700">
								{Object.entries(errors).slice(0, 10).map(([key, error]: [string, any]) => (
									<li key={key} className="flex items-start gap-2">
										<span className="font-medium">•</span>
										<button
											type="button"
											onClick={() => {
												const errorElement = document.querySelector(`[name="${key}"]`);
												if (errorElement) {
													errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
													(errorElement as HTMLElement).focus();
												}
											}}
											className="text-left hover:underline"
										>
											<span className="font-semibold capitalize">
												{key.replace(/([A-Z])/g, ' $1').trim()}:
											</span>{' '}
											{error.message || `Invalid value`}
										</button>
									</li>
								))}
								{Object.keys(errors).length > 10 && (
									<li className="italic">...and {Object.keys(errors).length - 10} more errors</li>
								)}
							</ul>
							<button
								type="button"
								onClick={() => {
									const firstErrorField = Object.keys(errors)[0];
									const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
									if (errorElement) {
										errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
										(errorElement as HTMLElement).focus();
									}
								}}
								className="mt-3 text-xs font-medium text-red-700 underline hover:text-red-800"
							>
								Jump to first error →
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 className="mb-6 text-lg font-semibold text-gray-900">Personal Information</h3>

				<div className="space-y-4">
					
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								First Name <span className="text-red-500">*</span>
							</label>
							<input
								{...register('firstName')}
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Enter first name"
							/>
							{errors.firstName && (
								<p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
							)}
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Middle Name
							</label>
							<input
								{...register('middleName')}
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Enter middle name"
							/>
							{errors.middleName && (
								<p className="mt-1 text-xs text-red-500">{errors.middleName.message}</p>
							)}
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Last Name <span className="text-red-500">*</span>
							</label>
							<input
								{...register('lastName')}
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Enter last name"
							/>
							{errors.lastName && (
								<p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
							)}
						</div>
					</div>

					
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								PAN <span className="text-red-500">*</span>
							</label>
							<input
								{...register('pan')}
								type="text"
								maxLength={10}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm uppercase text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="ABCDE1234F"
							/>
							{errors.pan && <p className="mt-1 text-xs text-red-500">{errors.pan.message}</p>}
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Date of Birth <span className="text-red-500">*</span>
							</label>
							<input
								{...register('dateOfBirth')}
								type="text"
								placeholder="DD/MM/YYYY"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
							{errors.dateOfBirth && (
								<p className="mt-1 text-xs text-red-500">{errors.dateOfBirth.message}</p>
							)}
						</div>
					</div>

					
					<div>
						<label className="mb-1.5 block text-sm font-medium text-gray-700">
							Aadhaar Number (12 digit) <span className="text-red-500">*</span>
						</label>
						<input
							{...register('aadhaarNumber')}
							type="text"
							maxLength={12}
							className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							placeholder="123456789012"
						/>
						{errors.aadhaarNumber && (
							<p className="mt-1 text-xs text-red-500">{errors.aadhaarNumber.message}</p>
						)}
					</div>

					
					<div>
						<label className="mb-1.5 block text-sm font-medium text-gray-700">
							Status <span className="text-red-500">*</span>
						</label>
						<div className="flex gap-6">
							<label className="flex items-center">
								<input
									{...register('filingStatus')}
									type="radio"
									value="Individual"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">Individual</span>
							</label>
							<label className="flex items-center">
								<input
									{...register('filingStatus')}
									type="radio"
									value="HUF"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">HUF</span>
							</label>
						</div>
						{errors.filingStatus && (
							<p className="mt-1 text-xs text-red-500">{errors.filingStatus.message}</p>
						)}
					</div>
				</div>
			</div>

			
			<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 className="mb-6 text-lg font-semibold text-gray-900">Address Details</h3>

				<div className="space-y-4">
					
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Flat/Door/Block No. <span className="text-red-500">*</span>
							</label>
							<input
								{...register('flatDoorBlock')}
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Enter flat/door/block number"
							/>
							{errors.flatDoorBlock && (
								<p className="mt-1 text-xs text-red-500">{errors.flatDoorBlock.message}</p>
							)}
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Name of Premises/Building/Village
							</label>
							<input
								{...register('premisesName')}
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Enter premises name"
							/>
							{errors.premisesName && (
								<p className="mt-1 text-xs text-red-500">{errors.premisesName.message}</p>
							)}
						</div>
					</div>

					
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Road/Street/Post Office <span className="text-red-500">*</span>
							</label>
							<input
								{...register('roadStreet')}
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Enter road/street"
							/>
							{errors.roadStreet && (
								<p className="mt-1 text-xs text-red-500">{errors.roadStreet.message}</p>
							)}
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Area/Locality <span className="text-red-500">*</span>
							</label>
							<input
								{...register('areaLocality')}
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Enter area/locality"
							/>
							{errors.areaLocality && (
								<p className="mt-1 text-xs text-red-500">{errors.areaLocality.message}</p>
							)}
						</div>
					</div>

					
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Town/City/District <span className="text-red-500">*</span>
							</label>
							<input
								{...register('townCity')}
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Enter town/city"
							/>
							{errors.townCity && (
								<p className="mt-1 text-xs text-red-500">{errors.townCity.message}</p>
							)}
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								State <span className="text-red-500">*</span>
							</label>
							<select
								{...register('state')}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							>
								<option value="">Select State</option>
								<option value="Andhra Pradesh">Andhra Pradesh</option>
								<option value="Arunachal Pradesh">Arunachal Pradesh</option>
								<option value="Assam">Assam</option>
								<option value="Bihar">Bihar</option>
								<option value="Chhattisgarh">Chhattisgarh</option>
								<option value="Delhi">Delhi</option>
								<option value="Goa">Goa</option>
								<option value="Gujarat">Gujarat</option>
								<option value="Haryana">Haryana</option>
								<option value="Himachal Pradesh">Himachal Pradesh</option>
								<option value="Jharkhand">Jharkhand</option>
								<option value="Karnataka">Karnataka</option>
								<option value="Kerala">Kerala</option>
								<option value="Madhya Pradesh">Madhya Pradesh</option>
								<option value="Maharashtra">Maharashtra</option>
								<option value="Manipur">Manipur</option>
								<option value="Meghalaya">Meghalaya</option>
								<option value="Mizoram">Mizoram</option>
								<option value="Nagaland">Nagaland</option>
								<option value="Odisha">Odisha</option>
								<option value="Punjab">Punjab</option>
								<option value="Rajasthan">Rajasthan</option>
								<option value="Sikkim">Sikkim</option>
								<option value="Tamil Nadu">Tamil Nadu</option>
								<option value="Telangana">Telangana</option>
								<option value="Tripura">Tripura</option>
								<option value="Uttar Pradesh">Uttar Pradesh</option>
								<option value="Uttarakhand">Uttarakhand</option>
								<option value="West Bengal">West Bengal</option>
							</select>
							{errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
						</div>
					</div>

					
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								PIN Code/ZIP Code <span className="text-red-500">*</span>
							</label>
							<input
								{...register('pinCode')}
								type="text"
								maxLength={6}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="123456"
							/>
							{errors.pinCode && (
								<p className="mt-1 text-xs text-red-500">{errors.pinCode.message}</p>
							)}
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Country <span className="text-red-500">*</span>
							</label>
							<input
								{...register('country')}
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="India"
							/>
							{errors.country && (
								<p className="mt-1 text-xs text-red-500">{errors.country.message}</p>
							)}
						</div>
					</div>
				</div>
			</div>

			
			<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 className="mb-6 text-lg font-semibold text-gray-900">Contact Information</h3>

				<div className="space-y-4">
					
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Mobile No. 1 <span className="text-red-500">*</span>
							</label>
							<input
								{...register('mobileNumber1')}
								type="text"
								maxLength={10}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="9876543210"
							/>
							{errors.mobileNumber1 && (
								<p className="mt-1 text-xs text-red-500">{errors.mobileNumber1.message}</p>
							)}
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">Mobile No. 2</label>
							<input
								{...register('mobileNumber2')}
								type="text"
								maxLength={10}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="9876543210"
							/>
							{errors.mobileNumber2 && (
								<p className="mt-1 text-xs text-red-500">{errors.mobileNumber2.message}</p>
							)}
						</div>
					</div>

					
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Email Address 1 <span className="text-red-500">*</span>
							</label>
							<input
								{...register('emailAddress1')}
								type="email"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="email@example.com"
							/>
							{errors.emailAddress1 && (
								<p className="mt-1 text-xs text-red-500">{errors.emailAddress1.message}</p>
							)}
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Email Address 2
							</label>
							<input
								{...register('emailAddress2')}
								type="email"
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="email@example.com"
							/>
							{errors.emailAddress2 && (
								<p className="mt-1 text-xs text-red-500">{errors.emailAddress2.message}</p>
							)}
						</div>
					</div>
				</div>
			</div>

			
			<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 className="mb-6 text-lg font-semibold text-gray-900">Filing Status</h3>

				<div className="space-y-4">
					
					<div>
						<label className="mb-1.5 block text-sm font-medium text-gray-700">
							Filed u/s (Tick) <span className="text-xs text-gray-500">[Please see instruction]</span>
						</label>
						<div className="flex flex-wrap gap-4">
							<label className="flex items-center">
								<input
									{...register('filedUnderSection')}
									type="radio"
									value="139(1)"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">139(1)-On or before due date</span>
							</label>
							<label className="flex items-center">
								<input
									{...register('filedUnderSection')}
									type="radio"
									value="139(4)"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">139(4)-After due date</span>
							</label>
							<label className="flex items-center">
								<input
									{...register('filedUnderSection')}
									type="radio"
									value="139(5)"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">139(5)-Revised Return</span>
							</label>
							<label className="flex items-center">
								<input
									{...register('filedUnderSection')}
									type="radio"
									value="92CD"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">92CD-Modified return</span>
							</label>
							<label className="flex items-center">
								<input
									{...register('filedUnderSection')}
									type="radio"
									value="119(2)(b)"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">119(2)(b)-After condonation of delay</span>
							</label>
						</div>
						{errors.filedUnderSection && (
							<p className="mt-1 text-xs text-red-500">{errors.filedUnderSection.message}</p>
						)}
					</div>

					<FilingStatusAdvanced register={register} watch={watch} errors={errors} />

					
					<div>
						<label className="mb-1.5 block text-sm font-medium text-gray-700">
							Residential Status <span className="text-red-500">*</span>
						</label>
						<div className="flex flex-wrap gap-4">
							<label className="flex items-center">
								<input
									{...register('residentialStatus')}
									type="radio"
									value="Resident"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">Resident</span>
							</label>
							<label className="flex items-center">
								<input
									{...register('residentialStatus')}
									type="radio"
									value="Resident but not Ordinarily Resident"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">Resident but not Ordinarily Resident</span>
							</label>
							<label className="flex items-center">
								<input
									{...register('residentialStatus')}
									type="radio"
									value="Non-resident"
									className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
								/>
								<span className="text-sm text-gray-700">Non-resident</span>
							</label>
						</div>
						{errors.residentialStatus && (
							<p className="mt-1 text-xs text-red-500">{errors.residentialStatus.message}</p>
						)}
					</div>
				</div>
			</div>

			
			<div className="flex justify-end gap-3">
				<button
					type="button"
					onClick={onCancel}
					className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{Object.keys(errors).length > 0 ? `Fix ${Object.keys(errors).length} Errors` : 'Save & Continue'}
				</button>
			</div>
		</form>
	);
};

export default ItrTwoPersonal;



