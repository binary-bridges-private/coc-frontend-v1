import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR8FormData } from "../itr-8.types";

interface PersonalInformationProps {
  form: UseFormReturn<ITR8FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR8FormData) => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        HUF Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HUF Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Name of HUF *
          </label>
          <input
            type="text"
            placeholder="Enter HUF name"
            {...form.register("gen_name")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {form.formState.errors.gen_name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.gen_name.message}
            </p>
          )}
        </div>

        {/* PAN */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            PAN *
          </label>
          <input
            type="text"
            placeholder="Enter PAN (e.g., ABCDE1234F)"
            {...form.register("gen_pan")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {form.formState.errors.gen_pan && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.gen_pan.message}
            </p>
          )}
        </div>

        {/* Aadhaar */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Aadhaar
          </label>
          <input
            type="text"
            placeholder="Enter Aadhaar (12 digits)"
            {...form.register("gen_aadhaar")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {form.formState.errors.gen_aadhaar && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.gen_aadhaar.message}
            </p>
          )}
        </div>

        {/* Karta Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Karta Name *
          </label>
          <input
            type="text"
            placeholder="Enter Karta's name"
            {...form.register("gen_karta_name")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Karta PAN */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Karta's PAN
          </label>
          <input
            type="text"
            placeholder="Enter Karta's PAN"
            {...form.register("gen_karta_pan")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* HUF Formation Date */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            HUF Formation Date
          </label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            {...form.register("gen_huf_formation_date")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Flat/Door/Block"
            {...form.register("gen_flat_door_block")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Premises/Building"
            {...form.register("gen_premises_building")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Road/Street/Post"
            {...form.register("gen_road_street_post")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Area/Locality"
            {...form.register("gen_area_locality")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Town/City/District"
            {...form.register("gen_town_city_district")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="PIN Code"
            {...form.register("gen_pin_code")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Contact Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="STD Code"
            {...form.register("gen_office_phone_std")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone Number"
            {...form.register("gen_office_phone_mobile")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Mobile Number 1"
            {...form.register("gen_mobile_2")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email 1"
            {...form.register("gen_email_1")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email 2"
            {...form.register("gen_email_2")}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
