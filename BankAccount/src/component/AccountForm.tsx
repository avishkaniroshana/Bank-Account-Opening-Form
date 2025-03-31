import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  fullname: z
    .string()
    .nonempty({ message: "Full name is required" })
    .min(3, { message: "Full name must be at least 3 characters long" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .regex(/^\d+$/, { message: "Phone number must be digits only" })
    .length(10, { message: "Phone number must be exactly 10 digits" }),
  dob: z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}/, {
      message: "Invalid date format (YYYY-MM-DD)",
    })
    .refine(
      (dob) => {
        const birthYear = new Date(dob).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear >= 18;
      },
      { message: "You must be at least 18 years old" }
    ),
  accountType: z.enum(["savings", "current"], {
    message: "Account type is required",
  }),
  initialDeposit: z.number().min(100, { message: "Minimum deposit is $100" }),
  currency: z.enum(["USD", "EUR", "LKR"], {
    message: "Select a valid currency",
  }),
  streetaddress: z.string().nonempty({ message: "Street address is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  zipcode: z
    .string()
    .nonempty({ message: "Zip code is required" })
    .regex(/^\d+$/, { message: "Zip code must be digits only" })
    .length(5, { message: "Zip code must be exactly 5 digits" }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type FormDataType = z.infer<typeof schema>;

const AccountForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({ resolver: zodResolver(schema) });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 border-transparent rounded-lg shadow-lg bg-white">
        <div className="text-center py-8">
          <h2 className="mt-3 text-xl font-medium text-gray-900">
            Account Created Successfully!
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Thank you for creating an account with us.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8 border-transparent rounded-lg shadow-lg bg-white"
    >
      <h1 className="text-2xl font-medium text-center col-span-3">
        Create New Account
      </h1>

      {/* Personal Information */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
          Personal Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            {...register("fullname")}
            className={`w-full px-4 py-2 border ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.fullname && (
            <p className="mt-1 text-sm text-red-600">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            {...register("phone")}
            className={`w-full px-4 py-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dob")}
            className={`w-full px-4 py-2 border ${
              errors.dob ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
          )}
        </div>
      </div>

      {/* Account Details */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
          Account Details
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Type
          </label>
          <select
            {...register("accountType")}
            className={`w-full px-4 py-2 border ${
              errors.accountType ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          >
            <option value="">Select type</option>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
          </select>
          {errors.accountType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.accountType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            {...register("currency")}
            className={`w-full px-4 py-2 border ${
              errors.currency ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          >
            <option value="">Select currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="LKR">LKR</option>
          </select>
          {errors.currency && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currency.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Deposit
          </label>
          <input
            type="number"
            {...register("initialDeposit", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border ${
              errors.initialDeposit ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.initialDeposit && (
            <p className="mt-1 text-sm text-red-600">
              {errors.initialDeposit.message}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
          Address
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            {...register("streetaddress")}
            className={`w-full px-4 py-2 border ${
              errors.streetaddress ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.streetaddress && (
            <p className="mt-1 text-sm text-red-600">
              {errors.streetaddress.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            {...register("city")}
            className={`w-full px-4 py-2 border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zip Code
          </label>
          <input
            {...register("zipcode")}
            className={`w-full px-4 py-2 border ${
              errors.zipcode ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.zipcode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.zipcode.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="md:col-span-3 pt-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                {...register("terms")}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
          )}
        </div>

        <div className="md:col-span-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70 text-lg"
          >
            {isSubmitting ? "Processing..." : "Create Account"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
